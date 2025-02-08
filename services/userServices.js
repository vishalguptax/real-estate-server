import {prisma} from '../prisma/index.js'

import bcrypt from 'bcrypt';


/**
 * Fetches all users.
 * @returns {Array} - List of users.
 */
export const getUsers = async () => {
  try {
    return await prisma.user.findMany();
  } catch (error) {
    console.error("Error fetching users:", error);
    throw new Error("Failed to retrieve users");
  }
};

/**
 * Fetches a single user by ID.
 * @param {String} id - User ID.
 * @returns {Object} - User data.
 */
export const getUser = async (id) => {
  try {
    return await prisma.user.findFirst({ where: { id } });
  } catch (error) {
    console.error("Error fetching user:", error);
    throw new Error("Failed to retrieve user");
  }
};

/**
 * Deletes a user by ID.
 * @param {String} id - User ID.
 */
export const deleteUser = async (id) => {
  try {
    await prisma.user.delete({ where: { id } });
  } catch (error) {
    console.error("Error deleting user:", error);
    throw new Error("Failed to delete user");
  }
};

/**
 * Updates a user's information.
 * @param {String} id - User ID.
 * @param {Object} updates - Fields to update.
 * @param {String} password - New password (optional).
 * @param {String} avatar - User avatar (optional).
 * @returns {Object} - Updated user data.
 */
export const updateUser = async (id, updates, password, avatar) => {
  try {
    let updatedPassword = password ? await bcrypt.hash(password, 10) : null;

    const data = { ...updates };
    if (updatedPassword) data.password = updatedPassword;
    if (avatar) data.avatar = avatar;

    const updatedUser = await prisma.user.update({
      where: { id },
      data,
    });

    const { password: _, ...userInfo } = updatedUser;
    return userInfo;
  } catch (error) {
    console.error("Error updating user:", error);
    throw new Error("Failed to update user");
  }
};

/**
 * Saves or removes a post for a user.
 * @param {String} userId - User ID.
 * @param {String} postId - Post ID.
 * @returns {String} - Status message.
 */
export const savepost = async (userId, postId) => {
  try {
    const savedPost = await prisma.savedPost.findUnique({
      where: { userId_postId: { userId, postId } },
    });

    if (!savedPost) {
      await prisma.savedPost.create({ data: { userId, postId } });
      return "Post saved";
    } else {
      await prisma.savedPost.delete({
        where: { userId_postId: { userId, postId } },
      });
      return "Post removed";
    }
  } catch (error) {
    console.error("Error saving/removing post:", error);
    throw new Error("Failed to save/remove post");
  }
};

/**
 * Fetches a user's posts and saved posts.
 * @param {String} userId - User ID.
 * @returns {Object} - User posts and saved posts.
 */
export const getprofileposts = async (userId) => {
  try {
    const userPosts = await prisma.post.findMany({ where: { userId } });

    const savedPosts = await prisma.savedPost.findMany({
      where: { userId },
      include: { post: true },
    });

    return { userPosts, savedPosts: savedPosts.map((item) => item.post) };
  } catch (error) {
    console.error("Error fetching profile posts:", error);
    throw new Error("Failed to retrieve profile posts");
  }
};

/**
 * Gets the number of unseen notifications for a user.
 * @param {String} userId - User ID.
 * @returns {Number} - Notification count.
 */
export const getNotificationNumber = async (userId) => {
  try {
    return await prisma.chat.count({
      where: {
        userIDs: { hasSome: [userId] },
        NOT: { seenBy: { hasSome: [userId] } },
      },
    });
  } catch (error) {
    console.error("Error fetching notification count:", error);
    throw new Error("Failed to retrieve notification count");
  }
};
  


    