import React, { useState } from "react";
import Navbar from "../components/Navbar";

const AddProfile = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(""); 

  const handleProfile = async (e) => {
    e.preventDefault();

    try {
        const formData = new FormData();
        formData.append("username", username);
        formData.append("email", email);
        formData.append("bio", bio);
        if (profileImage) {
            formData.append("ProfileImage", profileImage); 
        }

        const res = await fetch("/api/addProfile", {
            method: "POST",
            credentials: "include",
            body: formData, 
        });

        const data = await res.json();
        if (res.ok) {
            alert("Profile Updated Successfully!");
          
        } else {
            alert("Error: " + (data.message || "Something went wrong"));
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Something went wrong: " + error.message);
    }
};

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      setPreviewImage(URL.createObjectURL(file)); 
    }
  };

  return (
    <div className="bg-gray-800 w-full min-h-screen">
      <Navbar />

      <form className="md:mt-24 sm:mt-12" onSubmit={handleProfile}>
        <h1 className="text-white md:text-2xl font-semibold text-center">
          Edit Profile
        </h1>

        <div className="bg-gray-400 md:w-[400px] md:h-[200px] mt-4 mx-auto rounded-md flex flex-col items-center justify-center">
          <img
            src={previewImage || "images/editprofile.svg"}
            className="md:w-24 md:h-24 sm:w-12 sm:h-12 rounded-full border"
            alt="Profile Preview"
          />
        
           <label className="cursor-pointer text-blue-600 hover:underline">
                  Add new Profile Photo
                  <input
                   type="file"
                   className="hidden"
                   accept="image/*"
                   onChange={handleImageChange}
                  />
           </label>


        </div>

        <div className="grid md:w-[450px] mx-auto mt-8">
          <label className="text-orange-600 font-semibold text-xl">User Name:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full h-12 p-2 rounded-md border"
            required
          />

          <label className="text-orange-600 font-semibold text-xl mt-4">Email ID:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full h-12 p-2 rounded-md border"
            required
          />

          <label className="text-orange-600 font-semibold text-xl mt-4">Bio:</label>
          <textarea
            rows="4"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-full h-24 p-2 rounded-md border"
          ></textarea>

          <button
            type="submit"
            className="bg-white text-orange-900 w-24 h-12 mx-auto mt-6 rounded-lg text-lg font-semibold hover:bg-gray-300"
          >
            Done
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProfile;




























































































