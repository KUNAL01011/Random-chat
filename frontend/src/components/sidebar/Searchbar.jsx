import { IoIosSearch } from "react-icons/io";
import { IoMenuOutline } from "react-icons/io5";
import { useState } from "react";
import { HiMiniPencilSquare } from "react-icons/hi2";
import useConversation from "../../zustand/useConversation";
import useGetConversations from "../../hooks/useGetConversations";
import toast from "react-hot-toast";
// import { useAuthContext } from "../../context/AuthContext";
import useLogout from "../../hooks/useLogout";
import useUpdateProfile from "../../hooks/useUpdateProfile";

const Searchbar = () => {
  // Update the profile functionality
  const [fullName, setFullName] = useState("");
  const [profileImage, setProfileImage] = useState("/image.png");
  const [profilePic, setProfilePic] = useState(null);
  const { updateProfile } = useUpdateProfile();
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
      setProfilePic(file);
    }
  };

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    updateProfile({ profilePic, fullName });
    setProfilePic(null);
    setProfileImage('/image.png');
    setFullName("");
    // window.location.reload();
  };

  // Handling Search functionality
  const [search, setSearch] = useState("");
  const { setSelectedConversation } = useConversation();
  const { conversations } = useGetConversations();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search) return;
    if (search.length < 3) {
      return toast.error("Search term must be at least 3 characters long");
    }

    const conversation = conversations.find((c) =>
      c.fullName.toLowerCase().includes(search.toLowerCase())
    );

    if (conversation) {
      setSelectedConversation(conversation);
      setSearch("");
    } else toast.error("No such user found");
  };

  // Logout functionlity
  const { logout } = useLogout();
  // const { authUser } = useAuthContext();

  return (
    <div className="flex px-4 py-2 mb-2 w-full  bg-[#212121]">
      <div className="p-2 hover:bg-[#36373C] rounded-full mr-2">
        <div className="dropdown dropdown-bottom">
          <div tabIndex={0} role="button">
            <IoMenuOutline size={30} className="text-white" />
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
          >
            <li>
              <a
                onClick={() =>
                  document.getElementById("my_modal_2").showModal()
                }
              >
                Profile
              </a>
            </li>
            <li>
              <a onClick={logout}>Logout</a>
            </li>
          </ul>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="flex border border-gray-700 rounded-full w-full px-4 items-center ">
          <button type="submit">
            <IoIosSearch size={25} className="text-white" />
          </button>
          <input
            type="text"
            placeholder="Search"
            className="border-none outline-none w-full rounded-full bg-transparent px-4 py-2 "
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </form>

      <dialog id="my_modal_2" className="modal">
        <div className="modal-box">
          <form>
            <div className="flex items-center mb-4 justify-center relative">
              <div className="relative">
                <img
                  src={profileImage}
                  alt="Profile"
                  className="w-20 h-20 rounded-full object-cover mr-4"
                />
                <label
                  htmlFor="upload"
                  className=" absolute top-0 right-0 m-auto"
                >
                  <HiMiniPencilSquare size={30} />
                </label>
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="upload"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="border border-gray-300 rounded-md w-full p-2"
              />
            </div>

            <div className="flex justify-end mt-6">
              <button
                onClick={handleProfileUpdate}
                className="bg-blue-500 text-white rounded-md 300px:px-1 300px:py-1 300px:text-sm 700px:px-4 700px:py-2 hover:bg-blue-600"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default Searchbar;
