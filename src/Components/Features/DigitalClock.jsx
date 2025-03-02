import { useState, useEffect } from 'react';

const DigitalClock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  const formatTime = (date) => {
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const ampm = hours >= 12 ? 'PM' : 'AM';

    // Convert to 12-hour format
    hours = hours % 12 || 12;

    // Pad single-digit minutes and seconds with leading zeros
    const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const paddedSeconds = seconds < 10 ? `0${seconds}` : seconds;

    return `${hours}:${paddedMinutes}:${paddedSeconds} ${ampm}`;
  };

  return (
    <div className='translate-x-[100px] inline-block translate-y-8' style={{ fontFamily: 'Arial, sans-serif', fontSize: '2rem', textAlign: 'center' }}>
      <div className='text-[#00ACF2]' >{formatTime(time)}</div>
    </div>
  );
};

export default DigitalClock;