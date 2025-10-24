import { motion } from "framer-motion";
import {
  BellIcon,
  BrainIcon,
  UtensilsIcon,
  ClockIcon,
  RecycleIcon,
  LayoutDashboardIcon,
  CloudIcon,
  UserCogIcon,
} from "lucide-react";

const features = [
  {
    icon: BrainIcon,
    title: "AI Tips for Added Foods",
    description:
      "Get smart AI-generated tips on how to store your food better and extend its freshness based on expiry dates.",
  },
  {
    icon: UtensilsIcon,
    title: "AI Recipe Suggestions",
    description:
      "Use your available ingredients to get creative and healthy recipe ideas generated instantly by AI.",
  },
  {
    icon: ClockIcon,
    title: "Food Tracking",
    description:
      "Easily monitor all your stored foods and stay updated on expiry dates to avoid last-minute surprises.",
  },
  {
    icon: RecycleIcon,
    title: "Reduce Wasted Foods",
    description:
      "Take control of food waste with timely alerts and intelligent recommendations on what to use first.",
  },
  {
    icon: BellIcon,
    title: "Smart Notifications",
    description:
      "Get real-time notifications for nearly expired items, AI tips, and important updates directly in your dashboard.",
  },
  
  {
    icon: CloudIcon,
    title: "Secure Cloud Sync",
    description:
      "Your food data, preferences, and recipes are safely stored in the cloud and synced across all your devices.",
  },
  {
    icon: UserCogIcon,
    title: "User Profile & Roles",
    description:
      "Manage your account, edit profile details, and assign admin roles effortlessly from your profile panel.",
  },
];

export default function FeaturesSection() {
  return (
     <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 1 }}
          className="py-20 md:px-30 px-4 bg-base-200 w-full"
        >
          <h2 className="text-center text-3xl text-accent font-semibold">
          Powerful & <span className="text-secondary">Smart Features</span>
        </h2>
        <p className="text-gray-600 text-lg text-center mb-10">
          Discover how AI and automation make food management effortless.
        </p>
      

      <div className="grid sm:grid-cols-2 gap-10 max-w-6xl mx-auto px-4">
        {features.map((feat, index) => {
          const Icon = feat.icon;
          return (
            <motion.div
              key={index}
              whileHover={{ scale: 1.03 }}
              className="bg-base-200 shadow-md rounded-2xl p-6 border border-gray-100 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center gap-4 mb-4">
                <motion.div
                  animate={{
                    y: [0, -6, 0],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Icon className="text-primary w-10 h-10" />
                </motion.div>
                <h3 className="text-xl font-semibold text-accent">
                  {feat.title}
                </h3>
              </div>
              <p className="text-gray-600 text-justify leading-relaxed">
                {feat.description}
              </p>
            </motion.div>
          );
        })}
      </div>
    </motion.section>
  );
}
