import { useEffect, useState } from "react";

const AdminTextSlideControl = () => {
  const [news, setNews] = useState([]);
  const [text, setText] = useState("");
  const [link, setLink] = useState("");
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    const response = await fetch(
      "https://comptron-server.onrender.com/api/news"
    );
    const data = await response.json();
    setNews(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = editingId ? "PUT" : "POST";
    const url = editingId
      ? `https://comptron-server.onrender.com/api/news/${editingId}`
      : "https://comptron-server.onrender.com/api/news";

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, link }),
    });

    setText("");
    setLink("");
    setEditingId(null);
    fetchNews();
  };

  const handleEdit = (item) => {
    setText(item.text);
    setLink(item.link);
    setEditingId(item._id);
  };

  const handleDelete = async (id) => {
    await fetch(`https://comptron-server.onrender.com/api/news/${id}`, {
      method: "DELETE",
    });
    fetchNews();
  };

  return (
    <div>
      <h2 className="text-center text-white text-3xl mb-15">News</h2>
      <form className="flex gap-[1rem]" onSubmit={handleSubmit}>
        <div className="container01">
          <input
            type="text"
            className="input01"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="News Text"
            required
            style={{ width: "40rem", height: "3.5rem" }}
          />
        </div>
        {/* <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="News Text"
          required
        /> */}
        <div></div>
        <div className="container01">
          <input
            type="url"
            className="input01"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            placeholder="Link"
            required
            style={{ width: "20rem", height: "3.5rem" }}
          />
        </div>
        <div className="translate-y-1">
          <button className="pushable" type="submit">
            <span className="shadow"></span>
            <span className="edge"></span>
            <span className="front">{editingId ? "Update" : "Add"}</span>
          </button>
        </div>
      </form>

      <ul>
        {news.map((item) => (
          <li key={item._id}>
            <span>{item.text}</span>
            <button onClick={() => handleEdit(item)}>Edit</button>
            <button onClick={() => handleDelete(item._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminTextSlideControl;
