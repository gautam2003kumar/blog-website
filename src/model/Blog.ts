import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IBlog extends Document {
  title: string;
  coverImage: string;
  content: string;
  author: Types.ObjectId;
  views: number;
  likes: Types.ObjectId[];
  comments: Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const BlogSchema: Schema<IBlog> = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },
    coverImage: {
      type: String,
      required: [true, 'Cover Image is required'],
    },
    content: {
      type: String,
      required: [true, 'Content is required'],
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    views: {
      type: Number,
      default: 0,
    },
    category: {
      type: String,
      required: [true, 'Category is required']
    },
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Comment',
      },
    ],
  },
  {
    timestamps: true,
  }
);

const BlogModel = (mongoose.models.Blog as mongoose.Model<IBlog>) || mongoose.model<IBlog>('Blog', BlogSchema);

export default BlogModel;
