import mongoose, { Schema, model } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoSchema = new Schema(
  {
    videofile: {
      type: String,
      required: true,
    },
    thumbnail: { type: string, required: true },
    title: { type: string, required: true },
    description: { type: string, required: true },
    owner: {},
    duration: {
      type: Number,
    },
    views: {
      type: Number,
      default: 0,
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

// This is used to write aggrigation queries
videoSchema.plugin(mongooseAggregatePaginate);

export const Video = model("Video", videoSchema);
