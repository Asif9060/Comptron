import React, { useState, useEffect, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const dummyEvents = Array(8).fill({
  mainImage: "https://dummyimage.com/600x600/000/fff",
  title: "Dummy Event",
});

const SlickWheelSlider = () => {
  const sliderRef = useRef(null);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch("https://comptron-server-2.onrender.com/api/eventDetails");
        const data = await res.json();

        if (data && data.length > 0) {
          setEvents(data);
        } else {
          setEvents(dummyEvents);
        }
      } catch (error) {
        console.error("Failed to fetch events:", error);
        setEvents(dummyEvents);
      }
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    const slider = sliderRef.current;
    const sliderDOM = slider?.innerSlider?.list;

    const handleWheel = (e) => {
      e.preventDefault();
      if (e.deltaY < 0) {
        slider.slickNext();
      } else {
        slider.slickPrev();
      }
    };

    if (sliderDOM) {
      sliderDOM.addEventListener("wheel", handleWheel);
    }

    return () => {
      if (sliderDOM) {
        sliderDOM.removeEventListener("wheel", handleWheel);
      }
    };
  }, []);

  const settings = {
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
    infinite: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "20px",
      }}
    >
      <Slider ref={sliderRef} {...settings}>
        {events.map((event, index) => (
          <div key={index} style={{ padding: "0 10px" }}>
            <div
            className=""
              style={{
                borderRadius: "8px",
                overflow: "hidden",
                width: "100%",
                height: "250px", // consistent height
                backgroundColor: "#ddd",
              }}
            >
              <img
                src={event.mainImage}
                alt={event.title || `Slide ${index + 1}`}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default SlickWheelSlider;
