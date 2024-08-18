import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useUpdateProfile = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const updateProfile = async ({fullName,profilePic}) => {
    if(!fullName && !profilePic){
      toast.error("Noting to update");
      return;
    }
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("fullName", fullName);
      if (profilePic) {
        formData.append("profilePic", profilePic);
      }

      const res = await fetch("/api/users/update-profile", {
        method: "PUT",
        body: formData,
      });

      const data = await res.json();

      if (data.error) {
        throw new Error(data.error);
      }

      localStorage.setItem("chat-user", JSON.stringify(data));
      setAuthUser(data);
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, updateProfile };
};

export default useUpdateProfile;
