import { useState } from "react";
import { motion } from "framer-motion";
import UseAxiosSecure from "@/Hooks/UseAxiosSecure";
import UseAuth from "@/Hooks/UseAuth";

const AiRecipesPage = () => {
  const axiosSecure = UseAxiosSecure();
  const { user } = UseAuth();
  const [ingredients, setIngredients] = useState("");
  const [loading, setLoading] = useState(false);
  const [recipe, setRecipe] = useState(null);
  const [error, setError] = useState("");

  const handleGenerateRecipe = async () => {
    if (!ingredients.trim()) {
      setError("Please enter some ingredients first!");
      return;
    }
    setError("");
    setRecipe(null);
    setLoading(true);

    try {
      const res = await axiosSecure.post("/ai-recipe", {
        ingredients: ingredients.split(",").map((i) => i.trim()),
        userEmail: user?.email,
      });

      setTimeout(() => {
        setRecipe(res.data);
        setLoading(false);
      }, 2000);
    } catch (err) {
      console.error(err);
      setError("Failed to generate recipe. Try again later.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-100 py-20 px-6 md:px-16">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-3xl mx-auto text-center py-12"
      >
        <h1 className="text-4xl font-bold text-accent mb-2">
          🤖 AI <span className="text-secondary">Recipe</span> Suggestion
        </h1>
        <p className="text-gray-600 mb-8">
          Enter ingredients and let AI create a healthy recipe for you!
        </p>

        <div className="flex flex-col md:flex-row gap-3 justify-center mb-6">
          <input
            type="text"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            placeholder="e.g. tomato, rice, egg, spinach"
            className="border border-green-300 rounded-lg px-4 py-3 w-full md:w-2/3 focus:ring-2 focus:ring-green-500"
          />
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleGenerateRecipe}
            disabled={loading}
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition disabled:opacity-50"
          >
            {loading ? "Generating..." : "🍳 Generate Recipe"}
          </motion.button>
        </div>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-8 text-gray-500 text-lg"
          >
            <span className="animate-pulse">AI is thinking...</span>
            <div className="flex justify-center mt-3 space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-bounce"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full animate-bounce delay-150"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full animate-bounce delay-300"></div>
            </div>
          </motion.div>
        )}

        {recipe && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mt-10 bg-white rounded-2xl shadow-lg p-6 text-left border-t-4 border-green-500"
          >
            <h2 className="text-2xl font-semibold text-green-700 mb-3">
              {recipe.title}
            </h2>
            <h3 className="text-lg font-medium text-gray-800">Ingredients:</h3>
            <ul className="list-disc ml-6 mb-3 text-gray-700">
              {recipe.ingredients.map((i, idx) => (
                <li key={idx}>{i}</li>
              ))}
            </ul>
            <h3 className="text-lg font-medium text-gray-800">Instructions:</h3>
            <ol className="list-decimal ml-6 text-gray-700">
              {recipe.instructions.map((step, idx) => (
                <li key={idx}>{step}</li>
              ))}
            </ol>
            <p className="text-green-500 font-medium mt-5">
              ✅ Recipe automatically saved to your account!
            </p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default AiRecipesPage;
