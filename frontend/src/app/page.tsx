"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

interface Employee {
  _id: string;
  name: string;
  email: string;
  position: string;
  department: string;
}

const HomePage: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch("/api/employee");

        // Check if the response is not a 304 Not Modified
        if (response.status !== 304) {
          if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
          }
          const data = await response.json();
          setEmployees(data);
        }
        // Handle 304 gracefully (no need to setEmployees again)
      } catch (error: any) {
        setError(error.message);
      }
    };

    fetchEmployees();
  }, []);

  const deleteThisEmployee = async (empId: string) => {
    try {
      const response = await fetch(`http://localhost:5000/api/employees/${empId}`, {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      setEmployees((prevEmployees) =>
        prevEmployees.filter((employee) => employee._id !== empId)
      );
    } catch (error:any) {
      setError(error.message);
    }
  };
  

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold my-4">Employee Records</h1>
      <Link href="/emp/create">
        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          Add Employee
        </button>
      </Link>
      {error && <div className="text-red-500 my-4">{error}</div>}
      <table className="min-w-full divide-y divide-gray-200 mt-4">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Email
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Position
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Department
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {employees.map((employee: any) => (
            <tr key={employee._id}>
              <td className="px-6 py-4 whitespace-nowrap text-black">
                {employee.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-black">
                {employee.email}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-black">
                {employee.position}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-black">
                {employee.department}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-black">
                <Link href={`/emp/${employee._id}`}>
                  <span className="text-blue-600 hover:text-blue-900 cursor-pointer">
                    Edit
                  </span>
                </Link>

                <button
                  onClick={() => deleteThisEmployee(employee._id)}
                  className="ml-4 text-red-600 hover:text-red-900"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HomePage;
