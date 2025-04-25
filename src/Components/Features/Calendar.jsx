import { useState, useEffect } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths } from 'date-fns';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  // Load events from localStorage on component mount
  useEffect(() => {
    const savedEvents = localStorage.getItem('calendarEvents');
    if (savedEvents) {
      setEvents(JSON.parse(savedEvents));
    }
  }, []);

  // Save events to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('calendarEvents', JSON.stringify(events));
  }, [events]);

  const handlePrevMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const handleNextMonth = () => setCurrentDate(addMonths(currentDate, 1));

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setShowModal(true);
  };

  const handleAddEvent = (eventData) => {
    const newEvent = {
      ...eventData,
      date: selectedDate.toISOString(),
      id: Date.now(),
    };
    setEvents([...events, newEvent]);
    setShowModal(false);
  };

  const handleDeleteEvent = (eventId) => {
    const updatedEvents = events.filter(event => event.id !== eventId);
    setEvents(updatedEvents);
  };

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <button onClick={handlePrevMonth} className="nav-button">&lt;</button>
        <h2 className="month-title">{format(currentDate, 'MMMM yyyy')}</h2>
        <button onClick={handleNextMonth} className="nav-button">&gt;</button>
      </div>

      <div className="calendar-grid">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="calendar-day-header">{day}</div>
        ))}
        
        {daysInMonth.map(date => {
          const dayEvents = events.filter(event => 
            isSameDay(new Date(event.date), date)
          );
          
          return (
            <div 
              key={date.toISOString()}
              className={`calendar-day ${
                !isSameMonth(date, currentDate) ? 'other-month' : ''
              }`}
              onClick={() => handleDateClick(date)}
            >
              <div className="day-number">{format(date, 'd')}</div>
              <div className="events">
                {dayEvents.map(event => (
                  <div key={event.id} className="event">
                    {event.title}
                    <button 
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent date click
                        handleDeleteEvent(event.id);
                      }} 
                      className="delete-button"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {showModal && (
        <EventModal
          onClose={() => setShowModal(false)}
          onSave={handleAddEvent}
          date={selectedDate}
        />
      )}
    </div>
  );
};

const EventModal = ({ onClose, onSave, date }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ title, description });
    setTitle('');
    setDescription('');
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Add Event for {format(date, 'MMM d, yyyy')}</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Event Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            placeholder="Event Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button type="submit" className="save-button">Save Event</button>
          <button type="button" onClick={onClose} className="cancel-button">Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default Calendar;