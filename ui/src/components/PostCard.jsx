import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const PostCard = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userRole, setUserRole] = useState("");
    const [selectedFile, setSelectedFile] = useState(null); 
    

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch("/api/getAllInspiration", {
                    method: "GET",
                    credentials: "include",
                    headers: { "Content-Type": "application/json" },
                });

                const data = await response.json();
                if (!Array.isArray(data)) {
                    throw new Error("Invalid data format: Expected an array");
                }

                setPosts(data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching inspirations:", error);
                setError(error.message);
                setPosts([]);
                setLoading(false);
            }
        };

        const fetchUserRole = async () => {
            try {
                const res = await fetch("/api/getUserRole", {
                    method: "GET",
                    credentials: "include",
                    headers: { "Content-Type": "application/json" },
                });

                const data = await res.json();
                if (data && data.userrole) {
                    setUserRole(data.userrole);
                } else {
                    console.error("Invalid user role response:", data);
                }
            } catch (error) {
                console.error("Error fetching user role:", error);
            }
        };

        fetchPosts();
        fetchUserRole();
    }, []);

    
    const handleUpdate = async (postTitle) => { 
        const newDescription = prompt("Enter new description:");
        if (!newDescription) return alert("Description is required!");
    
        const formData = new FormData();
           formData.append("title", postTitle);  
           formData.append("description", newDescription);
        
        if (selectedFile) {
            formData.append("InspImage", selectedFile);
        }
    
        try {
            const res = await fetch(`/api/updateinspiration`, {  
                method: "PATCH",
                credentials: "include",
                body: formData,
            });
            if (res.ok) {
                alert("Post updated successfully!");
                setPosts(posts.map(post => post.title === postTitle ? { ...post, description: newDescription } : post));
                setSelectedFile(null);
            } else {
                const errorText = await res.text();
                alert("Error: " + errorText);
            }
        } catch (error) {
            console.error("Error updating post:", error);
            alert("Something went wrong.");
        }
    };
    
    const handleDelete = async (postId) => {
        if (!window.confirm("Are you sure you want to delete this post?")) return;

        try {
            const res = await fetch(`/api/deleteInspiration/${postId}`, {
                method: "DELETE",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
            });

            if (res.ok) {
                alert("Post deleted successfully!");
                setPosts(posts.filter(post => post._id !== postId));
            } else {
                const errorData = await res.json();
                alert("Error: " + errorData.message);
            }
        } catch (error) {
            console.error("Error deleting post:", error);
            alert("Something went wrong.");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 py-10">
           
            <h2 className="text-4xl font-bold text-center mb-10 font-serif">All Inspirations</h2>

            {loading && <p className="text-center text-lg">Loading inspirations...</p>}
            {error && <p className="text-center text-red-600">{error}</p>}
            {!loading && !error && posts.length === 0 && <p className="text-center text-lg">No inspirations found.</p>}

            <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6">
                {posts.map((post) => (
                    <div key={post._id} className="relative">
                        <Link to={`/postcomment/${post._id}`} className="block">
                            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
                                <h3 className="text-xl font-semibold">{post.title}</h3>
                                <p className="text-gray-700 mt-2">{post.description}</p>

                                {post.image && (
                                    <img
                                        src={`data:image/png;base64,${post.image}`}
                                        alt={post.title}
                                        className="w-full h-48 object-cover mt-4 rounded-lg"
                                    />
                                )}
                            </div>
                        </Link>

                        {userRole === "admin" && (
                            <div className="absolute top-4 right-4 flex gap-2">
                               <button
                                         onClick={() => handleUpdate(post.title)} 
                                         className="bg-blue-500 text-white px-4 py-2 rounded" >
                                          Update
                                </button>


                                <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    id={`fileInput-${post._id}`}
                                    onChange={(e) => setSelectedFile(e.target.files[0])}
                                />

                                <button
                                    onClick={() => document.getElementById(`fileInput-${post._id}`).click()}
                                    className="bg-gray-500 text-white px-4 py-2 rounded"
                                >
                                    Upload Image
                                </button>

                                <button
                                    onClick={() => handleDelete(post._id)}
                                    className="bg-red-500 text-white px-4 py-2 rounded"
                                >
                                    Delete
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PostCard;
















































































































// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faComment } from "@fortawesome/free-solid-svg-icons";

// const PostCard = () => {
//     const [posts, setPosts] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [userRole, setUserRole] = useState("");
//     const [selectedFile, setSelectedFile] = useState(null);
//     const [comments, setComments] = useState({});
//     const [storedComments, setStoredComments] = useState({});
//     const [commentVisibility, setCommentVisibility] = useState({});

//     useEffect(() => {
//         const fetchPosts = async () => {
//             try {
//                 const response = await fetch("/api/getAllInspiration", {
//                     method: "GET",
//                     credentials: "include",
//                     headers: { "Content-Type": "application/json" },
//                 });
//                 const data = await response.json();
//                 if (!Array.isArray(data)) throw new Error("Invalid data format");
//                 setPosts(data);
//                 setLoading(false);
//                 setStoredComments(JSON.parse(localStorage.getItem("comments")) || {});
//             } catch (error) {
//                 setError(error.message);
//                 setLoading(false);
//             }
//         };

//         const fetchUserRole = async () => {
//             try {
//                 const res = await fetch("/api/getUserRole", {
//                     method: "GET",
//                     credentials: "include",
//                     headers: { "Content-Type": "application/json" },
//                 });
//                 const data = await res.json();
//                 if (data && data.userrole) setUserRole(data.userrole);
//             } catch (error) {
//                 console.error("Error fetching user role:", error);
//             }
//         };

//         fetchPosts();
//         fetchUserRole();
//     }, []);

//     const toggleCommentField = (id) => {
//         setCommentVisibility((prev) => ({ ...prev, [id]: !prev[id] }));
//     };

//     const handleCommentChange = (id, event) => {
//         setComments((prev) => ({ ...prev, [id]: event.target.value }));
//     };

//     const handleCommentSubmit = (id) => {
//         if (!comments[id]) return;
//         const updatedComments = {
//             ...storedComments,
//             [id]: [...(storedComments[id] || []), comments[id]],
//         };
//         localStorage.setItem("comments", JSON.stringify(updatedComments));
//         setStoredComments(updatedComments);
//         setComments((prev) => ({ ...prev, [id]: "" }));
//     };

//     return (
//         <div className="min-h-screen bg-gray-100 py-10">
//             <h2 className="text-4xl font-bold text-center mb-10 font-serif">All Inspirations</h2>
//             {loading && <p className="text-center text-lg">Loading inspirations...</p>}
//             {error && <p className="text-center text-red-600">{error}</p>}
//             {!loading && !error && posts.length === 0 && <p className="text-center text-lg">No inspirations found.</p>}

//             <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6">
//                 {posts.map((post) => (
//                     <div key={post._id} className="relative bg-white p-6 rounded-lg shadow-md">
//                         <Link to={`/postcomment/${post._id}`} className="block">
//                             <h3 className="text-xl font-semibold">{post.title}</h3>
//                             <p className="text-gray-700 mt-2">{post.description}</p>
//                             {post.image && (
//                                 <img
//                                     src={`data:image/png;base64,${post.image}`}
//                                     alt={post.title}
//                                     className="w-full h-48 object-cover mt-4 rounded-lg"
//                                 />
//                             )}
//                         </Link>
//                         <button
//                             className="mt-4 flex items-center text-gray-700 hover:text-gray-600 transition"
//                             onClick={() => toggleCommentField(post._id)}
//                         >
//                             <FontAwesomeIcon icon={faComment} className="mr-2" /> Comment
//                         </button>
//                         {commentVisibility[post._id] && (
//                             <div className="mt-2">
//                                 <input
//                                     type="text"
//                                     className="w-full p-2 border rounded-lg"
//                                     placeholder="Write a comment..."
//                                     value={comments[post._id] || ""}
//                                     onChange={(event) => handleCommentChange(post._id, event)}
//                                 />
//                                 <button
//                                     className="mt-2 bg-gray-500 text-white px-3 py-1 rounded-lg hover:bg-gray-600"
//                                     onClick={() => handleCommentSubmit(post._id)}
//                                 >
//                                     Post
//                                 </button>
//                                 {storedComments[post._id]?.map((comment, index) => (
//                                     <p key={index} className="text-gray-600 text-sm mt-1">{comment}</p>
//                                 ))}
//                             </div>
//                         )}
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default PostCard;









