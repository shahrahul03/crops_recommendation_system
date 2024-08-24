import React, { useState } from 'react';
import { FaGoogle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { login } from "../../features/auth/authSlice";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { validateRegistrationForm,validateLoginForm,validateForgotPasswordForm } from './validation';



const Login = () => {
 
  const [isLogin, setIsLogin] = useState(true);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [contact, setContact] = useState('');
  const [errors, setErrors] = useState({});
 

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogin = async (e) => {
    e.preventDefault();
    const validationErrors = validateLoginForm(loginEmail, loginPassword);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: loginEmail, password: loginPassword }),
      });

      const data = await response.json();

      if (response.ok) {
        
        const { token, user } = data;
        dispatch(login({ token, role: user.role }));
        localStorage.setItem('authToken', token);
        localStorage.setItem("user", user.role);
        

       
        toast.success('User logged in successfully', { autoClose: 1000 });
        setTimeout(() => {
          navigate('/homepage');
        }, 1000);
        
      

      } else {
        // console.error('Error logging in:', data.message);
        setErrors({ loginEmail: data.message });
        // toast.error(data.message, { autoClose: 3000 });
      }
    } catch (error) {
      // console.error('Server error:', error);
      setErrors({ loginEmail: 'Server error' });
      // toast.error('Server error', { autoClose: 3000 });
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const validationErrors = validateRegistrationForm(name, address, contact, registerEmail, registerPassword);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          address,
          contact,
          email: registerEmail,
          password: registerPassword,
        }),
      });

      const data = await response.json();
      if (response.status === 201) {
        toast.success('User registered successfully', { autoClose: 3000 });
        setTimeout(() => {
          setIsLogin(true);
        }, 3000);
      } else {
        console.error('Error registering user:', data.message);
        setErrors({ registerEmail: data.message });
        toast.error(data.message, { autoClose: 3000 });
      }
    } catch (error) {
      console.error('Server error:', error);
      setErrors({ registerEmail: 'Server error' });
      toast.error('Server error', { autoClose: 3000 });
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    const validationErrors = validateForgotPasswordForm(loginEmail);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: loginEmail }),
      });

      const data = await response.json();
      if (response.status === 200) {
        toast.success('Password reset email sent', { autoClose: 3000 });
        setTimeout(() => {
          setIsForgotPassword(false);
        }, 3000);
      } else {
        console.error('Error sending reset email:', data.message);
        setErrors({ loginEmail: data.message });
        toast.error(data.message, { autoClose: 3000 });
      }
    } catch (error) {
      console.error('Server error:', error);
      setErrors({ loginEmail: 'Server error' });
      toast.error('Server error', { autoClose: 3000 });
    }
  };

  // Handle Google login
 

  const handleGoogleLogin = async () => {
    
    
    // Redirect to Google OAuth
    window.location.href = 'http://localhost:5000/auth/google';

    
    
   
   
  };


  

 






  

  return (
    <div className="min-h-screen flex w-full items-center justify-center bg-gradient-to-r from-blue-50 to-blue-100">
      <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-4xl flex flex-col md:flex-row">
        <div className="md:w-1/2 p-6 bg-green-50 rounded-lg shadow-lg flex flex-col items-center justify-center">
          <h2 className="text-2xl font-bold text-green-600 mb-4">Crop Recommendation System</h2>
          <p className="text-gray-700 mb-4 text-center">
            Explore our platform to get tailored crop recommendations based on your input. We are here to assist you in making informed decisions.
          </p>
          <img
            src="https://images.unsplash.com/photo-1501004318641-b39e6451bec6?q=80&w=1973&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Crop Recommendation"
            className="w-full rounded-lg shadow-md"
          />
        </div>

        <div className="w-full md:w-1/2 p-6">
          <h2 className="text-3xl font-bold mb-6 text-center text-green-600">
            {isLogin ? 'Sign In' : isForgotPassword ? 'Forgot Password' : 'Register'}
          </h2>

          {isForgotPassword ? (
            <form onSubmit={handleForgotPassword} className="space-y-4">
              <div>
                <input
                  type="email"
                  placeholder="E-mail"
                  className={`w-full p-3 border rounded-lg bg-gray-100 focus:ring-2 focus:ring-green-500 focus:outline-none ${errors.loginEmail ? 'border-red-500' : ''}`}
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                />
                {errors.loginEmail && <span className="text-red-500 text-sm">{errors.loginEmail}</span>}
              </div>
              <button
                type="submit"
                className="w-full p-3 bg-gradient-to-r from-green-500 to-green-700 text-white rounded-lg transform transition hover:scale-105"
              >
                Send Reset Link
              </button>
              <div className="text-center mt-4">
                <button
                  type="button"
                  onClick={() => setIsForgotPassword(false)}
                  className="text-green-500 hover:underline"
                >
                  Back to Sign In
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={isLogin ? handleLogin : handleRegister} className="space-y-4">
              {!isLogin && (
                <>
                  <div>
                    <input
                      type="text"
                      placeholder="Name"
                      className={`w-full p-3 border rounded-lg bg-gray-100 focus:ring-2 focus:ring-green-500 focus:outline-none ${errors.name ? 'border-red-500' : ''}`}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="Address"
                      className={`w-full p-3 border rounded-lg bg-gray-100 focus:ring-2 focus:ring-green-500 focus:outline-none ${errors.address ? 'border-red-500' : ''}`}
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                    {errors.address && <span className="text-red-500 text-sm">{errors.address}</span>}
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="Contact"
                      className={`w-full p-3 border rounded-lg bg-gray-100 focus:ring-2 focus:ring-green-500 focus:outline-none ${errors.contact ? 'border-red-500' : ''}`}
                      value={contact}
                      onChange={(e) => setContact(e.target.value)}
                    />
                    {errors.contact && <span className="text-red-500 text-sm">{errors.contact}</span>}
                  </div>
                </>
              )}
              <div>
                <input
                  type="email"
                  placeholder="E-mail"
                  className={`w-full p-3 border rounded-lg bg-gray-100 focus:ring-2 focus:ring-green-500 focus:outline-none ${errors.loginEmail || errors.registerEmail ? 'border-red-500' : ''}`}
                  value={isLogin ? loginEmail : registerEmail}
                  onChange={(e) => (isLogin ? setLoginEmail(e.target.value) : setRegisterEmail(e.target.value))}
                />
                {(errors.loginEmail || errors.registerEmail) && (
                  <span className="text-red-500 text-sm">{isLogin ? errors.loginEmail : errors.registerEmail}</span>
                )}
              </div>
              <div>
                <input
                  type="password"
                  placeholder="Password"
                  className={`w-full p-3 border rounded-lg bg-gray-100 focus:ring-2 focus:ring-green-500 focus:outline-none ${errors.loginPassword || errors.registerPassword ? 'border-red-500' : ''}`}
                  value={isLogin ? loginPassword : registerPassword}
                  onChange={(e) => (isLogin ? setLoginPassword(e.target.value) : setRegisterPassword(e.target.value))}
                />
                {(errors.loginPassword || errors.registerPassword) && (
                  <span className="text-red-500 text-sm">{isLogin ? errors.loginPassword : errors.registerPassword}</span>
                )}
              </div>
              <button
                type="submit"
                className="w-full p-3 bg-gradient-to-r from-green-500 to-green-700 text-white rounded-lg transform transition hover:scale-105"
              >
                {isLogin ? 'Sign In' : 'Register'}
              </button>
              <div className="text-center mt-4">
                <button
                  type="button"
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-green-500 hover:underline"
                >
                  {isLogin ? 'Create an account' : 'Already have an account? Sign In'}
                </button>
                {isLogin && (
                  <button
                    type="button"
                    onClick={() => setIsForgotPassword(true)}
                    className="ml-4 text-green-500 hover:underline"
                  >
                    Forgot password?
                  </button>
                )}
              </div>
            </form>
          )}

          <div className="flex items-center mt-4">
            <hr className="flex-grow border-gray-300" />
            <span className="mx-4 text-gray-500">OR</span>
            <hr className="flex-grow border-gray-300" />
          </div>
          <button
            onClick={handleGoogleLogin}
            className="w-full p-3 mt-4 bg-red-500 text-white rounded-lg flex items-center justify-center transform transition hover:scale-105"
           
           
            
            
          >
            <FaGoogle className="mr-2" />
            Sign In with Google
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;