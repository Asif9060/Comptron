


// eslint-disable-next-line react/prop-types
function DarkMode({ updateClassName }) {
  const handleClick = (event) => {

     // If unchecked, set class to 'dark'
    // Call the function passed from the parent to update the class
    if (event.target.checked) {
        updateClassName('dark'); // If checked, set class to 'light'
      } else {
        updateClassName('light'); // If unchecked, set class to 'dark'
      }
  };

  return (
    <div>

        <label className="switch translate-y-[-2.5em] translate-x-[100em]">
        <input onChange={handleClick} type="checkbox" />
        <span className="slider"></span>
        <span className="clouds_stars"></span>
        </label>


    </div>
  );
}

export default DarkMode;