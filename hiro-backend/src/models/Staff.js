import mongoose from "mongoose"

const staffSchema = new mongoose.Schema(
    {
	name: { type: String, required: true },
	role: {
	    type: String,
	    enum: [
		"Chef",
		"Head Waiter",
		"Mixologist",
		"Photographer",
		"Decorator",
		"MC",
		"DJ",
		"Head Cleaner",
	    ],
	    required: true,
	},
	specialty: { type: String },
	experience: { type: String },
	image_url: { type: String },
	bio: { type: String },
	isAvailable: {type: Boolean, default: true },
	unavailableDates: [{ type: Date }],
	addedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    },
    { timestamps: true }
);

export default mongoose.model("Staff", staffSchema);
