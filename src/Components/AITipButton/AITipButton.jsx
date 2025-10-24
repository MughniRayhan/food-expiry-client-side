import UseAxios from "@/Hooks/UseAxios";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
      setTip("Failed to get AI tip 😔");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border p-4 rounded-md shadow-sm bg-white">
      <button
        onClick={getTip}
        disabled={loading}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 cursor-pointer w-full"
      >
        {loading ? (
          <div className="flex items-center gap-2 text-cyan-400 text-sm animate-pulse">
            <span className="loading loading-dots loading-sm"></span>
            <span>AI is generating tip...</span>
          </div>
        ) : (
          "Get AI Tip"
        )}
      </button>

      {/* Animate tip sliding in */}
      <AnimatePresence>
        {tip && (
          <motion.p
            key="ai-tip"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="mt-3 text-gray-700 italic bg-gray-100 p-2 rounded"
          >
            {tip}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AITipButton;
