import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api_url from "../apiConfig"
import { enqueueSnackbar } from 'notistack';

export default function Registration() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'student',
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };


  const handleSubmit = async(e) => {
    e.preventDefault();
    const response = await fetch(`${api_url}/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    })
    const data = await response.json();
    if (response.status === 201) {
      enqueueSnackbar({message: "Registered successfully !!", variant: 'success'})
      navigate('/login');
    }
    else {
        enqueueSnackbar({message: data.message, variant: 'error'})
        console.error("Registration error:", data);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-md formContainer flex flex-col gap-2">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

        <label className="block mb-2 text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded mb-4"
        />

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

        <div className="mb-4">
          <span className="block mb-2 text-sm font-medium text-gray-700">Role</span>
          <label className="inline-flex items-center mx-5 radioButton">
            <input
              type="radio"
              name="role"
              value="student"
              checked={formData.role === 'student'}
              onChange={handleChange}
              className="mr-2"
            />
            Student
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="role"
              value="instructor"
              checked={formData.role === 'instructor'}
              onChange={handleChange}
              className="mr-2 cursor-pointer"
            />
            Instructor
          </label>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
        >
          Register
        </button>

        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <span
            className="text-blue-500 cursor-pointer hover:underline"
            onClick={() => navigate('/login')}
          >
            Login here
          </span>
        </p>
      </form>
    </div>
  );
}