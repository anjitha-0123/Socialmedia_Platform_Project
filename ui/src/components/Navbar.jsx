import React, { useState, useEffect } from "react";
import { Link,useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.svg";
import homelogo from "../assets/images/home.svg";
import logs from "../assets/images/logs.svg";
import manager from "../assets/images/manager.svg";
import defaultProfile from "../assets/images/person1.png"; 

function Navbar() {
  const [profileImage, setProfileImage] = useState(defaultProfile);
  const navigate=useNavigate();

  useEffect(() => {
    const fetchProfileImage = async () => {
      try {
        const res = await fetch("/api/getProfile", {
          method: "GET",
          credentials: "include",
        });

        const data = await res.json();

        if (res.ok && data.data?.image) {
          setProfileImage(`data:image/png;base64,${data.data.image}`);
        }
      } catch (err) {
        console.error("Error fetching profile image:", err);
      }
    };

    fetchProfileImage();
  }, []);

  const handleLogout = async () => {
    try {
      const response = await fetch('/logout', {
        method: 'GET',
        credentials: 'include', 
      });

      if (response.ok) {
        navigate('/login'); 
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <nav className="bg-orange-700 md:w-full rounded-lg md:ml-2 mt-1 md:h-[150px] flex justify-between">
      <div>
        <a>
          <img src={logo} className="md:w-[150px] md:h-[150px] sm:w-[95px] sm:h-[95px]" />
        </a>
      </div>
      <div className="flex md:ml-[800px] my-auto sm:ml-2">
        <Link to="/home" className="flex hover:bg-orange-800 rounded-lg">
          <img src={homelogo} className="md:w-[40px] md:h-[40px] sm:w-[20px] h-[20px]" />
          <p className="md:mt-1 md:text-2xl font-semibold">Home</p>
        </Link>
        <Link to="/addlog" className="flex md:ml-8 hover:bg-orange-800 rounded-lg">
          <img src={logs} className="md:w-[40px] md:h-[40px] sm:w-[20px] h-[20px]" />
          <p className="md:mt-1 md:text-2xl font-semibold">ADD LOGS</p>
        </Link>

        <Link to="/userinspiration" className="flex md:ml-8 hover:bg-orange-800 rounded-lg">
          <img src={manager} className="md:w-[40px] md:h-[40px] sm:w-[20px] h-[20px]" />
          <p className="md:mt-1 md:text-2xl font-semibold">View Inspirations</p>
        </Link>
      </div>
      <div className="md:mr-6 mt-3">
        <Link to="/getprofile">
          <img
            src={profileImage}
            className="md:w-[80px] md:h-[80px] rounded-full sm:w-[25px] sm:h-[25px] border border-white"
            alt="Profile"
          />
        </Link>
        <Link to="/getProfile">
          <p className="md:ml-2 md:text-xl md:font-semibold text-white sm:text-sm">Profile</p>
        </Link>
        
          <button onClick={handleLogout} className="md:ml-2 md:text-xl md:font-semibold text-white sm:text-sm">Logout</button>
        
      </div>
    </nav>
  );
}

export default Navbar;
