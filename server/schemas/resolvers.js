const { User } = require("../models");
const { signToken } = require("../utils/auth");
const { AuthenticationError } = require("apollo-server-express");
const resolvers = {
  Query: {
    user: async (context) => {
      if (context.user) {
        const currentUser = await User.findOne({
          _id: context.user._id,
        }).select("-__v -password");
        return currentUser;
      }
      throw new AuthenticationError("please log in");
    },
  },
  Mutation: {
    addUser: async (_, args) => {
      console.log(args);
      const user = await User.create(args);
      console.log(user);
      const token = signToken(user);
      console.log(token);
      return { token, user };
    },
    login: async (_, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const isCorrectPassword = await user.isCorrectPassword(password);

      if (!isCorrectPassword) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);
      return { token, user };
    },
    saveBook: async (_, { bookData }, context) => {
      if (context.user) {
        const findUser = await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { savedBooks: bookData } },
          { new: true }
        );

        return findUser;
      }

      throw new AuthenticationError("Please Log In");
    },
    removeBook: async ({ bookId }, context) => {
      if (context.user) {
        const findUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedBooks: { bookId } } },
          { new: true }
        );

        return findUser;
      }

      throw new AuthenticationError("Please log in");
    },
  },
};
module.exports = resolvers;
