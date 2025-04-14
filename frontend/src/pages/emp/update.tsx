"use client"
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import UpdateForm from '../../../components/UpdateForm';

interface Employee {
  _id: string;
  name: string;
  email: string;
  position: string;
  department: string;
}

const UpdateEmployeePage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query; 
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      const fetchEmployee = async () => {
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/employees/${id}`);
          if (!response.ok) {
            throw new Error('Failed to fetch employee data');
          }
          const data = await response.json();
          setEmployee(data);
        } catch (err:any) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };

      fetchEmployee();
    }
  }, [id]);

  const handleFormSubmit = () => {
    console.log('Form submitted successfully');
    router.push('/'); // Redirect to the home page
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!employee) {
    return <div>Employee not found</div>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-lg w-full bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-6 text-center">Update Employee</h1>
        <UpdateForm onSubmitSuccess={handleFormSubmit} employee={employee} />
      </div>
    </div>
  );
};

export default UpdateEmployeePage;
