import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  try {
    switch (method) {
      case 'GET':
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/employees`);
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const employees = await response.json();
        res.status(200).json(employees);
        break;

      case 'POST':
        const createResponse = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/employees`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(req.body)
        });
        if (!createResponse.ok) {
          throw new Error(`Error: ${createResponse.status} ${createResponse.statusText}`);
        }
        const createdEmployee = await createResponse.json();
        res.status(201).json(createdEmployee);
        break;

      default:
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error:any) {
    console.error('API Error:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export default handler;

