import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const TaskForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('Pending');
  const [priority, setPriority] = useState('Medium');
  
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();

  useEffect(() => {
    if (id && location.state?.task) {
      const { task } = location.state;
      setTitle(task.title);
      setDescription(task.description);
      setStatus(task.status);
      setPriority(task.priority);
    }
  }, [id, location.state]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const taskData = { title, description, status, priority };
    const config = { headers: { Authorization: `Bearer ${token}` } };

    try {
      if (id) {
        await axios.put(`http://localhost:5000/api/tasks/${id}`, taskData, config);
      } else {
        await axios.post('http://localhost:5000/api/tasks', taskData, config);
      }
      navigate('/');
    } catch (err) {
      alert(err.response?.data?.error || 'Operational failure.');
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: '3rem auto', padding: '2rem', border: '1px solid #ddd', borderRadius: '8px', background: '#fff' }}>
      <h2>{id ? 'Edit System Record' : 'Configure New Enterprise Task'}</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          <label>Task Document Title</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }} />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>Operational Description</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} required rows="4" style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }} />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>Status Pipeline Stage</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)} style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }}>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>Priority Level</label>
          <select value={priority} onChange={(e) => setPriority(e.target.value)} style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }}>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
        <button type="submit" style={{ width: '100%', padding: '0.7rem', background: '#98c379', border: 'none', color: 'white', fontSize: '1rem', cursor: 'pointer' }}>
          {id ? 'Update Operational Data' : 'Deploy Task Object'}
        </button>
      </form>
    </div>
  );
};
export default TaskForm;
