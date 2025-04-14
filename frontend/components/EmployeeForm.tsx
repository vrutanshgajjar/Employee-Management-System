// components/EmployeeForm.tsx
"use client"
import React, { useState } from 'react';

interface Employee {
  _id: string;
  name: string;
  email: string;
  position: string;
  department: string;
}

interface EmployeeFormProps {
  onSubmitSuccess: () => void;
  employee?: Employee;
}

const EmployeeForm: React.FC<EmployeeFormProps> = ({ onSubmitSuccess, employee }) => {
  const [name, setName] = useState(employee ? employee.name : '');
  const [email, setEmail] = useState(employee ? employee.email : '');
  const [position, setPosition] = useState(employee ? employee.position : '');
  const [department, setDepartment] = useState(employee ? employee.department : '');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = employee ? 'PUT' : 'POST';
    const url = employee ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/employees/${employee._id}` : `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/employees`;
  
    console.log(`Submitting to URL: ${url}`);
  
    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, position, department }),
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        let errorMessage;
        try {
          const errorData = JSON.parse(errorText);
          errorMessage = errorData.message;
        } catch {
          errorMessage = errorText;
        }
        throw new Error(errorMessage || 'Failed to save employee');
      }
  
      const data = await response.json();
      console.log('Response:', data);
      onSubmitSuccess();
    } catch (error:any) {
      console.error('Error:', error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg w-full bg-white p-8 rounded-lg shadow-md">
      <div className="mb-6">
        <label htmlFor="name" className="block text-gray-700 font-semibold">
          Name
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-2 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <div className="mb-6">
        <label htmlFor="email" className="block text-gray-700 font-semibold">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-2 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <div className="mb-6">
        <label htmlFor="position" className="block text-gray-700 font-semibold">
          Position
        </label>
        <input
          id="position"
          type="text"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
          className="mt-2 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <div className="mb-6">
        <label htmlFor="department" className="block text-gray-700 font-semibold">
          Department
        </label>
        <input
          id="department"
          type="text"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          className="mt-2 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <button type="submit" className="w-full bg-blue-500 text-white px-4 py-3 rounded-lg font-semibold hover:bg-blue-600 transition duration-200">
        {employee ? 'Update' : 'Create'}
      </button>
    </form>
  );
};

export default EmployeeForm;
