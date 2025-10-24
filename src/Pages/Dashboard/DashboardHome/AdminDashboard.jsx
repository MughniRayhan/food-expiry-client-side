import React, { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { Users, AlertTriangle, Utensils, Trash2 } from "lucide-react";
import UseAxiosSecure from "@/Hooks/UseAxiosSecure";

const COLORS = ["#3b82f6", "#22c55e", "#facc15", "#ef4444"];

export default function AdminDashboard() {
  const axiosSecure = UseAxiosSecure();

  // Fetch users
  const { data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
    enabled: !!axiosSecure,
  });

  // Fetch foods
  const { data: foods = [] } = useQuery({
    queryKey: ["foods"],
    queryFn: async () => {
      const res = await axiosSecure.get("/foods");
      return res.data;
    },
    enabled: !!axiosSecure,
  });

  // Fetch wasted foods
  const { data: wastedFoods = [] } = useQuery({
    queryKey: ["wastedFoods"],
    queryFn: async () => {
      const res = await axiosSecure.get("/wasted-food");
      return res.data;
    },
    enabled: !!axiosSecure,
  });

  // Fetch nearly expired foods
  const { data: nearlyExpiredFoods = [] } = useQuery({
    queryKey: ["nearlyExpiredFoods"],
    queryFn: async () => {
      const res = await axiosSecure.get("/nearly-expiry");
      return res.data;
    },
    enabled: !!axiosSecure,
  });

  // Prepare top users by added foods
  const topUsersData = useMemo(() => {
    const countMap = {};
    foods.forEach((f) => {
      countMap[f.email] = (countMap[f.email] || 0) + 1;
    });
    const sortedUsers = Object.entries(countMap)
      .map(([email, count]) => {
        const user = users.find((u) => u.email === email);
        return { name: user?.displayName || email, addedFoods: count };
      })
      .sort((a, b) => b.addedFoods - a.addedFoods);
    return sortedUsers.slice(0, 5); // Top 5 users
  }, [foods, users]);

  // Pie chart data for wasted food by category
  const categoryData = useMemo(() => {
    const categoryMap = wastedFoods.reduce((acc, f) => {
      acc[f.category] = (acc[f.category] || 0) + 1;
      return acc;
    }, {});
    return Object.entries(categoryMap).map(([name, value]) => ({ name, value }));
  }, [wastedFoods]);

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-3xl font-bold text-accent mb-4">Admin Dashboard</h1>

      {/* Stats Overview */}
      <div className="grid gap-6 md:grid-cols-4 sm:grid-cols-2">
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardHeader className="flex items-center justify-between">
            <CardTitle>Total Users</CardTitle>
            <Users className="w-6 h-6" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{users.length}</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardHeader className="flex items-center justify-between">
            <CardTitle>Total Foods</CardTitle>
            <Utensils className="w-6 h-6" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{foods.length}</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white">
          <CardHeader className="flex items-center justify-between">
            <CardTitle>Active Alerts</CardTitle>
            <AlertTriangle className="w-6 h-6" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{nearlyExpiredFoods.length}</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-red-500 to-red-600 text-white">
          <CardHeader className="flex items-center justify-between">
            <CardTitle>Wasted Foods</CardTitle>
            <Trash2 className="w-6 h-6" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{wastedFoods.length}</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Top Users by Added Foods (Bar Chart) */}
        <Card>
          <CardHeader>
            <CardTitle>Top Users by Added Foods</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topUsersData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="addedFoods" fill="#3b82f6" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Wasted Food by Category */}
        <Card>
          <CardHeader>
            <CardTitle>Wasted Food by Category</CardTitle>
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
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
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
