import React, { useState } from 'react';
import { Link ,useNavigate} from 'react-router-dom'
import homelogo from '../assets/images/home.svg'
import logo from '../assets/images/logo.svg'
import manager from '../assets/images/manager.svg'

 const AddPost=()=>{
  const navigate = useNavigate(); 

  const [title,setTitle]=useState("");
  const [description,setDescription]=useState("")
  const [InspImage,setInspimage]=useState(null);

  const handlePost = async (e) => {
    e.preventDefault();

    if (!title || !description || !InspImage) {
        alert("Please provide title, description, and an image.");
        return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("InspImage", InspImage); 

    try {
        const res = await fetch("/api/addinspiration", {
            method: "POST",
            credentials: "include",
            body: formData, 
        });

        const result = await res.json();
        console.log("Upload Response:", result);

        if (res.ok) {
            alert("Post Added Successfully");
            setTitle("");
            setDescription("");
            setInspimage(null);
            document.getElementById("Inspimageinput").value = "";
        } else {
            alert("Error: " + (result.message || "Something went wrong"));
        }
    } catch (error) {
        console.error("Error uploading inspiration:", error);
        alert("Something went wrong: " + error.message);
    }
};
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

return(
  <div>
       <nav className="bg-orange-700  rounded-lg md:ml-2 mt-1 md:h-[150px] flex justify-between">
      <div>
        <a>
          <img src={logo} className="md:w-[300px] md:h-[150px] sm:w-[95px] sm:h-[95px]" />
        </a>
      </div>
      <div className="flex md:ml-[1200px] my-auto w-full sm:ml-2">
        <Link to="/admindash" className="flex hover:bg-orange-800 rounded-lg">
          <img src={homelogo} className="md:w-[40px] md:h-[40px] sm:w-[20px] h-[20px]" />
          <p className="md:mt-1 md:text-2xl font-semibold">Home</p>
        </Link>
      
        <Link to="/addpost" className="flex md:ml-8 hover:bg-orange-800 rounded-lg">
          <img src={manager} className="md:w-[40px] md:h-[40px] sm:w-[20px] h-[20px]" />
          <p className="md:mt-1 md:text-2xl font-semibold">Add Inspirations</p>
        </Link>

  
        <button onClick={handleLogout}  className="md:mt-1 md:text-2xl ml-4 font-semibold">
          LogOut
        </button>
      </div>
     
    </nav>
 
  <div className="max-w-3xl mx-auto mt-12 p-6 bg-gray-700 rounded-lg shadow-lg text-white">
  <h2 className="text-2xl font-bold text-center mb-4">Manage Inspirations</h2>
  

     <form  onSubmit={handlePost} >
   
        <input
          type="text"
          id='title'
          placeholder="Title"
          className="w-full p-2 rounded bg-gray-600 text-white"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Description"
          id='description'
          className="w-full  mt-2 p-4 rounded bg-gray-600 text-white"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input id="Inspimageinput" type="file" accept="image/*" onChange={(e)=>setInspimage(e.target.files[0])} className="text-white border-2 border-white w-full rounded" />

        <button type="submit" className="w-full bg-orange-600 mt-4 p-2 rounded"> Add Inspiration
        </button>

     
      
     </form>

  </div>


</div>
     );
 };

export default AddPost