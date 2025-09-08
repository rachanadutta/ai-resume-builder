// import mongoose from "mongoose";
// import bcrypt from "bcryptjs";

// const userSchema = new mongoose.Schema({
//   name: String,
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
// }, { timestamps: true });

// // Hash password before save
// userSchema.pre("save", async function(next) {
//   if (!this.isModified("password")) return next();
//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
//   next();
// });

// userSchema.methods.matchPassword = async function(password) {
//   return await bcrypt.compare(password, this.password);
// };

// export default mongoose.model("User", userSchema);

import mongoose from "mongoose";

const userSchema= new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },
    password: {
      type: String,
      required: true
    }
  },
  {timestamps:true}
);

const User = mongoose.model("User", userSchema);

export default User;
