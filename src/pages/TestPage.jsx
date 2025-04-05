import { useState } from "react";
import axios from "axios";

const CreateEvent = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    mainImage: "",
    galleryImages: [],
    eventDate: "",
    eventTime: "",
    venue: "",
    entryFee: "",
    whatWillWeLearn: [""],
    mentors: [{ image: "", name: "", profession: "" }],
  });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value });
  };

  const handleGalleryChange = (e) => {
    setFormData({ ...formData, galleryImages: e.target.value.split(",") });
  };

  const handleLearnChange = (index, value) => {
    const updated = [...formData.whatWillWeLearn];
    updated[index] = value;
    setFormData({ ...formData, whatWillWeLearn: updated });
  };

  const handleMentorChange = (index, field, value) => {
    const updated = [...formData.mentors];
    updated[index][field] = value;
    setFormData({ ...formData, mentors: updated });
  };

  const addMentor = () => {
    setFormData({
      ...formData,
      mentors: [...formData.mentors, { image: "", name: "", profession: "" }],
    });
  };

  const addLearningPoint = () => {
    setFormData({ ...formData, whatWillWeLearn: [...formData.whatWillWeLearn, ""] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/events", formData);
      alert("Event Created!");
    } catch (err) {
      console.error(err);
      alert("Error creating event.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input type="text" name="title" placeholder="Title" onChange={handleChange} />
      <textarea name="description" placeholder="Description" onChange={handleChange}></textarea>
      <input type="text" name="mainImage" placeholder="Main Image URL" onChange={handleChange} />
      <input type="text" name="galleryImages" placeholder="Gallery Images (comma separated URLs)" onChange={handleGalleryChange} />
      <input type="date" name="eventDate" onChange={handleChange} />
      <input type="time" name="eventTime" onChange={handleChange} />
      <input type="text" name="venue" placeholder="Venue" onChange={handleChange} />
      <input type="text" name="entryFee" placeholder="Entry Fee" onChange={handleChange} />

      <h3>What Will We Learn</h3>
      {formData.whatWillWeLearn.map((point, idx) => (
        <input
          key={idx}
          type="text"
          value={point}
          onChange={(e) => handleLearnChange(idx, e.target.value)}
          placeholder={`Point ${idx + 1}`}
        />
      ))}
      <button type="button" onClick={addLearningPoint}>Add More Points</button>

      <h3>Mentors</h3>
      {formData.mentors.map((mentor, idx) => (
        <div key={idx} className="flex flex-col gap-2">
          <input
            type="text"
            value={mentor.image}
            placeholder="Mentor Image URL"
            onChange={(e) => handleMentorChange(idx, "image", e.target.value)}
          />
          <input
            type="text"
            value={mentor.name}
            placeholder="Mentor Name"
            onChange={(e) => handleMentorChange(idx, "name", e.target.value)}
          />
          <input
            type="text"
            value={mentor.profession}
            placeholder="Mentor Profession"
            onChange={(e) => handleMentorChange(idx, "profession", e.target.value)}
          />
        </div>
      ))}
      <button type="button" onClick={addMentor}>Add More Mentors</button>

      <button type="submit" className="bg-blue-500 text-white p-2 rounded">Create Event</button>
    </form>
  );
};

export default CreateEvent;
