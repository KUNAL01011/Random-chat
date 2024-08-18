import User from "../models/user.model.js";
import {
  destroyOnCloudinary,
  uploadOnCloudinary,
} from "../utils/cloudinary.js";

export const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;

    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");

    res.status(200).json(filteredUsers);
  } catch (error) {
    console.error("Error in getUsersForSidebar: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const { fullName } = req.body;
    let avatarLocalPath;
    let profilePic;

    if (req.file?.path) {
      avatarLocalPath = req.file?.path;
    }

    const userId = req.user._id.toString();

    const user = await User.findById(userId);

    if (avatarLocalPath) {
      if (user.profilePic) {
        const publicId = user.profilePic.split("/").pop().split(".")[0];
        await destroyOnCloudinary(publicId);
      }

      const uploadedResponse = await uploadOnCloudinary(avatarLocalPath);
      profilePic = uploadedResponse;
    }

    user.fullName = fullName || user.fullName;
    user.profilePic = profilePic || user.profilePic;

    console.log("Hello");
    const users = await user.save();
    return res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
