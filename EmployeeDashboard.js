import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Task from './Task';

const EmployeeDashboard = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/tasks', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(response.data);
    };
    fetchTasks();
  }, []);

  const handleConfirmTask = async (id) => {
    const token = localStorage.getItem('token');
    const response = await axios.patch(
      `http://localhost:5000/api/tasks/${id}/confirm`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    const updatedTasks = tasks.map((task) => (task._id === id ? response.data : task));
    setTasks(updatedTasks);
  };

  return (
    <div>
      <h2>Employee Dashboard</h2>
      <div>
        {tasks.map((task) => (
          <Task key={task._id} task={task} onConfirm={handleConfirmTask} />
        ))}
      </div>
    </div>
  );
};

export default EmployeeDashboard;
