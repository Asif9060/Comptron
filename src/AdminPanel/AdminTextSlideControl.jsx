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
      "https://comptron-server-1.onrender.com/api/news"
    );
    const data = await response.json();
    setNews(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = editingId ? "PUT" : "POST";
    const url = editingId
      ? `https://comptron-server-1.onrender.com/api/news/${editingId}`
      : "https://comptron-server-1.onrender.com/api/news";

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
    await fetch(`https://comptron-server-1.onrender.com/api/news/${id}`, {
      method: "DELETE",
    });
    fetchNews();
  };

  return (
    <div className="grid place-items-center absolute translate-x-[74.5rem] border rounded-3xl p-4">
      <h2 className="text-center text-white text-3xl">News</h2>
      <form
        className="grid place-items-center gap-[1rem] "
        onSubmit={handleSubmit}
      >
        <div className="container01">
          <input
            type="text"
            className="input01"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="News Text"
            required
            style={{ width: "35rem", height: "3.5rem" }}
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
            style={{ width: "35rem", height: "3.5rem" }}
          />
        </div>
        <div className="translate-y-1 mb-6">
          <button className="pushable" type="submit">
            <span className="shadow"></span>
            <span className="edge"></span>
            <span className="front">{editingId ? "Update" : "Add"}</span>
          </button>
        </div>
      </form>

      <ul className="text-white">
        {news.map((item) => (
          <li className="w-[30rem] space-y-[2rem]" key={item._id}>
            <span className="text-white ">{item.text}</span>
            <br />
            <div className="flex justify-between mb-8">
              <button
                className="bg-[#15A6E1] rounded-4xl Btn05 cursor-pointer text-black w-[13em] h-[45px]"
                onClick={() => handleEdit(item)}
              >
                Edit
                <svg className="svg" viewBox="0 0 512 512">
                  <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"></path>
                </svg>
              </button>
              <button
                className=" w-[13em] button04 "
                onClick={() => handleDelete(item._id)}
              >
                <div className="button-top">Delete</div>
                <div className="button-bottom"></div>
                <div className="button-base"></div>
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminTextSlideControl;
