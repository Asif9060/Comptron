import React from 'react';
import ReactDOM from 'react-dom/client';

// Styles for the grid layout
const styles = `
  /* General Reset */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: Arial, sans-serif;
    background-color: #f4f4f9;
    padding: 20px;
  }

  /* Grid Container */
  .grid-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); /* Responsive columns */
    gap: 20px; /* Space between grid items */
  }

  /* Grid Items */
  .grid-item {
    background-color: #ffffff;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 20px;
    text-align: center;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }

  /* Hover Effect on Grid Items */
  .grid-item:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }

  /* Responsive Design */
  @media (max-width: 768px) {
    .grid-container {
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    }
  }

  @media (max-width: 480px) {
    .grid-container {
      grid-template-columns: 1fr;
    }
  }
`;

// Inject styles into the document
const styleSheet = document.createElement('style');
styleSheet.type = 'text/css';
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

// Individual Grid Item Component
function GridItem({ title, description }) {
  return (
    <div className="grid-item">
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

// Main App Component
function App() {
  // Data for the grid items
  const componentsData = [
    { title: "Component 1", description: "This is the first component." },
    { title: "Component 2", description: "This is the second component." },
    { title: "Component 3", description: "This is the third component." },
    { title: "Component 4", description: "This is the fourth component." },
    { title: "Component 5", description: "This is the fifth component." },
    { title: "Component 6", description: "This is the sixth component." },
  ];

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>My React Grid Layout</h1>
      <div className="grid-container">
        {/* Dynamically render GridItem components */}
        {componentsData.map((data, index) => (
          <GridItem key={index} title={data.title} description={data.description} />
        ))}
      </div>
    </div>
  );
}

// Render the App component into the DOM
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);