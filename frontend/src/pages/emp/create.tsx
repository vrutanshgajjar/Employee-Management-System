
import React from 'react';
import { useRouter } from 'next/router';
import EmployeeForm from '../../../components/EmployeeForm';

const CreateEmployeePage: React.FC = () => {
  const router = useRouter();

  const handleFormSubmit = () => {
    console.log('Form submitted successfully');
    router.push('/'); 
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-lg w-full bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-6 text-center">Add New Employee</h1>
        <EmployeeForm onSubmitSuccess={handleFormSubmit} />
      </div>
    </div>
  );
};

export default CreateEmployeePage;
