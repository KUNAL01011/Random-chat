import useConversation from "../../zustand/useConversation";
import Conversations from "./Conversations";
import Searchbar from "./Searchbar";

const Sidebar = () => {
  const { selectedConversation } = useConversation();
  const chatSelected = selectedConversation !== null ? true : false;
  return (
    <div className={`overflow-auto h-full scrollbar-none ${chatSelected ? "300px:hidden 700px:block" : ""} 300px:w-full 700px:w-[400px]`}>
      <div className="sticky top-0 z-50">
        <Searchbar />
      </div>
      <Conversations />
    </div>
  );
};

export default Sidebar;
