import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Task from './Task';

const ManagerDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: '', description: '' });

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

  const handleChange = (e) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  };

  const handleAddTask = async () => {
    const token = localStorage.getItem('token');
    const response = await axios.post(
      'http://localhost:5000/api/tasks',
      { ...newTask, assignedTo: 'employee_id' }, // Replace 'employee_id' with actual employee ID
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setTasks([...tasks, response.data]);
    setNewTask({ title: '', description: '' });
  };

  return (
    <div>
      <h2>Manager Dashboard</h2>
      <div>
        <h3>Create New Task</h3>
        <input
          type="text"
          name="title"
          placeholder="Task Title"
          value={newTask.title}
          onChange={handleChange}
        />
        <input
          type="text"
          name="description"
          placeholder="Task Description"
          value={newTask.description}
          onChange={handleChange}
        />
        <button onClick={handleAddTask}>Add Task</button>
      </div>
      <div>
        <h3>Assigned Tasks</h3>
        {tasks.map((task) => (
          <Task key={task._id} task={task} />
        ))}
      </div>
    </div>
  );
};

export default ManagerDashboard;
