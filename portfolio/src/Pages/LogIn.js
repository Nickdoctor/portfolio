import React, { useState } from 'react';
import '../Styles/LogIn.css';
//import axios from '../config/axiosConfig';
import { useNavigate } from 'react-router-dom';
import { Box, Button, TextField, Typography, IconButton, InputAdornment, Modal, CircularProgress } from '@mui/material';
import FaceBookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import EmailIcon from '@mui/icons-material/Email';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import supabase from '../supabaseClient.js';

const LogInPage = () => {

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        showPassword: false,
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const handleShowPasswordClick = () => {
        setFormData(prev => ({ ...prev, showPassword: !prev.showPassword }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };
      const handleGoogleSignIn = async () => {
        try {
          const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
          });
      
          if (error) {
            console.error('Google Sign-In Error:', error.message);
            return;
          }
      
          // Optional: Redirect user to home or dashboard
          console.log('Google sign-in successful:', data);
        } catch (error) {
          console.error('Unexpected error during Google sign-in:', error);
        }
      };
      const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        
        try {
            // Authenticate user
            const { user, error } = await supabase.auth.signInWithPassword({
                email: formData.email,
                password: formData.password,
            });
      
            if (error) throw error; // Handle error if sign-in fails
      
            // Check if formData.email is in the admin table
            
            const { data: adminData, error: adminError } = await supabase
                .from('admin')
                .select('email')
                .eq('email'.toLowerCase(), formData.email.toLowerCase());
                console.log('Admin Data:', adminData); // Debug log for admin data
                console.log('Form Data Email:', formData.email); // Debug log for formData.email
      
            if (adminError) {
                console.error('Error checking admin status:', adminError.message);
                setError('Unable to verify admin status.');
            } else if (adminData && adminData.length > 0) {
                // Redirect to admin page if the email is found in the admin table
                console.log('Admin found:', adminData);
                navigate('/ContactMe');
            } else {
                // Redirect to user view page if email is not found in admin table
                const { data: { user }, error } = await supabase.auth.getUser();
                console.log('Not an admin, redirecting to home page.');
                console.log('First Name:', user.user_metadata.FirstName);
                console.log('Last Name:', user.user_metadata.LastName);
                navigate('/');
            }
                
        } catch (error) {
            console.error('Login failed:', error); // Log the complete error object
            alert('Invalid Log in, try again.')
            setError('Login failed. Please check your credentials.'); // Generic error message
        } finally {
            console.log('Log in process over');
            setLoading(false);
        }
      };

    return (
        <body>
            <div class="container">
                <div class="row">
                    <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
                        <div class="card border-0 shadow rounded-3 my-5 rounded shadow hover-effect">
                            <div class="card-body p-4 p-sm-5">
                                <h5 class="card-title text-center mb-5 fw-light fs-5 ">Sign In</h5>
                                <form onSubmit={handleSubmit}>
                                    <TextField fullWidth name="email" label="Email" type="email" variant="outlined" value={formData.email} onChange={handleChange} sx={{ mt: 1, mb: 1 }} required />
                                    <div class="form-floating mb-3">
                                        <TextField fullWidth name="password" label="Password" type={formData.showPassword ? "text" : "password"} variant="outlined" value={formData.password} onChange={handleChange}
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <IconButton onClick={handleShowPasswordClick}>
                                                            {formData.showPassword ? <Visibility /> : <VisibilityOff />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                )
                                            }}
                                            sx={{ mt: 1 }}
                                            required
                                        />
                                    </div>
                                    <div class="d-grid">
                                        <Button fullWidth type="submit" variant="contained" color="primary" sx={{ mt: 3 }}>
                                            Sign In
                                        </Button>
                                    </div>
                                    <hr class="my-4" />
                                    <div class="d-grid mb-2">
                                        <button class="btn btn-google btn-login text-uppercase fw-bold" onClick= {handleGoogleSignIn}>
                                            <i class="fab fa-google me-2"></i> Sign in with Google
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </body>
    )
};
export default LogInPage;