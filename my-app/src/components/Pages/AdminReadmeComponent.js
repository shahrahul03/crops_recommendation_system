import React, { useEffect, useState } from "react";
import axios from "axios";

function AdminReadmeCRUD() {
  const [entries, setEntries] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentEntry, setCurrentEntry] = useState({
    id: null,
    title: "",
    description: "",
    image: null,
  });

  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api");
      setEntries(response.data);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setCurrentEntry({
      ...currentEntry,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", currentEntry.title);
    formData.append("description", currentEntry.description);
    if (currentEntry.image) {
      formData.append("eventImage", currentEntry.image);
    }

    try {
      if (isEditing) {
        // Update existing entry
        await axios.put(
          `http://localhost:5000/api/${currentEntry.id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        alert("Entry updated successfully!");
      } else {
        // Create new entry
        await axios.post("http://localhost:5000/api", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        alert("Entry created successfully!");
      }
      setIsEditing(false);
      setCurrentEntry({ id: null, title: "", description: "", image: null });
      fetchEntries(); // Refresh entries list
    } catch (error) {
      console.error("Error saving entry", error);
    }
  };

  const handleEdit = (entry) => {
    setIsEditing(true);
    setCurrentEntry({
      id: entry._id,
      title: entry.title,
      description: entry.description,
      image: null,
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this entry?")) {
      try {
        await axios.delete(`http://localhost:5000/api/${id}`);
        fetchEntries(); // Refresh the list after deletion
      } catch (error) {
        console.error("Error deleting entry", error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-md shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-700">
          {isEditing ? "Edit Entry" : "Create New Entry"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-600">Title</label>
            <input
              type="text"
              name="title"
              value={currentEntry.title}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              required
            />
          </div>
          <div>
            <label className="block text-gray-600">Description</label>
            <textarea
              name="description"
              value={currentEntry.description}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              required
            ></textarea>
          </div>
          <div>
            <label className="block text-gray-600">Image</label>
            <input
              type="file"
              name="image"
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 px-4 rounded-md shadow hover:bg-green-600"
          >
            {isEditing ? "Update Entry" : "Create Entry"}
          </button>
        </form>
      </div>

      <div className="max-w-4xl mx-auto mt-10 bg-white p-6 rounded-md shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-700">
          Admin Readme Entries
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="py-3 px-4 text-left border-b">Title</th>
                <th className="py-3 px-4 text-left border-b">Description</th>
                <th className="py-3 px-4 text-left border-b">Image</th>
                <th className="py-3 px-4 text-left border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry) => (
                <tr key={entry._id}>
                  <td className="py-3 px-4 border-b">{entry.title}</td>
                  <td className="py-3 px-4 border-b">{entry.description}</td>
                  <td className="py-3 px-4 border-b">
                    {entry.eventImage && (
                      <img
                        src={entry.eventImage}
                        alt={entry.title}
                        className="h-16 w-16 object-cover rounded"
                      />
                    )}
                  </td>
                  <td className="py-3 px-4 border-b">
                    <button
                      onClick={() => handleEdit(entry)}
                      className="text-blue-500 hover:text-blue-700 mr-4"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(entry._id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminReadmeCRUD;
