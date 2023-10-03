import React from 'react';
import RemainderItems from '../ReminderItem/AddReminderItem';
import './ReminderList.scss';

const ReminderList = ({ reminders, DeleteReminder,editReminder, CompleteReminder, setShowAddReminderModal }) => {

  return (
    <div className="reminders-container">
  <h1>Reminders</h1>
  {reminders.map((reminder) => (
    <RemainderItems
      key={reminder._id} 
      reminder={reminder} 
      DeleteReminder={DeleteReminder}
      editReminder={editReminder} 
      CompleteReminder={CompleteReminder} 
    />
  ))}
  <button onClick={() => setShowAddReminderModal(true)}>Add Reminder</button>
</div>

  );
};

export default ReminderList;
