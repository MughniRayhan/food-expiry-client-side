import React, { useEffect, useState } from "react";
import { Bell } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import UseAxiosSecure from "@/Hooks/UseAxiosSecure";

export default function NotificationBar({ userEmail }) {
  const axiosSecure = UseAxiosSecure();
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await axiosSecure.get(`/notifications/${userEmail}`);
        setNotifications(res.data);
      } catch (error) {
        console.error("Failed to fetch notifications:", error);
      }
    };

    fetchNotifications();
    const interval = setInterval(fetchNotifications, 60 * 1000); // refresh every 1 min
    return () => clearInterval(interval);
  }, [userEmail, axiosSecure]);

  return (
    <div className="relative">
      <motion.button
        onClick={() => setOpen(!open)}
        className="relative p-2 rounded-full hover:bg-base-100"
        whileHover={{ scale: 1.1 }}
      >
        <Bell className="w-6 h-6 text-accent" />
        {notifications.length > 0 && (
          <motion.span
            animate={{ scale: [1, 1.4, 1] }}
            transition={{ repeat: Infinity, duration: 1.2 }}
            className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full"
          />
        )}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute right-0 mt-2 w-80 bg-white shadow-lg rounded-lg z-50 overflow-hidden"
          >
            <div className="max-h-96 overflow-y-auto">
              {notifications.length === 0 ? (
                <p className="p-4 text-gray-500">No notifications</p>
              ) : (
                notifications.map((n, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 50 }}
                    transition={{ delay: i * 0.05 }}
                    className={`p-3 border-b flex items-center gap-3 ${
                      n.type === "warning" ? "bg-yellow-50" :
                      n.type === "error" ? "bg-red-50" :
                      "bg-blue-50"
                    }`}
                  >
                    <span className="flex-1 text-sm text-gray-700">{n.message}</span>
                    <span className="text-xs text-gray-400">{new Date(n.date).toLocaleDateString()}</span>
                  </motion.div>
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
