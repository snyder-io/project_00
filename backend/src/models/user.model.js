import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true
        },
        fullName: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true,
            minlength: 6
        },
        profileImage: {
            type: String,
            default: null
        },
    },
    {
        timestamps: true
    }
);

export default mongoose.model("User", userSchema);