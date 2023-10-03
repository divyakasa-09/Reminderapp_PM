import React, { useState, useEffect } from 'react';
import './App.scss';
import NavBar from './NavBar/NavBar';
import RemainderList from './RemainderList/ReminderList.js';

const apiUrl = 'http://localhost:3000/reminders';

function App() {
  const [reminders, setReminders] = useState([]);
  const [showAddReminderModal, setShowAddReminderModal] = useState(false);
  const [titleInput, setTitleInput] = useState('');
  const [descriptionInput, setDescriptionInput] = useState('');
  const [dateInput, setdateInput] = useState('');

  useEffect(() => {
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => setReminders(data));
  }, []);

  const handleAddReminder = async () => {
    if (!titleInput ) {
      alert('Please enter Title');
    } 
    else if (!descriptionInput ) {
      alert('Please enter Description');
    } 
    else if (!dateInput ) {
      alert('Please enter Date');
    } 
    
    else {
      const newReminder = {
        title: titleInput,
        description: descriptionInput,
        isCompleted: false,
      };
      await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newReminder),
      });
      setShowAddReminderModal(false);
      setTitleInput('');
      setDescriptionInput('');
      setReminders([...reminders, newReminder]);
      window.location.reload();
    }
  };

  const editReminder = (id, title, description) => {
    const titleInput = prompt('Enter new title', title);
    const descriptionInput = prompt('Enter new description', description);

    if (titleInput && descriptionInput !== null) {
      const updatedreminder = {
        title: titleInput,
        description: descriptionInput,
      };

      fetch(`${apiUrl}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedreminder),
      });
      setShowAddReminderModal(false);
      setTitleInput('');
      setDescriptionInput('');
      setReminders([...reminders, updatedreminder]);
      window.location.reload();
    }
  };


  const DeleteReminder = async (id) => {
    if (window.confirm('Are you sure you want to delete this reminder?')) {
      await fetch(`${apiUrl}/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });
      setReminders(reminders.filter((reminder) => reminder._id !== id));
    }
  };


  const CompleteReminder = async (id) => {
    const reminder = reminders.find((reminder) => reminder._id === id);
    const updatedReminder = {
      ...reminder,
      isCompleted: !reminder.isCompleted,
    };
    await fetch(`${apiUrl}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedReminder),
    });
    setReminders(
      reminders.map((reminder) =>
        reminder._id === id ? { ...reminder, isCompleted: !reminder.isCompleted } : reminder
      )
    );
  };
  

  return (
    <div className="rem">
      <NavBar />
      <RemainderList
        reminders={reminders}
        DeleteReminder={DeleteReminder}
        editReminder={editReminder}
        CompleteReminder={CompleteReminder}
        setShowAddReminderModal={setShowAddReminderModal} />
      {showAddReminderModal && (
        <div className="rem1">
          <h2>Add Reminder</h2>     
            <label htmlFor="titleInput">Title:</label> 
            <input type="text" id="titleInput" value={titleInput} onChange={(e) => setTitleInput(e.target.value)} />
         <label htmlFor="descriptionInput">Description:</label>
          <textarea id="descriptionInput" value={descriptionInput} onChange={(e) => setDescriptionInput(e.target.value)}></textarea>
          <label htmlFor="timeInput">Created Time:</label>
          <input type="datetime-local" id="time" value={dateInput} onChange={(e) => setdateInput(e.target.value)} />
          <button className="submitBtn" onClick={handleAddReminder}>Submit</button>
          <button className="cancelBtn" onClick={() => setShowAddReminderModal(false)}>Cancel</button>
        </div>
      )}
    </div>

  );
}

export default App;
