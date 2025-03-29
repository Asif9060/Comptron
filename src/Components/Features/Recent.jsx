import "./CSS/EventSlider.css";
import { useRef, useEffect, useState } from "react";

const Recent = () => {
  const nextBtn = useRef(null);
  const prevBtn = useRef(null);
  const carousel = useRef(null);
  const list = useRef(null);
  const runningTime = useRef(null);

  const [eventImages, setEventImages] = useState([]);

  useEffect(() => {
    fetchImages(); // Fetch images from the backend
  }, []);

  const fetchImages = async () => {
    try {
      const response = await fetch("https://comptron-server.onrender.com/api/eventImages");
      const data = await response.json();
      setEventImages(data);
    } catch (error) {
      console.error("Error fetching event images:", error);
    }
  };

  const show = (type) => {
    const ItemsDom = list.current.querySelectorAll(".item");
    if (type === "next") {
      list.current.appendChild(ItemsDom[0]);
      carousel.current.classList.add("next");
    } else {
      list.current.prepend(ItemsDom[ItemsDom.length - 1]);
      carousel.current.classList.add("prev");
    }

    setTimeout(() => {
      carousel.current.classList.remove("next");
      carousel.current.classList.remove("prev");
    }, 3000);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this image?")) return;

    try {
      await fetch(`https://comptron-server.onrender.com/api/eventImages/${id}`, {
        method: "DELETE",
      });
      alert("Image deleted successfully!");
      fetchImages(); // Refresh images
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };

  const handleUpdate = async (id, newTitle, newDescription) => {
    try {
      await fetch(`https://comptron-server.onrender.com/api/eventImages/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: newTitle, description: newDescription }),
      });
      alert("Image updated successfully!");
      fetchImages(); // Refresh images
    } catch (error) {
      console.error("Error updating image:", error);
    }
  };

  return (
    <div>
      <div ref={carousel} className="carousel bg-black">
        <div ref={list} className="list">
          {eventImages.map((image, index) => (
            <div
              key={index}
              style={{ backgroundImage: `url(${image.imageUrl})` }}
              className="item"
            >
              <div className="content">
                <div className="title">{image.title}</div>
                <div className="des">{image.description}</div>
                <div className="btn">
                  <button onClick={() => handleDelete(image._id)}>
                    Delete
                  </button>
                  <button
                    onClick={() => {
                      const newTitle = prompt("Enter new title:", image.title);
                      const newDescription = prompt(
                        "Enter new description:",
                        image.description
                      );
                      if (newTitle && newDescription) {
                        handleUpdate(image._id, newTitle, newDescription);
                      }
                    }}
                  >
                    Edit
                  </button>
                  <a href="/Events">
                    <button>Details</button>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="arrows">
          <button ref={prevBtn} className="prev" onClick={() => show("prev")}>
            {"<"}
          </button>
          <button ref={nextBtn} className="next" onClick={() => show("next")}>
            {">"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Recent;
