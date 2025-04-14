import React, { useState, useEffect } from 'react';
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
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const fetchEmployee = async () => {
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/employees/${id}`);
          if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
          }
          const data = await response.json();
          setEmployee(data);
        } catch (error:any) {
          setError(error.message);
          console.error('Error fetching employee:', error.message);
        } finally {
          setLoading(false);
        }
      };

      fetchEmployee();
    }
  }, [id]);

  const handleFormSubmit = () => {
    console.log('Form submitted successfully');
    router.push('/'); 
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
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold my-4">Update Employee</h1>
      <UpdateForm onSubmitSuccess={handleFormSubmit} employee={employee} />
    </div>
  );
};

export default UpdateEmployeePage;
