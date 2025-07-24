import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api_url from "../apiConfig";
import { enqueueSnackbar } from 'notistack';

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };


  const handleSubmit = async(e) => {
    e.preventDefault();
    const response = await fetch(`${api_url}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
    const data = await response.json();
    if (response.status === 200) {
      enqueueSnackbar({message: "Logged In successfully !!", variant: 'success'})
      localStorage.setItem('token', data.token); 
      navigate('/');
    }
    else {
      enqueueSnackbar({ message: data.message, variant: 'error'})
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-md formContainer flex flex-col gap-2">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        <label className="block mb-2 text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded mb-4"
        />

        <label className="block mb-2 text-sm font-medium text-gray-700">Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded mb-4"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
        >
          Login
        </button>

        <p className="mt-4 text-center text-sm text-gray-600">
          New user ?{' '}
          <span
            className="text-blue-500 cursor-pointer hover:underline"
            onClick={() => navigate('/registration')}
          >
            Register here
          </span>
        </p>
      </form>
    </div>
  );
}