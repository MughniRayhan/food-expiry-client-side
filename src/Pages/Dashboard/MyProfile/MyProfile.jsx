import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import UseAuth from "@/Hooks/UseAuth";
import useUserRole from "@/Hooks/useUserRole";
import { toast } from "react-toastify";
import UseAxios from "@/Hooks/UseAxios";

function MyProfile() {
  const { user, logOut, setUser } = UseAuth();
  const axiosPublic = UseAxios();
  const { role } = useUserRole();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [displayName, setDisplayName] = useState(user?.displayName || "");
  const [photoFile, setPhotoFile] = useState(null);
  const [previewURL, setPreviewURL] = useState(user?.photoURL || "");

  const handleLogout = async () => {
    try {
      await logOut();
      window.location.href = "/login";
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhotoFile(file);
      setPreviewURL(URL.createObjectURL(file));
    }
  };

  const handleProfileUpdate = async () => {
    if (!user?.email) return;
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("displayName", displayName);
      if (photoFile) formData.append("photo", photoFile);

      const { data } = await axiosPublic.put(
        `/users/profile/${user.email}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      toast.success("Profile updated!");
      setUser((prev) => ({ ...prev, displayName, photoURL: data.photoURL || previewURL }));
      setOpen(false);
    } catch (error) {
      console.error("Failed to update profile:", error);
      toast.error("Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-base-100 p-6 animate-fadeIn">
      <Card className="w-full max-w-lg bg-base-200 shadow-2xl rounded-3xl border border-gray-200 transform hover:-translate-y-2 transition-all duration-500">
        {/* Header */}
        <CardHeader className="text-center bg-gradient-to-r from-indigo-900 to-indigo-500 rounded-t-3xl py-10 animate-fadeInDown">
          <div className="flex flex-col items-center space-y-4">
            <div className="relative group">
              <Avatar className="w-28 h-28 ring-4 ring-white shadow-lg transition-transform duration-300 group-hover:scale-110">
                <AvatarImage src={previewURL} alt={displayName} />
                <AvatarFallback className="text-xl font-bold text-white">
                  {displayName?.charAt(0)?.toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>
              <div className="absolute inset-0 bg-black bg-opacity-25 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                <span className="text-white font-semibold text-sm">Change</span>
              </div>
            </div>
            <CardTitle className="text-2xl sm:text-3xl font-bold text-white animate-pulse">
              {displayName || "User Name"}
            </CardTitle>
            <Badge className="bg-white text-purple-600 font-semibold px-4 py-1 rounded-full shadow-md ">
              {role || "user"}
            </Badge>
          </div>
        </CardHeader>

        {/* Content */}
        <CardContent className="space-y-6 p-6">
          <div className="flex justify-between text-sm sm:text-base">
            <span className="text-accent font-medium">Email</span>
            <span className="text-accent font-semibold">{user?.email}</span>
          </div>
          <div className="flex justify-between text-sm sm:text-base">
            <span className="text-accent font-medium">Joined</span>
            <span className="text-accent font-semibold">
              {user?.metadata?.creationTime
                ? new Date(user.metadata.creationTime).toLocaleDateString()
                : "—"}
            </span>
          </div>
        </CardContent>

        {/* Footer Buttons */}
        <CardFooter className="flex flex-col sm:flex-row justify-between gap-3 p-6">
          <Button
            variant="outline"
            onClick={() => setOpen(true)}
            className="w-full sm:w-[48%] border hover:bg-indigo-900 hover:text-white transition-all"
          >
            Edit Profile
          </Button>
          <Button
            onClick={handleLogout}
            className="w-full sm:w-[48%] bg-red-600 hover:bg-red-700 text-white transition-all"
          >
            Logout
          </Button>
        </CardFooter>
      </Card>

      {/* Edit Profile Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-white border border-gray-200 shadow-xl sm:max-w-md rounded-2xl animate-fadeInUp">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-gray-800">
              Edit Profile
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 mt-4">
            <div className="flex flex-col items-center">
              <Avatar className="w-24 h-24 ring-2 ring-purple-400 shadow-md mb-2">
                <AvatarImage src={previewURL} />
                <AvatarFallback className="text-xl font-bold text-gray-500">
                  {displayName?.charAt(0)?.toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>
              <Input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="name" className="text-gray-700 font-medium">
                Name
              </Label>
              <Input
                id="name"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="mt-1 border-purple-300 focus:ring-2 focus:ring-purple-400"
                placeholder="Enter your name"
              />
            </div>
          </div>

          <DialogFooter className="mt-6">
            <Button
              onClick={handleProfileUpdate}
              disabled={loading}
              className="w-full bg-purple-600 text-white hover:bg-purple-700 transition-all"
            >
              {loading ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default MyProfile;
