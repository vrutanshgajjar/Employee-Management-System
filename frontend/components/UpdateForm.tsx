"use client"
import React, { useState, useEffect } from 'react';

interface Employee {
  _id: string;
  name: string;
  email: string;
  position: string;
  department: string;
}

interface UpdateFormProps {
  onSubmitSuccess: () => void;
  employee: Employee;
}

const UpdateForm: React.FC<UpdateFormProps> = ({ onSubmitSuccess, employee }) => {
  const [name, setName] = useState(employee.name);
  const [email, setEmail] = useState(employee.email);
  const [position, setPosition] = useState(employee.position);
  const [department, setDepartment] = useState(employee.department);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value);
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
  const handlePositionChange = (e: React.ChangeEvent<HTMLInputElement>) => setPosition(e.target.value);
  const handleDepartmentChange = (e: React.ChangeEvent<HTMLInputElement>) => setDepartment(e.target.value);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/employees/${employee._id}`;

    try {
      const response = await fetch(url, {
        method: 'PUT',
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
        throw new Error(errorMessage || 'Failed to update employee');
      }

      const data = await response.json();
      console.log('Response:', data);
      onSubmitSuccess();
    } catch (error:any) {
      console.error('Error:', error.message);
    }
  };

  useEffect(() => {
    setName(employee.name);
    setEmail(employee.email);
    setPosition(employee.position);
    setDepartment(employee.department);
  }, [employee]);

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Name</label>
        <input type="text" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={name} onChange={handleNameChange} />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
        <input type="email" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={email} onChange={handleEmailChange} />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Position</label>
        <input type="text" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={position} onChange={handlePositionChange} />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Department</label>
        <input type="text" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={department} onChange={handleDepartmentChange} />
      </div>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Update</button>
    </form>
  );
};

export default UpdateForm;
