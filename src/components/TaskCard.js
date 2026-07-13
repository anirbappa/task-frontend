import React from 'react';

const TaskCard = ({ task, onDelete, onEdit }) => {
  return (
    <div style={{ border: '1px solid #ccc', borderRadius: '5px', padding: '1rem', margin: '1rem 0', background: '#fff' }}>
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <div style={{ display: 'flex', gap: '1rem', fontSize: '0.9rem', color: '#555', marginTop: '0.5rem' }}>
        <span><strong>Status:</strong> {task.status}</span>
        <span><strong>Priority:</strong> {task.priority}</span>
        {task.assignedUser && <span><strong>Assigned to:</strong> {task.assignedUser.name || 'You'}</span>}
      </div>
      <div style={{ marginTop: '1rem' }}>
        <button onClick={() => onEdit(task)} style={{ marginRight: '0.5rem', background: '#61afef', border: 'none', padding: '0.4rem 0.8rem', color: 'white', cursor: 'pointer' }}>Edit</button>
        <button onClick={() => onDelete(task._id)} style={{ background: '#e06c75', border: 'none', padding: '0.4rem 0.8rem', color: 'white', cursor: 'pointer' }}>Delete</button>
      </div>
    </div>
  );
};
export default TaskCard;
