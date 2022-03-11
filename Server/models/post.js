import mongoose from "mongoose";

const { Schema } = mongoose;
const { ObjectId } = Schema;

const postSchema = new Schema(
  {
    postContent: {
      type: {},
      required: true,
    },
    postedBy: {
      type: ObjectId,
      ref: "User",
    },
    image: {
      url: String,
      public_id: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Post", postSchema);
