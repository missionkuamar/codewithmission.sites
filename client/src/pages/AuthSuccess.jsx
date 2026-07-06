import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setAuth } from '../redux/slices/authSlice';
import toast from 'react-hot-toast';

const AuthSuccess = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

   // console.log('AuthSuccess - Token received:', token ? 'Yes' : 'No');

    if (token) {
      // Save token
      localStorage.setItem('token', token);
      
      // Get user data
      fetch('http://localhost:5000/api/auth/me', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to fetch user data');
        }
        return res.json();
      })
      .then(userData => {
      //  console.log('User data:', userData);
        if (userData._id) {
          dispatch(setAuth({ user: userData, token }));
          toast.success('Login successful!');
          navigate('/');
        } else {
          toast.error('Failed to get user data');
          navigate('/login');
        }
      })
      .catch(error => {
        //console.error('Error:', error);
        toast.error('Login failed: ' + error.message);
        navigate('/login');
      });
    } else {
      toast.error('No token found');
      navigate('/login');
    }
  }, [dispatch, navigate]);

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Processing login...</p>
      </div>
    </div>
  );
};

export default AuthSuccess;