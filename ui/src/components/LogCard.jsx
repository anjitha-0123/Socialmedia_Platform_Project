import React, { useState } from "react";

const LogCard = ({ log, fetchLogs }) => {
    const [filter, setFilter] = useState(""); // Search filter state
    const [showFullDescription, setShowFullDescription] = useState(false); // Single state for all logs

    const handleDelete = async (title) => {
        if (!window.confirm("Are you sure you want to delete this log?")) return;

        try {
            const res = await fetch("http://localhost:3000/api/deleteLog", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ Title: title }),
            });

            if (!res.ok) throw new Error("Failed to delete log");

            alert("Log deleted successfully");
            if (fetchLogs) fetchLogs(); // Refresh logs after deletion
        } catch (error) {
            console.error("Error deleting log:", error);
            alert("Failed to delete log: " + error.message);
        }
    };

    // Filter logs based on search criteria
    const filteredLogs = log.logs.filter((entry) =>
        entry.title.toLowerCase().includes(filter.toLowerCase()) ||
        entry.category.toLowerCase().includes(filter.toLowerCase())
    );

    return (
        <div className="w-full p-4">
            {/* Search Input */}
            <input
                type="text"
                placeholder="Search logs by title or category..."
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="w-full p-2 mb-4 border rounded-lg text-black"
            />

            {/* Show More/Less Button (Controls ALL descriptions) */}
            <button
                className="text-purple-800 hover:text-purple-900 py-2 mb-4"
                onClick={() => setShowFullDescription(!showFullDescription)}
            >
                {showFullDescription ? "Show Less" : "Show More"}
            </button>

            {/* Logs Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {filteredLogs.map((entry) => (
                    <div key={entry._id} className="border p-4 rounded-lg bg-gray-800 text-white">
                        {/* Image */}
                        {entry.image && (
                            <div className="w-full h-48 flex items-center justify-center bg-gray-900 rounded">
                                <img
                                    src={entry.image}
                                    alt={entry.title}
                                    className="w-full h-full object-contain rounded"
                                />
                            </div>
                        )}

                        {/* Log Details */}
                        <h3 className="text-lg font-bold mt-2">{entry.category}</h3>
                        <h1 className="text-lg font-bold mt-2">{entry.title}</h1>
                        <p className="text-white mt-2">
                            {showFullDescription
                                ? entry.description
                                : entry.description.substring(0, 80)}
                        </p>

                        <p className="text-sm text-gray-400 mt-2">Target Date: {entry.targetdate}</p>

                        {/* Delete Button */}
                        <button
                            className="bg-red-600 hover:bg-red-700 text-white text-xl h-12 w-24 mt-4 rounded-lg"
                            onClick={() => handleDelete(entry.title)}>
                            Delete
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LogCard;





































































































































// import React, { useState } from "react";

// const LogCard = ({ log, fetchLogs }) => {
//     const [filter, setFilter] = useState(""); // Search filter state
//     const [expandedDescriptions, setExpandedDescriptions] = useState({}); // State to track expanded descriptions

//     const handleDelete = async (title) => {
//         if (!window.confirm("Are you sure you want to delete this log?")) return;

//         try {
//             const res = await fetch("http://localhost:3000/api/deleteLog", {
//                 method: "DELETE",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({ Title: title }),
//             });

//             if (!res.ok) throw new Error("Failed to delete log");

//             alert("Log deleted successfully");
//             if (fetchLogs) fetchLogs(); // Refresh logs after deletion
//         } catch (error) {
//             console.error("Error deleting log:", error);
//             alert("Failed to delete log: " + error.message);
//         }
//     };

//     // Filter logs based on search criteria
//     const filteredLogs = log.logs.filter((entry) =>
//         entry.title.toLowerCase().includes(filter.toLowerCase()) ||
//         entry.category.toLowerCase().includes(filter.toLowerCase())
//     );

//     // Function to toggle description visibility
//     const toggleDescription = (id) => {
//         setExpandedDescriptions((prev) => ({ ...prev, [id]: !prev[id] }));
//     };

//     return (
//         <div className="w-full p-4">
//             {/* Search Input */}
//             <input
//                 type="text"
//                 placeholder="Search logs by title or category..."
//                 value={filter}
//                 onChange={(e) => setFilter(e.target.value)}
//                 className="w-full p-2 mb-4 border rounded-lg text-black"
//             />

//             {/* Logs Grid */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//                 {filteredLogs.map((entry) => (
//                     <div key={entry._id} className="border p-4 rounded-lg bg-gray-800 text-white">
//                         {/* Image */}
//                         {entry.image && (
//                             <div className="w-full h-48 flex items-center justify-center bg-gray-900 rounded">
//                                 <img
//                                     src={entry.image}
//                                     alt={entry.title}
//                                     className="w-full h-full object-contain rounded"
//                                 />
//                             </div>
//                         )}

//                         {/* Log Details */}
//                         <h3 className="text-lg font-bold mt-2">{entry.category}</h3>
//                         <h1 className="text-lg font-bold mt-2">{entry.title}</h1>
//                         <p className="text-white mt-2">
//                             {expandedDescriptions[entry._id]
//                                 ? entry.description
//                                 : entry.description.substring(0, 50) + "..."}
//                         </p>

//                         {/* Show More/Less Button */}
//                         <button
//                             className="text-purple-800 hover:text-purple-900 py-2"
//                             onClick={() => toggleDescription(entry._id)}
//                         >
//                             {expandedDescriptions[entry._id] ? "Less" : "More"}
//                         </button>

//                         <p className="text-sm text-gray-400 mt-2">Target Date: {entry.targetdate}</p>

//                         {/* Delete Button */}
//                         <button
//                             className="bg-red-600 hover:bg-red-700 text-white text-xl h-12 w-24 mt-4 rounded-lg"
//                             onClick={() => handleDelete(entry.title)}
//                         >
//                             Delete
//                         </button>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default LogCard;
