const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { db } = require("../services/mongodb");
const { BSON } = require("mongodb");

module.exports = {
  Mutation: {
    async registerUser(_, { registerInput: { name, email, password, phone } }) {
      const oldUser = await db.collection("users").findOne({ email: email });

      if (oldUser) {
        console.log("User already registered", "USER_ALREDY_EXIST");
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

      const token = jwt.sign({ user_id: newUser._id, email }, "unsafe", {
        expiresIn: "2h",
      });
      user.token = token;

      return { ...newUser, token };
    },

    // async loginUser(_, { loginInput: { email, password } }) {
    //   const user = await User.findOne({ email });
    //   if (user) {
    //     await bcrypt.compare(password, user.password).then((res) => {
    //       if (!res) {
    //         throw new ApolloError("Incorrect password", "INCORRECT_PASSWORD");
    //       }
    //     });

    //     const token = jwt.sign({ user_id: user._id, email }, "unsafe", {
    //       expiresIn: "2h",
    //     });
    //     user.token = token;

    //     return {
    //       id: user.id,
    //       token: token,
    //       ...user._doc,
    //     };
    //   } else {
    //     throw new ApolloError("Incorrect password", "INCORRECT_PASSWORD");
    //   }
    // },

    async loginUser(_, { loginInput: { email, password } }) {
      const user = await db.collection("users").findOne({ email: email });

      if (user) {
        await bcrypt.compare(password, user.password).then((res) => {
          if (!res) {
            console.log("Incorrect password", "INCORRECT_PASSWORD");
          }
        });

        const token = jwt.sign({ user_id: user._id, email }, "unsafe", {
          expiresIn: "2h",
        });

        user.token = token;
        return {
          _id: user._id,
          email: user.email,
          name: user.name,
          phone: user.phone,
          token: token,
        };
      } else {
        console.log("Incorrect password", "INCORRECT_PASSWORD");
      }
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
