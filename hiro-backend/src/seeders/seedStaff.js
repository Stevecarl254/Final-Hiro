import dotenv from "dotenv";
import { connectDB } from "../config/database.js";
import Staff from "../models/Staff.js";

dotenv.config();

// Initialize database connection
await connectDB();

const sampleStaff = [
    {
	name: "Chef John Mwanjala",
	role: "CHEF",
	specialty: "Swahili dishes",
	experience: "10 years in Pwani and Tanzania cuisine",
	bio : "Let's enjoy Swahili flavors",
    },
    {
	name: "Chef Aisha Jane",
	role: "CHEF",
	specialty: "African Fusion",
	experience: "8 years of culinary artistry",
	bio: "Creates bold African fusion menus with global influences.",
    },
    {
	name: "Chef Daya Raj",
	role: "CHEF",
	specialty: "Indian Cuisine",
	experience: "12 years in fine dining and event catering",
	bio: "Expert in authentic Indian flavors with elegant presentation.",
    },
    {
	name: "Chef Bigisa Damaris",
	role: "CHEF",
	specialty: "Modern African Foods",
	experience: "9 years of culinary innovation",
	bio: "Combines traditional African recipes with contemporary flair.",
    },
    {
	name: "Alex Kimani",
	role: "HEAD_WAITER",
	experience: "7 years leading event service teams",
	bio: "Leads front-of-house staff ensuring seamless service at every event.",
    },
    {
	name: "Jane Mwende",
	role: "HEAD_WAITER",
	experience: "5 years in luxury catering",
	bio: "Ensures every guest enjoys an unforgettable service experience.",
    },
    {
	name: "Peter Otieno",
	role: "HEAD_WAITER",
	experience: "6 years in banquet and fine dining events",
	bio: "Expert in managing high-capacity dining experiences with precision.",
    },
    {
	name: "Brian King",
	role: "MIXOLOGIST",
	experience: "3 years crafting signature cocktails",
	bio: "Specializes in creating memorable drink experiences for events.",
    },
    {
	name: "Mary Kyavulani",
	role: "DECORATOR",
	experience: "8 years in event design and theming",
	bio: "Transforms ordinary spaces into breathtaking event scenes.",
    },
    {
	name: "David Ochieng",
	role: "PHOTOGRAPHER",
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
	role: "HEAD_CLEANER",
	experience: "15 years in event and hospitality cleaning",
	bio: "Ensures every event space is spotless before, during, and after.",
    },
];

try {
    // Delete all existing staff
    await Staff.destroy({ where: {} });
    
    // Create new staff records
    await Staff.bulkCreate(sampleStaff);
    
    console.log("✅ Staff profiles seeded successfully!");
    process.exit(0);
} catch (error) {
    console.error("❌ Error seeding staff:", error.message);
    process.exit(1);
}
