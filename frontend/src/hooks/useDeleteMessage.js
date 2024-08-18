import { useState } from "react";
import toast from "react-hot-toast";

const useDeleteMessage = () => {
  const [loading, setLoading] = useState(false);

  const deleteMessage = async (messageId) => {
    setLoading(true);
    try {
      // Send a DELETE request to the API to delete the message
      const res = await fetch(`/api/messages/${messageId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      if (data.error) {
        throw new Error(data.error);
      }

      toast.success("Message deleted successfully");
      return data.message;
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, deleteMessage };
};

export default useDeleteMessage;
