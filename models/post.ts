import mongoose, { Schema, Document, models } from 'mongoose';

export interface IPost extends Document {
  title: string;
  content: string;
  slug: string;
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

const PostSchema: Schema = new Schema<IPost>(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    imageUrl: { type: String, required: true },
  },
  { timestamps: true }
);

export default models.Post || mongoose.model<IPost>('Post', PostSchema);