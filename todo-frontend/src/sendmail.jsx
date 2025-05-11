import React, { useState } from 'react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
  });

  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Sending...');

    try {
      const res = await fetch('http://localhost:3000/sending', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await res.json();
      setStatus(result.message || 'Message sent!');
      
      // ✅ Fix: reset only the actual fields
      setFormData({ name: '', email: '', phone: '', date: '' });

    } catch (error) {
      console.error(error);
      setStatus('Failed to send message.');
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-8 rounded-2xl shadow-lg">
      <h2 className="text-3xl font-semibold text-center text-blue-700 mb-6">Contact Medicure</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your Name"
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Your Email"
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Phone Number"
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
        >
          Send Message
        </button>
      </form>
data:image/png;base64,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
      {status && (
        <p className="mt-4 text-center text-sm text-gray-700">
          {status}
        </p>
      )}
    </div>
  );
};

export default ContactForm;
