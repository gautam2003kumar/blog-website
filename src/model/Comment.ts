import mongoose, { Schema, Document, Model } from "mongoose";

export interface IComment extends Document {
  user: mongoose.Schema.Types.ObjectId;
  blog: mongoose.Schema.Types.ObjectId;
  content: string;
  likes: mongoose.Schema.Types.ObjectId[]; // Store users who liked
  createdAt: Date;
  updatedAt: Date;
}

const CommentSchema: Schema<IComment> = new Schema<IComment>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    blog: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog",
      required: true,
    },
    content: {
      type: String,
      required: [true, "Comment content is required"],
      trim: true,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

// Virtual field to get the like count
CommentSchema.virtual("likeCount").get(function () {
  return this.likes.length;
});

// Ensure comments are sorted by newest first
CommentSchema.index({ createdAt: -1 });

const CommentModel: Model<IComment> =
  mongoose.models.Comment || mongoose.model<IComment>("Comment", CommentSchema);

export default CommentModel;
