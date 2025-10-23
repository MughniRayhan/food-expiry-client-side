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
import { Separator } from "@/components/ui/separator";
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
  const { user, logOut, setUser } = UseAuth(); // make sure UseAuth can update user
  const axiosPublic = UseAxios();
  const { role } = useUserRole();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [displayName, setDisplayName] = useState(user?.displayName || "");
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "");

  const handleLogout = async () => {
    try {
      await logOut();
      window.location.href = "/login";
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const handleProfileUpdate = async () => {
    if (!user?.email) return;
    setLoading(true);
    try {
      const { data } = await axiosPublic.put(`/users/profile/${user.email}`, {
        displayName,
        photoURL,
      });

      toast.success("Profile updated!");

      // update frontend state directly
      setUser(prev => ({ ...prev, displayName, photoURL }));
      setOpen(false);
    } catch (error) {
      console.error("Failed to update profile:", error);
      toast.error("Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-6">
      <Card className="w-full max-w-lg bg-white shadow-lg rounded-2xl border border-gray-200">
        <CardHeader className="text-center">
          <div className="flex flex-col items-center space-y-3">
            <Avatar className="w-24 h-24 ring-4 ring-primary/20">
              <AvatarImage src={photoURL} alt={displayName} />
              <AvatarFallback>
                {displayName?.charAt(0)?.toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>
            <CardTitle className="text-3xl font-semibold text-gray-800">
              {displayName || "User Name"}
            </CardTitle>
            <Badge
              variant="secondary"
              className="text-sm px-3 py-1 bg-primary text-white rounded-full"
            >
              {role || "user"}
            </Badge>
          </div>
        </CardHeader>

        <Separator className="my-4" />

        <CardContent className="space-y-4 text-gray-700">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Email</span>
            <span>{user?.email}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Joined</span>
            <span>
              {user?.metadata?.creationTime
                ? new Date(user.metadata.creationTime).toLocaleDateString()
                : "—"}
            </span>
          </div>
        </CardContent>

        <CardFooter className="flex justify-between mt-4">
          <Button
            variant="outline"
            onClick={() => setOpen(true)}
            className="w-[48%] hover:bg-accent hover:text-white cursor-pointer"
          >
            Edit Profile
          </Button>
          <Button
            onClick={handleLogout}
            className="w-[48%] bg-red-600 hover:bg-red-700 text-white cursor-pointer"
          >
            Logout
          </Button>
        </CardFooter>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-white border border-gray-200 shadow-xl sm:max-w-md rounded-xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">Edit Profile</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 mt-4">
            <div>
              <Label htmlFor="name" className="text-gray-700">
                Name
              </Label>
              <Input
                id="name"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="photo" className="text-gray-700">
                Photo URL
              </Label>
              <Input
                id="photo"
                value={photoURL}
                onChange={(e) => setPhotoURL(e.target.value)}
                className="mt-1"
              />
            </div>
          </div>

          <DialogFooter className="mt-6">
            <Button
              onClick={handleProfileUpdate}
              disabled={loading}
              className="w-full bg-primary text-white hover:bg-primary/90"
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
