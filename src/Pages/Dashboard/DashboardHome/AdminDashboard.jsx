import React, { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
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
    enabled: !!axiosSecure, // wait until axiosSecure is ready
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

  // Prepare weekly chart data
  const weeklyData = useMemo(() => {
    const today = new Date();
    return Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(today.getDate() - (6 - i));
      const dateStr = date.toISOString().split("T")[0];

      const expiredCount = foods.filter(f => f.expirydate === dateStr && new Date(f.expirydate) < today).length;
      const wastedCount = wastedFoods.filter(f => f.expirydate === dateStr).length;

      return {
        name: date.toLocaleDateString("en-US", { weekday: "short" }),
        expired: expiredCount,
        wasted: wastedCount,
      };
    });
  }, [foods, wastedFoods]);

  // Prepare pie chart data
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
        <Card>
          <CardHeader>
            <CardTitle>Weekly Expiry & Waste Trends</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="expired" fill="#3b82f6" radius={[6, 6, 0, 0]} />
                <Bar dataKey="wasted" fill="#ef4444" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

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
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activities */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activities</CardTitle>
        </CardHeader>
        <CardContent>
          <table className="min-w-full text-sm text-gray-600">
            <thead className="border-b font-semibold">
              <tr>
                <th className="py-2 text-left">User</th>
                <th className="py-2 text-left">Action</th>
                <th className="py-2 text-left">Time</th>
              </tr>
            </thead>
            <tbody>
              {users.slice(-5).map((user, idx) => (
                <tr key={idx} className="border-b">
                  <td className="py-2">{user.displayName || user.email}</td>
                  <td>Joined the system</td>
                  <td>Just now</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
