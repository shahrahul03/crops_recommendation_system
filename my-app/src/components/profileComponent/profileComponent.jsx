import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserProfile = () => {
  const [profile, setProfile] = useState({
    user: {},
    bio: '',
    profileImage: '',
    contact: '',
    address: '',
  });
  const [bio, setBio] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [predictions, setPredictions] = useState([]);

  const token = localStorage.getItem('authToken');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/profile', {
          headers: {
            'Authorization': ` ${token}`,
          },
        });
        setProfile(response.data.profile);
        setBio(response.data.profile.bio || '');
      } catch (err) {
        setError(err.response?.data?.msg || 'Error fetching profile');
      }
    };

    const fetchPredictions = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/getPrediction', {
          headers: {
            'Authorization': ` ${token}`,
          },
        });
        setPredictions(response.data || []);
      } catch (err) {
        setError(err.response?.data?.msg || 'Error fetching predictions');
      }
    };

    fetchProfile();
    fetchPredictions();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('bio', bio);
    if (profileImage) formData.append('profileImage', profileImage);

    try {
      const response = await axios.put('http://localhost:5000/api/profile/update', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': ` ${token}`,
        },
      });
      setProfile(prevProfile => ({
        ...prevProfile,
        bio: response.data.profile.bio,
        profileImage: response.data.profile.profileImage,
      }));
      setSuccess('Profile updated successfully!');
      setError(null);
      setProfileImage(null);
      setIsEditing(false);
    } catch (err) {
      console.error('Error details:', err);
      setError(err.response?.data?.msg || 'Error updating profile');
      setSuccess('');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/deletePrediction`, {
        headers: {
          'Authorization': ` ${token}`,
        },
      });
      setPredictions(predictions.filter(prediction => prediction._id !== id));
      setSuccess('Prediction deleted successfully!');
    } catch (err) {
      setError(err.response?.data?.msg || 'Error deleting prediction');
    }
  };

  if (!profile.user.name) return <p className="text-gray-600">Loading...</p>;

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white shadow-lg rounded-lg flex flex-col space-y-6 md:space-y-8">
      {/* Profile Information */}
      <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6">
        <div className="flex flex-col items-center md:w-1/3 p-4 bg-gradient-to-r from-green-400 to-green-600 rounded-lg text-white">
          {profile.profileImage && (
            <img
              src={profile.profileImage}
              alt="Profile"
              className="w-32 h-32 object-cover rounded-full mb-4"
            />
          )}
          <h1 className="text-2xl font-semibold">{profile.user.name}</h1>
          <p className="text-lg mt-2">{profile.bio}</p>
          <button
            onClick={() => setIsEditing(true)}
            className="mt-4 px-6 py-2 bg-green-700 text-white font-semibold rounded-lg hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Update Profile
          </button>
        </div>

        <div className="md:w-2/3 p-4 bg-gray-100 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Information</h2>
          <p className="text-gray-700 mb-2"><strong>Email:</strong> {profile.user.email}</p>
          <p className="text-gray-700 mb-2"><strong>Contact:</strong> {profile.user.contact}</p>
          <p className="text-gray-700 mb-2"><strong>Address:</strong> {profile.user.address}</p>

          {success && <p className="text-green-600 mb-4">{success}</p>}
          {error && <p className="text-red-600 mb-4">{error}</p>}
          
          {isEditing && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <label className="block">
                <span className="text-gray-700">Bio:</span>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-lg p-2"
                  rows="4"
                />
              </label>
              <label className="block">
                <span className="text-gray-700">Profile Image:</span>
                <input
                  type="file"
                  onChange={(e) => setProfileImage(e.target.files[0])}
                  className="mt-1 block w-full border border-gray-300 rounded-lg p-2"
                />
              </label>
              <button
                type="submit"
                className="px-6 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                Update Profile
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="ml-2 px-6 py-2 bg-gray-500 text-white font-semibold rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                Cancel
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Predictions Table */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Your Predictions</h2>
        {Array.isArray(predictions) && predictions.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg shadow-md">
              <thead className="bg-green-200 text-gray-700">
                <tr>
                  <th className="py-3 px-4 text-left">#</th>
                  <th className="py-3 px-4 text-left">Nitrogen (N)</th>
                  <th className="py-3 px-4 text-left">Phosphorus (P)</th>
                  <th className="py-3 px-4 text-left">Potassium (K)</th>
                  <th className="py-3 px-4 text-left">Temperature (°C)</th>
                  <th className="py-3 px-4 text-left">Humidity (%)</th>
                  <th className="py-3 px-4 text-left">pH</th>
                  <th className="py-3 px-4 text-left">Rainfall (mm)</th>
                  <th className="py-3 px-4 text-left">Prediction</th>
                  <th className="py-3 px-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {predictions.map((prediction, index) => (
                  <tr key={prediction._id || index} className="text-gray-700 hover:bg-gray-100">
                    <td className="py-3 px-4">{index + 1}</td>
                    <td className="py-3 px-4">{prediction.N ?? 'N/A'}</td>
                    <td className="py-3 px-4">{prediction.P ?? 'N/A'}</td>
                    <td className="py-3 px-4">{prediction.K ?? 'N/A'}</td>
                    <td className="py-3 px-4">{prediction.temperature ?? 'N/A'}</td>
                    <td className="py-3 px-4">{prediction.humidity ?? 'N/A'}</td>
                    <td className="py-3 px-4">{prediction.ph ?? 'N/A'}</td>
                    <td className="py-3 px-4">{prediction.rainfall ?? 'N/A'}</td>
                    <td className="py-3 px-4">{prediction.prediction ?? 'N/A'}</td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => handleDelete(prediction._id)}
                        className="text-red-600 hover:text-red-800 focus:outline-none"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-600">No predictions found.</p>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
