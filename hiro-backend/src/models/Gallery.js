import mongoose from "mongoose";

const gallerySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, default: "" },
    imageUrl: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { collection: "gallery" }
);

const Gallery = mongoose.model("Gallery", gallerySchema);
export default Gallery;