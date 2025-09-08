import mongoose  from "mongoose";

const ResumeSchema= new mongoose.Schema(
  {
    userId:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,

    },
    formData: {
      type: Object, 
      default: {},
    },
    status:{
      type: String,
      enum: ["draft", "completed"],
      default: "draft",
    },


  },{timestamps: true}
);

const Resume= mongoose.model("Resume", ResumeSchema);
export default Resume;