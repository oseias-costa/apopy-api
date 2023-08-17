const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { db } = require("../services/mongodb");
const { BSON } = require("mongodb");
const { GraphQLError } = require("graphql");

module.exports = {
  Mutation: {
    async registerUser(_, { registerInput: { name, email, password, phone } }) {

      const nameRegex = /^[a-zA-Z\u00C0-\u017F´]+\s+[a-zA-Z\u00C0-\u017F´]{0,}$/
      const nameVerify = name.match(nameRegex)
      if (!nameVerify) {
        throw new GraphQLError('Name does not match', {
          extentions: {
            code: 'FORBIDDEN'
          }
        })
      }

      const phoneRegex = /^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)(?:((?:9\s?\d|[2-9])\d{3})\-?(\d{4}))$/
      const phoneVerify = phone.match(phoneRegex)
      if (!phoneVerify) {
        throw new GraphQLError('Phone dont match', {
          extentions: {
            code: 'FORBIDDEN'
          }
        })
      }

      const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      const verifyEmail = email.match(emailRegex)
      if (!verifyEmail) {
        throw new GraphQLError('Email is not valid', {
          extentions: {
            code: 'FORBIDDEN'
          }
        })
      }

      const oldUser = await db.collection("users").findOne({ email: email });
      if (oldUser) {
        throw new GraphQLError('Email already registered', {
          extentions: {
            code: 'FORBIDDEN'
          }
        })
      }
      
      const passwordVerify = password.length >= 6
      if(!passwordVerify){
        throw new GraphQLError('Password must contain at least 6 characters', {
          extentions: {
            code: 'FORBIDDEN'
          }
        })
      }

      const encryptedPassword = await bcrypt.hash(password, 10);
      const user = {
        name,
        email,
        password: encryptedPassword,
        phone,
        createAt: new Date(),
      };

      const createUser = await db.collection("users").insertOne(user);
      const _id = createUser.insertedId;
      const newUser = await db.collection("users").findOne({ _id: _id });

      const token = jwt.sign({ user_id: newUser._id, email }, `${process.env.SECRET_PASSWORD}`, {
        expiresIn: "2h",
      });
      user.token = token;

      const verifyAll = Boolean(nameVerify) && Boolean(phoneVerify) && Boolean(verifyEmail) && oldUser === null && passwordVerify 
     
      return verifyAll? { ...newUser, token } : null
    },


    async loginUser(_, { loginInput: { email, password } }) {
      const user = await db.collection("users").findOne({ email: email });
      let verify = false

      if (user) {
        await bcrypt.compare(password, user.password).then((res) => {
          
          if (res) {
            verify = true
          } else {
            throw new GraphQLError('Invalid Email or Password', {
              extentions: {
                code: 'FORBIDDEN'
              }
            })
            
          }
        });

      } else {
        return console.log("Incorrect password", "INCORRECT_PASSWORD");
      }

      const token = jwt.sign({ user_id: user._id, email }, `${process.env.SECRET_PASSWORD}`, {
        expiresIn: "2h",
      });

      user.token = token;

      const userVerify = {
        _id: user._id,
        email: user.email,
        name: user.name,
        phone: user.phone,
        token: token,
      };

      return verify ? userVerify : null
    },
  },
  Query: {
    async users(_, __, ) {
      // const verify = context.user !== null ? await User.find() : null;
      // console.log(context)
      // return verify;
      return await db.collection("users").find({}).toArray();
    },
    async user(_, { id }, {user_id}) {

      const nid = new BSON.ObjectId(user_id);
      return await db.collection("users").findOne({ _id: nid });
    },
  },
};
