import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";

const UpdateProfile = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(""); // Preview Image
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch user profile data when the component loads
    const fetchProfile = async () => {
      try {
        const res = await fetch("/api/getProfile", {
          method: "GET",
          credentials: "include",
        });

        const data = await res.json();
        if (res.ok) {
          setUsername(data.username);
          setEmail(data.email);
          setBio(data.bio);
          setPreviewImage(data.image); // Set existing profile image
        } else {
          console.error("Error fetching profile:", data.message);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("UserName", username);
      formData.append("Email", email);
      formData.append("Bio", bio);
      if (profileImage) {
        formData.append("ProfileImage", profileImage);
      }

      const res = await fetch("/api/updateProfile", {
        method: "PUT",
        credentials: "include",
        body: formData,
      });

      if (res.ok) {
        alert("Profile Updated Successfully!");
        window.location.reload();
      } else {
        const data = await res.json();
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

  if (loading) return <p className="text-center text-white mt-10">Loading...</p>;

  return (
    <div className="bg-gray-800 w-full min-h-screen">
      <Navbar />

      <form className="md:mt-24 sm:mt-12" onSubmit={handleProfileUpdate}>
        <h1 className="text-white md:text-2xl font-semibold text-center">
          Update Profile
        </h1>

        <div className="bg-gray-400 md:w-[400px] md:h-[200px] mt-4 mx-auto rounded-md flex flex-col items-center justify-center">
          <img
            src={previewImage || "images/editprofile.svg"}
            className="md:w-24 md:h-24 sm:w-12 sm:h-12 rounded-full border"
            alt="Profile Preview"
          />
          <label
            htmlFor="profileimageinput"
            className="md:text-xl font-semibold cursor-pointer mt-2 text-blue-600 hover:underline"
          >
            Change Profile Photo
          </label>
          <input
            type="file"
            id="profileimageinput"
            className="hidden"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>

        <div className="grid md:w-[450px] mx-auto mt-8">
          <label className="text-orange-600 font-semibold text-xl">
            User Name:
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full h-12 p-2 rounded-md border"
            required
          />

          <label className="text-orange-600 font-semibold text-xl mt-4">
            Email ID:
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full h-12 p-2 rounded-md border"
            required
          />

          <label className="text-orange-600 font-semibold text-xl mt-4">
            Bio:
          </label>
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
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProfile;
