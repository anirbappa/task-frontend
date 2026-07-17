import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import TaskCard from '../components/TaskCard';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [statusFilter, setStatusFilter] = useState('All');
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  const fetchTasks = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/tasks`, {
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
        await axios.delete(`${API_BASE_URL}/api/tasks/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        fetchTasks();
      } catch (err) {
        alert('Action unauthorized or error caught');
      }
    }
  };

  const totalTasks = tasks.length;
  const pendingTasks = tasks.filter((task) => task.status === 'Pending').length;
  const inProgressTasks = tasks.filter((task) => task.status === 'In Progress').length;
  const completedTasks = tasks.filter((task) => task.status === 'Completed').length;

  const filteredTasks = statusFilter === 'All'
    ? tasks
    : tasks.filter((task) => task.status === statusFilter);

  const statusButtons = ['All', 'Pending', 'In Progress', 'Completed'];

  return (
    <div className="container py-4">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4 gap-3">
        <div>
          <h2 className="mb-1">Task Control Center Dashboard</h2>
          <p className="text-muted mb-0">Monitor progress, review metrics, and keep your workspace organized.</p>
        </div>
        <button
          type="button"
          className="btn btn-success btn-sm"
          onClick={() => navigate('/task/new')}
        >
          + Add Task
        </button>
      </div>

      <div className="row g-3 mb-4">
        <div className="col-12 col-md-6 col-lg-4">
          <div className="card rounded-3 shadow-sm bg-light h-100">
            <div className="card-body">
              <h6 className="text-secondary">Total Tasks</h6>
              <h3 className="mb-0">{totalTasks}</h3>
              <p className="text-muted mb-0">All tasks in your current workspace.</p>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-6 col-lg-4">
          <div className="card rounded-3 shadow-sm bg-primary-subtle h-100">
            <div className="card-body">
              <h6 className="text-primary">In Progress</h6>
              <h3 className="mb-0">{inProgressTasks}</h3>
              <p className="text-muted mb-0">Tasks actively being worked on right now.</p>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-12 col-lg-4">
          <div className="card rounded-3 shadow-sm bg-light h-100">
            <div className="card-body">
              <h6 className="text-success">Completed</h6>
              <h3 className="mb-0">{completedTasks}</h3>
              <p className="text-muted mb-0">Tasks marked complete in your workspace.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center gap-3 mb-4 px-2 px-sm-0">
        <div>
          <h6 className="mb-1">Filter tasks by status</h6>
          <p className="text-muted mb-0">Use the buttons to narrow your current task view.</p>
        </div>
        <div className="btn-group" role="group" aria-label="Task status filter">
          {statusButtons.map((status) => (
            <button
              key={status}
              type="button"
              className={`btn btn-sm ${statusFilter === status ? 'btn-secondary active' : 'btn-outline-secondary'}`}
              onClick={() => setStatusFilter(status)}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      <div className="row g-3">
        {filteredTasks.length === 0 ? (
          <div className="col-12">
            <div className="alert alert-light border rounded-3" role="alert">
              No active workspace records matched.
            </div>
          </div>
        ) : (
          filteredTasks.map((task) => (
            <div className="col-12" key={task._id}>
              <TaskCard
                task={task}
                onDelete={handleDelete}
                onEdit={(t) => navigate(`/task/edit/${t._id}`, { state: { task: t } })}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};
export default Dashboard;
