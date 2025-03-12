import React from 'react'
import homelogo from '../assets/images/home.svg'
import logo from '../assets/images/logo.svg'
import manager from '../assets/images/manager.svg'
import { Link ,useNavigate} from 'react-router-dom'
import PostCard from '../components/PostCard'


function AdminDash() {
  const navigate = useNavigate(); 
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

      <PostCard></PostCard>
    </div>
  )
}

export default AdminDash