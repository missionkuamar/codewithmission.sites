import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import PostCard from '../components/PostCard';
import useAuthStore from '../store/authStore';
import toast from 'react-hot-toast';

const Profile = () => {
  const { id } = useParams();
  const { user: currentUser } = useAuthStore();
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [stats, setStats] = useState(null);
  const [activeTab, setActiveTab] = useState('posts');

  useEffect(() => {
    fetchProfile();
  }, [id]);

  const fetchProfile = async () => {
    try {
      const response = await axios.get(`/api/users/${id}`);
      setProfile(response.data.user);
      setPosts(response.data.posts);
      setStats(response.data.stats);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const handleFollow = async () => {
    try {
      await axios.post(`/api/users/${id}/follow`);
      fetchProfile();
      toast.success('Successfully updated follow status');
    } catch (error) {
      console.error('Error following user:', error);
    }
  };

  if (!profile) return <div className="text-center py-8">Loading...</div>;

  const isOwnProfile = currentUser?._id === id;
  const isFollowing = currentUser?.following?.includes(id);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Profile Header */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <img
            src={profile.profilePicture || 'https://via.placeholder.com/150'}
            alt={profile.username}
            className="w-32 h-32 rounded-full object-cover"
          />
          
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-2xl font-bold">{profile.username}</h2>
            <p className="text-gray-600 mt-2">{profile.bio || 'No bio yet'}</p>
            
            <div className="flex justify-center md:justify-start gap-6 mt-4">
              <div>
                <span className="font-bold">{stats?.totalPosts || 0}</span>
                <span className="text-gray-600 ml-1">Posts</span>
              </div>
              <div>
                <span className="font-bold">{profile.followers?.length || 0}</span>
                <span className="text-gray-600 ml-1">Followers</span>
              </div>
              <div>
                <span className="font-bold">{profile.following?.length || 0}</span>
                <span className="text-gray-600 ml-1">Following</span>
              </div>
            </div>
          </div>
          
          {!isOwnProfile && (
            <button
              onClick={handleFollow}
              className={`px-6 py-2 rounded-lg transition ${
                isFollowing
                  ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  : 'bg-purple-600 text-white hover:bg-purple-700'
              }`}
            >
              {isFollowing ? 'Unfollow' : 'Follow'}
            </button>
          )}
        </div>
      </div>
      
      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <div className="flex space-x-8">
          <button
            onClick={() => setActiveTab('posts')}
            className={`pb-2 ${
              activeTab === 'posts'
                ? 'border-b-2 border-purple-600 text-purple-600'
                : 'text-gray-500'
            }`}
          >
            Posts
          </button>
          <button
            onClick={() => setActiveTab('saved')}
            className={`pb-2 ${
              activeTab === 'saved'
                ? 'border-b-2 border-purple-600 text-purple-600'
                : 'text-gray-500'
            }`}
          >
            Saved
          </button>
        </div>
      </div>
      
      {/* Posts Grid */}
      <div className="space-y-6">
        {posts.map(post => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Profile;