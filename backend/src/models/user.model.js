import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true
        },
        fullName: {
            type: String,
            required: true,
            trim: true
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
        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user"
        },
        isActive: {
            type: Boolean,
            default: true
        },
        phoneNumber: {
            type: String,
            unique: true,
            sparse: true, // Allows null or unique value
            validate: {
                validator: function (v) {
                    return /\+?[1-9]\d{1,14}$/.test(v); // E.164 phone format validation
                },
                message: (props) => `${props.value} is not a valid phone number!`
            }
        },
        dateOfBirth: {
            type: Date,
            default: null
        },
        lastLogin: {
            type: Date,
            default: null
        },
    },
    {
        timestamps: true,
        versionKey: false
    }
);

export default mongoose.model("User", userSchema);
