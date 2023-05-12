const User = require("../models/User");
const { ApolloError } = require("apollo-server-errors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = {
  Mutation: {
    async registerUser(_, { registerInput: { name, email, password, phone } }) {
      const oldUser = await User.findOne({ email });

      if (oldUser) {
        throw new ApolloError("User already registered", "USER_ALREDY_EXIST");
      }

      const encryptedPassword = await bcrypt.hash(password, 10);
      const user = new User({
        name,
        email,
        password: encryptedPassword,
        phone,
      });

      // const token = jwt.sign({ user_id: user._id, email }, "unsafe", { expiresIn: "2h" })
      // user.token = token

      await user.save();
      return {
        id: user.id,
        token: token,
        ...user._doc,
      };
    },

    async loginUser(_, { loginInput: { email, password } }) {
      const user = await User.findOne({ email });
      if (user) {
        await bcrypt.compare(password, user.password).then((res) => {
          if (!res) {
            throw new ApolloError("Incorrect password", "INCORRECT_PASSWORD");
          }
        });

        const token = jwt.sign({ user_id: user._id, email }, "unsafe", {
          expiresIn: "2h",
        });
        user.token = token;

        return {
          id: user.id,
          token: token,
          ...user._doc,
        };
      } else {
        throw new ApolloError("Incorrect password", "INCORRECT_PASSWORD");
      }
    },
    
    async createCategory(_, { categoryInput: { name } }) {
      const category = new Category({ name });
      return await category.save()
    },

    async createSubcategory(_, { subcategoryInput: { name, category } }) {
      const subcategory = new Subcategory({ name, category });
      return await subcategory.save();
    },
  },
  Query: {
    async users(_, __, context) {
      const verify = context.user !== null ? await User.find() : null;
      console.log(context)
      return verify;
    },
    async user(_, { id }) {
      return await User.findById(id);
    },
  }
};