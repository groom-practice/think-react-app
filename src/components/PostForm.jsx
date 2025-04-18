import { useState } from "react";

export default function PostForm({
  onSubmit,
  initialValues = { title: "", body: "" },
}) {
  const [title, setTitle] = useState(initialValues.title);
  const [body, setBody] = useState(initialValues.body);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, body });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
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
      <button type="submit">Submit</button>
    </form>
  );
}
