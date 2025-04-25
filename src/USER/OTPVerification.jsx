import { useState } from 'react';
import axios from 'axios';

function OTPVerification({ email, onVerified }) {
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://comptron-server-2.onrender.com/api/verify-otp', { email, otp });
      setMessage(response.data.message);
      if (response.data.message.includes('successfully')) {
        onVerified();
      }
    } catch (error) {
      setMessage(error.response?.data.message || 'OTP verification failed');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Verify OTP</h2>
      <p className="mb-4 text-gray-600">Enter the OTP sent to {email}</p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
            OTP:
          </label>
          <input
            type="text"
            id="otp"
            name="otp"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors duration-200"
        >
          Verify OTP
        </button>
      </form>
      {message && (
        <p className={`mt-4 text-center ${message.includes('successfully') ? 'text-green-600' : 'text-red-600'}`}>
          {message}
        </p>
      )}
    </div>
  );
}

export default OTPVerification;