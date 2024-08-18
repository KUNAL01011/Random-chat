import { useEffect } from "react";
import useConversation from "../../zustand/useConversation";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import { MdOutlineCancel } from "react-icons/md";
import { useAuthContext } from "../../context/AuthContext";
import { TiMessages } from "react-icons/ti";
import { useSocketContext } from "../../context/SocketContext";
const MessageContainer = () => {
  const { selectedConversation, setSelectedConversation } = useConversation();

  const { onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(selectedConversation?._id);
  useEffect(() => {
    return () => setSelectedConversation(null);
  }, [setSelectedConversation]);
  return (
    <div
      className={`flex flex-col ml-1 w-full text-white ${
        selectedConversation ? "" : "300px:hidden 700px:flex"
      }`}
    >
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <>
          {/* Header */}
          <div className="flex   bg-[#212121] h-[62px] justify-between items-center px-5">
            <div className="flex gap-2 items-center">
              <img
                src={selectedConversation.profilePic}
                className="w-12 h-12 rounded-full"
                alt=""
              />
              <div className="flex flex-col">
                <span className="font-bold">
                  {selectedConversation.fullName}
                </span>
                <span className="text-sm">
                  {isOnline ? "online" : "offline"}
                </span>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="cursor-pointer">
                <MdOutlineCancel
                  size={25}
                  onClick={() => setSelectedConversation(null)}
                />
              </div>
            </div>
          </div>

          <Messages />
          <MessageInput />
        </>
      )}
    </div>
  );
};

export default MessageContainer;

const NoChatSelected = () => {
  const { authUser } = useAuthContext();
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2">
        <p>Welcome {authUser.fullName} </p>
        <p>Select a chat to messaging</p>
        <TiMessages className="text-3xl md:text-6xl text-center" />
      </div>
    </div>
  );
};
