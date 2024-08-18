import React, { useState } from 'react';
import Modal from 'react-modal';
import { IoIosClose } from "react-icons/io";

Modal.setAppElement('#root'); // To avoid accessibility issues

const ProfileModal = ({ isOpen, onRequestClose }) => {
  const [firstName, setFirstName] = useState('Amélie');
  const [lastName, setLastName] = useState('Laurent');
  const [profileImage, setProfileImage] = useState('/image.png');

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteAccount = () => {
    // Logic to request account deletion
    alert('Request to delete account has been sent.');
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onRequestClose={onRequestClose} 
      className="bg-white rounded-lg p-6 max-w-lg mx-auto mt-10"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Edit Profile</h2>
        <button onClick={onRequestClose}>
          <IoIosClose size={30} className="text-gray-600" />
        </button>
      </div>
      
      <div className="flex items-center mb-4">
        <img src={profileImage} alt="Profile" className="w-20 h-20 rounded-full object-cover mr-4" />
        <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" id="upload" />
        <label htmlFor="upload" className="cursor-pointer bg-gray-200 px-4 py-2 rounded-md">Upload Image</label>
      </div>

      
    </Modal>
  );
};

export default ProfileModal;
