const { user } = require("../models");
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
    createUser: async (args) => {
      const user = await User.create(args);
      const token = signToken(user);
      return { token, user };
    },
    login: async ({ email, password }) => {
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
    saveBook: async ({ bookData }, context) => {
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
