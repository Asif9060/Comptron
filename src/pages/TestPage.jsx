import { motion, useTransform, useScroll } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const Example = () => {
  return (
    <div className="bg-neutral-800">
      <div className="flex h-48 items-center justify-center">
        <span className="font-semibold uppercase text-neutral-500">
          Featured Events
        </span>
      </div>
      <HorizontalScrollCarousel />
      <div className="flex h-48 items-center justify-center">
        <span className="font-semibold uppercase text-neutral-500">
          Scroll up
        </span>
      </div>
    </div>
  );
};

const HorizontalScrollCarousel = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["1%", "-95%"]);

  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Fetch event data from the backend (update this URL based on your API endpoint)
    const fetchEvents = async () => {
      try {
        const response = await fetch("https://comptron-server-2.onrender.com/api/eventDetails");
        const data = await response.json();
        setEvents(data); // Assuming the response data is an array of event objects
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <section ref={targetRef} className="relative h-[300vh] bg-neutral-900">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-4">
          {events.map((event) => {
            return <Card card={event} key={event._id} />;
          })}
        </motion.div>
      </div>
    </section>
  );
};

const Card = ({ card }) => {
  return (
    <div
      key={card.id}
      className="group relative h-[450px] w-[450px] overflow-hidden bg-neutral-200"
    >
      <div
        style={{
          backgroundImage: `url(${card.mainImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="absolute inset-0 z-0 transition-transform duration-300 group-hover:scale-110"
      ></div>
      <div className="absolute inset-0 z-10 grid place-content-center">
        {/* <p className="bg-gradient-to-br from-white/20 to-white/0 p-8 text-6xl font-black uppercase text-white backdrop-blur-lg">
          {card.title}
        </p> */}
        <button
          onClick={() => (window.location.href = `/event/${card._id}`)}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-[#15A6E1] text-white py-2 px-6 rounded-lg hover:bg-[#1089BD] transition"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default Example;
