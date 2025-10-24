import UseAxios from "@/Hooks/UseAxios";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";

const AITipButton = ({ foodName, expiryDate }) => {
  const axiosInstance = UseAxios();
  const [tip, setTip] = useState("");
  const [loading, setLoading] = useState(false);

  const getTip = async () => {
    setLoading(true);
    setTip("");
    try {
      const res = await axiosInstance.post("/ai-tip", { foodName, expiryDate });
      setTip(res.data.tip);
    } catch (err) {
      setTip("⚠️ Failed to get AI tip.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 rounded-md shadow-sm text-center">
      <motion.button
        onClick={getTip}
        disabled={loading}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`relative overflow-hidden px-6 py-3 rounded-full font-medium text-white
          ${loading ? "cursor-wait" : "cursor-pointer"}
          bg-gradient-to-r from-indigo-950 via-cyan-700 to-indigo-950 
          shadow-lg transition-all duration-300`}
      >
        {/* Animated glowing aura */}
        <motion.div
          className="absolute inset-0 rounded-full opacity-60 blur-lg bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Shimmer sweep effect */}
        <motion.div
          className="absolute top-0 left-[-100%] w-[200%] h-full bg-gradient-to-r from-transparent via-white/30 to-transparent"
          animate={{
            x: ["-100%", "100%"],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Button Text */}
        <div className="relative flex items-center justify-center gap-2 z-10">
          {loading ? (
            <>
              <motion.div
                className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"
              ></motion.div>
              <span className="text-sm tracking-wide">AI is thinking...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5 text-yellow-300 animate-pulse" />
              <span className="text-sm tracking-wide">Get AI Tip</span>
            </>
          )}
        </div>
      </motion.button>

      {/* Animated tip display */}
      <AnimatePresence>
        {tip && (
          <motion.p
            key="ai-tip"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mt-4 text-gray-700 italic bg-gray-50 border border-gray-200 p-3 rounded-lg shadow-sm"
          >
            {tip}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AITipButton;
