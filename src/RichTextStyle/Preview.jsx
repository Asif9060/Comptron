import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Preview = () => {
  const { id } = useParams();
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/text/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setContent(data.textContent);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchContent();
    }
  }, [id]);

  if (loading) {
    return <div>Loading content...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="preview-container">
      <h1>Saved Content Preview</h1>
      <div className="content-display" dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
};

export default Preview; 