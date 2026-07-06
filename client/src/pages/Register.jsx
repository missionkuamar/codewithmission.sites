import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to login since we only use Google Auth
    navigate('/login');
  }, [navigate]);

  return null;
};

export default Register;