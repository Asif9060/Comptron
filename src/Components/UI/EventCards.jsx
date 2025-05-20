import img1 from "../../assets/images/img1.jpg";
import img2 from "../../assets/images/img2.jpg";
import img3 from "../../assets/images/Events.jpg";

const EventCards = () => {
  return (
    <div className="flex flex-col items-center justify-center mt-10 font-bold text-3xl text-[#15A6E1]">
      <div>Latest & Ongoing Events</div>

      <div className="flex flex-wrap justify-center items-center mt-10 gap-5">
        {[img1, img2, img3].map((image, index) => (
          <div key={index} className="bg-amber-50 w-[20rem] h-[25rem] shadow-lg rounded-lg overflow-hidden flex flex-col">
            <div className="w-full">
              <img className="w-full h-full object-cover aspect-[16/9]" src={image} alt={`Event ${index + 1}`} />
            </div>
            <div className="mt-5 px-3">
              <p className="text-lg  font-semibold">Eid-Ul-Fitr 2025</p>
              <p className="text-lg  font-semibold">Date : </p>
              <p className="text-lg  font-semibold">Time : </p>
              <p className="text-lg  font-semibold">Location : </p>
              <button className="cursor-pointer w-full mt-9 bg-[#15A6E1] text-white py-2 px-4 rounded" type="button">Details</button>
            </div>
          </div>
        ))}
      </div>


      <div className="text-center text-[30px] text-white mt-5">Upcoming Events</div>

      <div className="flex flex-wrap justify-center items-center mt-10 gap-5">
        {[img1, img2, img3].map((image, index) => (
          <div key={index} className="bg-amber-50 w-[20rem] h-[25rem] shadow-lg rounded-lg overflow-hidden flex flex-col">
            <div className="w-full h-64">
              <img className="w-full h-full object-cover aspect-[16/9]" src={image} alt={`Event ${index + 1}`} />
            </div>
            <div className="p-4 text-center">
              <p className="text-lg font-semibold">Event {index + 1}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventCards;
