import React, { useState } from 'react';
import './AddReminderItem.scss';

const ReminderItems = ({ reminder, CompleteReminder, DeleteReminder, editReminder }) => {
  const [showDetails, setShowDetails] = useState(false);

  const toggleShowDetails = () => {
    setShowDetails(!showDetails);
  };

  const CheckboxStatus = () => {
    CompleteReminder(reminder._id);
  };

  return (
    <div className="reminder1">
      <h2 className="reminder1__title" onClick={toggleShowDetails}>
        Title: {reminder.title}
      </h2>
      {showDetails && (
        <div className="reminder1__details">
          <p className="reminder1__description">Description: {reminder.description}</p>
          <p className="reminder1__created-date">Created Date: {new Date(reminder.createdDate).toLocaleString()}</p>
          <p className="reminder1__last-modified-date">
            Last Modified Date: {new Date(reminder.lastModifiedDate).toLocaleString()}
          </p>
          <label className="reminder1__is-completed">
            <input type="checkbox" checked={reminder.isCompleted} onChange={CheckboxStatus} />
            <span> Completed</span>
          </label>
          <button className="reminder1__edit-btn" onClick={() => editReminder(reminder._id, reminder.title, reminder.description)}>
            Edit
          </button>
          <button className="reminder1__delete-btn" onClick={() => DeleteReminder(reminder._id)}>
            Delete
          </button>
        </div>
      )}
    </div>
  );
};


export default ReminderItems;
