import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import TaskCard from '../components/TaskCard';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const fetchTasks = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/tasks', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTasks(res.data.data);
    } catch (err) {
      console.error('Failed fetching tasks database resource');
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to drop this task?')) {
      try {
        await axios.delete(`http://localhost:5000/api/tasks/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        fetchTasks();
      } catch (err) {
        alert('Action unauthorized or error caught');
      }
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '2rem auto', padding: '0 1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Task Control Center Dashboard</h2>
        <button onClick={() => navigate('/task/new')} style={{ padding: '0.6rem 1.2rem', background: '#98c379', color: 'white', border: 'none', cursor: 'pointer' }}>+ Add Task</button>
      </div>
      <div style={{ marginTop: '1rem' }}>
        {tasks.length === 0 ? <p>No active workspace records matched.</p> : (
          tasks.map(task => (
            <TaskCard key={task._id} task={task} onDelete={handleDelete} onEdit={(t) => navigate(`/task/edit/${t._id}`, { state: { task: t } })} />
          ))
        )}
      </div>
    </div>
  );
};
export default Dashboard;
