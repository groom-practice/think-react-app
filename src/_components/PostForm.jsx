import { useState } from "react";

export default function PostForm({
  onSubmit,
  initialValues = { title: "", body: "" },
}) {
  const [title, setTitle] = useState(initialValues.title);
  const [body, setBody] = useState(initialValues.body);

  const handleSubmit = (e) => {
    e.preventDefualt();
    onSubmit({ title, body });
  };

  return (
    <div>
      <h2>PostForm</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />
        <textarea
          placeholder="body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
        <br />
        <button type="submit">submit</button>
      </form>
    </div>
  );
}
