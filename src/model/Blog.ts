import mongoose, { Schema, Document, Model } from 'mongoose';

// Interface for TypeScript
interface IBlog extends Document {
  title: string;
  content: any; // EditorJS data is usually JSON
  bannerUrl?: string;
  description: string;
  author: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
  status: 'draft' | 'published';
  tags?: string[];
  category?: string;
  comments?: mongoose.Types.ObjectId[];
  views?: number;
  likes?: number;
}

const BlogSchema: Schema = new Schema<IBlog>({
  title: { type: String, required: true, trim: true },
  content: { type: Object, required: true }, // EditorJS data stored as JSON
  bannerUrl: { type: String },
  description: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  status: { type: String, enum: ['draft', 'published'], default: 'draft' },
  tags: [{ type: String }],
  category: { type: String },
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  views: { type: Number, default: 0 },
  likes: { type: Number, default: 0 },
});

// Middleware to update the timestamp on edit
BlogSchema.pre('save', function (next) {
  this.updatedAt = new Date();
  next();
});

const BlogModel: Model<IBlog> = mongoose.models.Blog as Model<IBlog> || mongoose.model<IBlog>('Blog', BlogSchema);
export default BlogModel;
