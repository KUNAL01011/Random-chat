import Sidebar from '../components/sidebar/Sidebar'
import MessageContainer from '../components/messages/MessageContainer'
const HomePage = () => {
  return (
    <div className="h-screen bg-custom-image bg-cover bg-center relative overflow-hidden">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 h-full p-4 flex">
        <Sidebar/>
        <MessageContainer/>
      </div>
    </div>
  );
};

export default HomePage;

{
  /* <div className="absolute inset-0 bg-black opacity-50"></div> */
}
