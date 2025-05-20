const GradientBackground = ({ children }) => {
  const gradientStyle = {
    position: "fixed", // Fixed position to cover the entire viewport
    top: 0,
    left: 0,
    width: "100%", // Full width
    height: "100%", // Full height
    zIndex: -1, // Ensures it stays behind other content
    background: "", // Gradient colors
    backgroundSize: "cover", // Ensures the gradient covers the entire area
  };

  return (
    <>
      <div style={gradientStyle}></div>
      {children} {/* Renders any content passed to the component */}
    </>
  );
};

export default GradientBackground;