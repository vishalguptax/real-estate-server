import SuccessResponse from "../helpers/successResponse.js";
import ErrorResponse from "../helpers/errorResponse.js";
import { 
    getUser, 
    getUsers, 
    updateUser, 
    deleteUser, 
    savepost, 
    getprofileposts, 
    getNotificationNumber 
} from "../services/userServices.js";


export const usercontroller={
/**
 * getUsersController - Retrieves all users.
 * @returns {Object} - Returns a list of users.
 */
 getUsers:async (req, res) => {
    try {
        const users = await getUsers();
        return SuccessResponse.ok(res, "Users retrieved successfully", users);
    } catch (err) {
        console.error("Error in controller:", err);
        return ErrorResponse.internalServer(res, "Failed to get users!");
    }
},

/**
 * getUserController - Retrieves a single user by ID.
 * @returns {Object} - Returns the user object.
 */
  getUser :async (req, res) => {
    try {
        const user = await getUser(req.params.id);
        return SuccessResponse.ok(res, "User retrieved successfully", user);
    } catch (err) {
        console.error("Error in controller:", err);
        return ErrorResponse.internalServer(res, "Failed to get user");
    }
},

/**
 * updateUserController - Updates user details.
 * @param {String} id - User ID from request params.
 * @returns {Object} - Returns the updated user object.
 */
 updateUser: async (req, res) => {
    console.log("updateUser called with params:", req.params);
    console.log("Request userId from middleware:", req.userId);

    const id = req.params.id;
    const tokenUserId = req.userId;

    console.log(`Attempting to update user ID: ${id}`);

    if (!tokenUserId) {
        console.log("Token userId is missing! Check middleware.");
        return ErrorResponse.unauthorized(res, "Authentication required!");
    }

    if (id !== tokenUserId) {
        console.log(`User ${tokenUserId} is not authorized to update user ${id}`);
        return ErrorResponse.forbidden(res, "Not Authorized!");
    }

    try {
        const { password, avatar, ...inputs } = req.body;
        console.log("Updating user with data:", inputs);

        const updatedUser = await updateUser(id, inputs, password, avatar);

        if (!updatedUser) {
            console.log("User update failed - updateUser function returned null/undefined");
            return ErrorResponse.internalServer(res, "Failed to update user - update function issue");
        }

        console.log("User updated successfully:", updatedUser);
        return SuccessResponse.ok(res, "User updated successfully", updatedUser);

    } catch (err) {
        console.error("Error in updateUser:", err);
        return ErrorResponse.internalServer(res, "Failed to update user!", err.message);
    }
},

/**
 * deleteUserController - Deletes a user.
 * @param {String} id - User ID from request params.
 * @returns {Object} - Success message on successful deletion.
 */
 deleteUser: async (req, res) => {
    const id = req.params.id;

    try {
        await deleteUser(id);
        return SuccessResponse.ok(res, "User deleted successfully");
    } catch (err) {
        console.error("Error in controller:", err);
        return ErrorResponse.internalServer(res, "Failed to delete user!");
    }
},

/**
 * savePostController - Saves or removes a post for a user.
 * @param {String} postId - Post ID from request body.
 * @returns {Object} - Message indicating success.
 */
 savePost : async (req, res) => {
    const postId = req.body.postId;
    const tokenUserId = req.userId;

    try {
        const message = await savepost(tokenUserId, postId);
        return SuccessResponse.ok(res, message);
    } catch (err) {
        console.error("Error in Controller:", err);
        return ErrorResponse.internalServer(res, "Failed to save/remove post!");
    }
},

/**
 * profilePostsController - Retrieves user's profile posts and saved posts.
 * @returns {Object} - Returns an object containing user posts and saved posts.
 */
 profilePosts:async (req, res) => {
    const tokenUserId = req.userId;

    try {
        const { userPosts, savedPosts } = await getprofileposts(tokenUserId);
        return SuccessResponse.ok(res, "Profile posts retrieved successfully", { userPosts, savedPosts });
    } catch (err) {
        console.error("Error in controller:", err);
        return ErrorResponse.internalServer(res, "Failed to get profile posts!");
    }
},

/**
 * getNotificationNumberController - Retrieves the number of notifications for a user.
 * @returns {Object} - Returns an object containing the notification count.
 */
 getNotificationNumber: async (req, res) => {
    const tokenUserId = req.userId;

    try {
        const number = await getNotificationNumber(tokenUserId);
        return SuccessResponse.ok(res, "Notification Number retrieved successfully", { number });
    } catch (err) {
        console.error("Error in controller:", err);
        return ErrorResponse.internalServer(res, "Failed to get notification count");
    }
}
}