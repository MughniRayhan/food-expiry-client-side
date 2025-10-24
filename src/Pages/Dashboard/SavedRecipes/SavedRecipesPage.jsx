import UseAuth from "@/Hooks/UseAuth";
import UseAxiosSecure from "@/Hooks/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";

const SavedRecipesPage = () => {
  const axiosSecure = UseAxiosSecure();
  const { user } = UseAuth();

  const { data: recipes = [], isLoading } = useQuery({
    queryKey: ["savedRecipes", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/recipes/${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  if (isLoading)
    return (
      <div className="text-center mt-10 text-green-600 text-lg animate-pulse">
        Loading your saved recipes...
      </div>
    );

  return (
    <div className="min-h-screen bg-base-200 py-12 px-6 md:px-16">
      <h1 className="text-3xl font-bold text-accent text-center mb-8">
        🍽️ Your Saved <span className="text-secondary" >Recipes</span>
      </h1>
      {recipes.length === 0 ? (
        <p className="text-center text-gray-600">No saved recipes yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes.map((r, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.03 }}
              className="bg-white p-5 rounded-xl shadow-md border-t-4 border-green-500"
            >
              <h2 className="text-xl font-semibold text-green-700 mb-2">
                {r.title}
              </h2>
              <p className="text-sm text-gray-500 mb-2">
                {new Date(r.createdAt).toLocaleString()}
              </p>
              <h3 className="font-medium text-gray-800">Ingredients:</h3>
              <ul className="list-disc ml-5 text-gray-700 text-sm">
                {r.ingredients.map((i, iidx) => (
                  <li key={iidx}>{i}</li>
                ))}
              </ul>
              <h3 className="font-medium text-gray-800 mt-2">Instructions:</h3>
              <ol className="list-decimal ml-5 text-gray-700 text-sm">
                {r.instructions.map((step, sidx) => (
                  <li key={sidx}>{step}</li>
                ))}
              </ol>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedRecipesPage;
