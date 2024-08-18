import { useAuthContext } from "../../context/AuthContext";
import useDeleteMessage from "../../hooks/useDeleteMessage";
import { extractTime } from "../../utils/extractTime";
import useConversation from "../../zustand/useConversation";

const Message = ({ message, setMessagess, messagess }) => {
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();
  const fromMe = message.senderId === authUser._id;
  const formattedTime = extractTime(message.createdAt);
  const chatClassName = fromMe ? "chat-end" : "chat-start";
  const profilePic = fromMe
    ? authUser.profilePic
    : selectedConversation?.profilePic;
  const bubbleBgColor = fromMe ? "bg-blue-500" : "";

  const shakeClass = message.shouldShake ? "shake" : "";
  const { deleteMessage } = useDeleteMessage();

  const handleDelete = async () => {
    const data = await deleteMessage(message._id);
    if (data) {
      const updatedMessages = messagess.filter((m) => m._id !== message._id);
      setMessagess(updatedMessages);
    }
  };
  return (
    <div className={`chat ${chatClassName} cursor-pointer`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img alt="Tailwind CSS chat bubble component" src={profilePic || '/image.png'} />
        </div>
      </div>
      <div className="dropdown dropdown-bottom dropdown-end">
        <div
          tabIndex={0}
          role="button"
          className={`chat-bubble text-white pb-2 ${bubbleBgColor} ${shakeClass}`}
        >
          {message.message}
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
        >
          <li>
            <a onClick={handleDelete}>Delete the message</a>
          </li>
        </ul>
      </div>
      <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">
        {formattedTime}
      </div>
    </div>
  );
};

export default Message;
