import { useEffect, useRef, useState } from "react";
import Message from "./Message";
import useGetMessages from "../../hooks/useGetMessages";
import MessageSkeleton from "../skeletons/MessageSkeleton";
import useListenMessages from "../../hooks/useListenMessages";

const Messages = () => {
  const [messagess,setMessagess] = useState([]);
  const { messages, loading } = useGetMessages();
  useListenMessages();
  const lastMessageRef = useRef();

  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
    setMessagess(messages);
  }, [messages]);
  return (
    <div className="px-4 flex-1 overflow-auto scrollbar-none">
      {!loading &&
        messages.length > 0 &&
        messagess.map((message) => (
          <div key={message._id} ref={lastMessageRef}>
            <Message message={message} setMessagess={setMessagess} messagess={messagess}/>
          </div>
        ))}
      {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}
      {!loading && messages.length === 0 && (
        <p className="text-center">Send a message to start the conversation</p>
      )}
    </div>
  );
};

export default Messages;
