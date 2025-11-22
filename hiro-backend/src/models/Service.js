import mongoose from "mongoose"

const serviceSchema = new mongoose.Schema(
    {
	name: {type: String, required: true, unique: true },
	description: {type: String},
	base_price: {type: Number},
	image_url: {type: String},
	isActive: {type: Boolean, default: true },
    },
    { timestamps: true },
);

export default mongoose.model("Service", serviceSchema);
