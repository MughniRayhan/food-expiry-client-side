import React, { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import { Utensils, AlertTriangle, Trash2 } from "lucide-react";
import UseAxiosSecure from "@/Hooks/UseAxiosSecure";
import UseAuth from "@/Hooks/UseAuth";

const COLORS = ["#3b82f6", "#22c55e", "#facc15", "#ef4444"];

export default function UserDashboard() {
  const axiosSecure = UseAxiosSecure();
  const { user } = UseAuth();
  const userEmail = user?.email;

  // Fetch all foods for this user
  const { data: foods = [] } = useQuery({
    queryKey: ["myFoods", userEmail],
    queryFn: async () => {
      const res = await axiosSecure.get("/foods");
      return res.data.filter(f => f.email === userEmail);
    },
    enabled: !!axiosSecure && !!userEmail,
  });

  const today = new Date();

  const expiredFoods = useMemo(
    () => foods.filter(f => new Date(f.expirydate) < today),
    [foods]
  );

  const nearlyExpiredFoods = useMemo(
    () => foods.filter(f => {
      const expiry = new Date(f.expirydate);
      const fiveDaysLater = new Date(today);
      fiveDaysLater.setDate(today.getDate() + 5);
      return expiry >= today && expiry <= fiveDaysLater;
    }),
    [foods]
  );

  // Recent Activities for graph (last 7 days)
  const recentActivityData = useMemo(() => {
    return Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(today.getDate() - (6 - i));
      const dateStr = date.toISOString().split("T")[0];

      const addedFoods = foods.filter(f => f.addedDate === dateStr).length;
      const expiredCount = foods.filter(f => f.expirydate === dateStr && new Date(f.expirydate) < today).length;

      return {
        name: date.toLocaleDateString("en-US", { weekday: "short" }),
        added: addedFoods,
        expired: expiredCount,
      };
    });
  }, [foods, today]);

  const categoryData = useMemo(() => {
    const categoryMap = foods.reduce((acc, f) => {
      acc[f.category] = (acc[f.category] || 0) + 1;
      return acc;
    }, {});
    return Object.entries(categoryMap).map(([name, value]) => ({ name, value }));
  }, [foods]);

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-3xl font-bold text-accent mb-4">Welcome, {user?.displayName || "User"}</h1>

      {/* --- Stats Overview --- */}
      <div className="grid gap-6 md:grid-cols-3 sm:grid-cols-2">
        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardHeader className="flex items-center justify-between">
            <CardTitle>My Foods</CardTitle>
            <Utensils className="w-6 h-6" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{foods.length}</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white">
          <CardHeader className="flex items-center justify-between">
            <CardTitle>Expiring Soon</CardTitle>
            <AlertTriangle className="w-6 h-6" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{nearlyExpiredFoods.length}</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-red-500 to-red-600 text-white">
          <CardHeader className="flex items-center justify-between">
            <CardTitle>Expired Foods</CardTitle>
            <Trash2 className="w-6 h-6" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{expiredFoods.length}</p>
          </CardContent>
        </Card>
      </div>

      {/* --- Charts --- */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Recent Activities Graph */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activities (Last 7 Days)</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={recentActivityData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="added" fill="#3b82f6" name="Foods Added" radius={[6, 6, 0, 0]} />
                <Bar dataKey="expired" fill="#ef4444" name="Expired Foods" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Category Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Foods by Category</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  label
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
