"use client"
import React, { useEffect, useState } from 'react';

const LandingPage: React.FC = () => {

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  const [users, setUsers] = useState([]);
  const [task, setTask] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      const response = await fetch('http://40.82.152.235:8000/api/users');
      const data = await response.json();
      setUsers(data);
    }
    async function fetchTask() {
      const response = await fetch('http://40.82.152.235:8000/api/tasks');
      const data = await response.json();
      setTask(data);
    }

    fetchUsers();
    fetchTask();
  }, []);

  
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      setIsAuthenticated(true);
    } else {
      window.location.href = '/';
    }
  }, []);

  if (!isAuthenticated) {
    return <div>Unauthorized</div>;
  }

  return (
    
    <div className="flex flex-col items-center mt-10 pt-10">
      <h1 className="text-4xl font-bold mb-6 text-black">Dashboard Orangtua</h1>
      <div className="flex space-x-4 pt-4">
        <button
          type="button"
          onClick={handleLogout}
          className="bg-red-200 text-black shadow-2xl border border-black p-2 rounded-2xl mb-4 w-full"
        >
          Logout
        </button>
      </div>

      <div className="mt-8 w-5/6 pt-4">
        {/* Konten untuk Manajemen Edutech */}
        <h1 className="text-4xl text-center font-bold my-10 text-black">Teacher Role Info</h1>
        <table className="w-[100%] text-start table-fixed border-separate border-spacing-4 border border-slate-500 bg-white rounded-xl">
          <thead className='border-separate bg-slate-300'>
            <tr>
              <th>Email</th>
              <th>Username</th>
              <th>Role</th>
            </tr>
          </thead>
        {users.map((user) => (
                                <>
                                <tr className='border-separate'>
                                  <td key={user.id}>{user.email}</td>
                                  <td>{user.username}</td>
                                  <td>{user.role}</td>
                                </tr>
                                </>
                            ))
                        }
                        
          </table>

          <h1 className="text-4xl text-center font-bold my-10 text-black">Task Detail</h1>

          <table className="w-[100%] text-start table-collapse border-separate border-spacing-4 border border-slate-500 bg-white rounded-xl mb-20">
          <thead className='border-separate bg-slate-300'>
            <tr>
              <th>title</th>
              <th>description</th>
              <th>deadline</th>
              <th>level</th>
              <th>category</th>
              <th>status</th>
            </tr>
          </thead>
        {task.map((task) => (
                                <>
                                <tr className='border-separate '>
                                  <td key={task.id}>{task.title}</td>
                                  <td>{task.description}</td>
                                  <td>{task.deadline}</td>
                                  <td>{task.level}</td>
                                  <td>{task.category}</td>
                                  <td>{task.status}</td>
                                </tr>
                                </>
                            ))
                        }
                        
          </table>
      </div>
    </div>
  );
};

export default LandingPage;