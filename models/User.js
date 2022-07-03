import mongoose from "mongoose";

// Add posts = ref('Post');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
  username: {
    type: String,
    required: true,
  },
});

export default mongoose.models.User || mongoose.model("User", userSchema);
