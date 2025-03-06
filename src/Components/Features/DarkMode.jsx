import './CSS/DarkMode.css';
function DarkMode({ updateClassName }) {
  const handleClick = (event) => {

    if (event.target.checked) {
        updateClassName('dark'); // If checked, set class to 'light'
      } else {
        updateClassName('light'); // If unchecked, set class to 'dark'
      }
  };

  return (
    <div>

        <label className="switch translate-y-[-3em] translate-x-[100em]">
        <input onChange={handleClick} type="checkbox" />
        <span className="slider"></span>
        <span className="clouds_stars"></span>
        </label>


    </div>
  );
}

export default DarkMode;