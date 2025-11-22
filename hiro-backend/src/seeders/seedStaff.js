import dotenv from "dotenv";
import mongoose from "mongoose";
import Staff from "../models/Staff.js"
import connectDB from "../config/db.js"

dotenv.config();
await connectDB();

const sampleStaff = [
    {
	name: "Chef John Mwanjala",
	role: "Chef",
	specialty: "Swahili dishes",
	experience: "10 years in Pwani and Tanzania cuisine",
	bio : "Let's enjoy Swahili flavors",
    },
    {
	name: "Chef Aisha Jane",
	role: "Chef",
	specialty: "African Fusion",
	experience: "8 years of culinary artistry",
	bio: "Creates bold African fusion menus with global influences.",
    },
    {
	name: "Chef Daya Raj",
	role: "Chef",
	specialty: "Indian Cuisine",
	experience: "12 years in fine dining and event catering",
	bio: "Expert in authentic Indian flavors with elegant presentation.",
    },
    {
	name: "Chef Bigisa Damaris",
	role: "Chef",
	specialty: "Modern African Foods",
	experience: "9 years of culinary innovation",
	bio: "Combines traditional African recipes with contemporary flair.",
    },
    {
	name: "Alex Kimani",
	role: "Head Waiter",
	experience: "7 years leading event service teams",
	bio: "Leads front-of-house staff ensuring seamless service at every event.",
    },
    {
	name: "Jane Mwende",
	role: "Head Waiter",
	experience: "5 years in luxury catering",
	bio: "Ensures every guest enjoys an unforgettable service experience.",
    },
    {
	name: "Peter Otieno",
	role: "Head Waiter",
	experience: "6 years in banquet and fine dining events",
	bio: "Expert in managing high-capacity dining experiences with precision.",
    },
    {
	name: "Brian King",
	role: "Mixologist",
	experience: "3 years crafting signature cocktails",
	bio: "Specializes in creating memorable drink experiences for events.",
    },
    {
	name: "Mary Kyavulani",
	role: "Decorator",
	experience: "8 years in event design and theming",
	bio: "Transforms ordinary spaces into breathtaking event scenes.",
    },
    {
	name: "David Ochieng",
	role: "Photographer",
	experience: "10 years capturing events and candid moments",
	bio: "Storyteller through the lens — immortalizing every memory.",
    },
    {
	name: "DJ Rash",
	role: "DJ",
	experience: "9 years energizing weddings and corporate events",
	bio: "Mixes vibrant soundtracks to match every mood and celebration.",
    },
    {
	name: "MC Tony",
	role: "MC",
	experience: "11 years hosting events with charisma and humor",
	bio: "Brings energy, class, and fun to every occasion.",
    },
    {
	name: "Lucy Naliaka",
	role: "Head Cleaner",
	experience: "15 years in event and hospitality cleaning",
	bio: "Ensures every event space is spotless before, during, and after.",
    },
];

try {
    await Staff.deleteMany();
    await Staff.insertMany(sampleStaff);
    console.log("Staff profiles seedeed successfully!");
    process.exit();
} catch (error) {
    console.error("❌ Error seeding staff:", error);
    process.exit(1);
}
