import { useState } from "react";
import { useNavigation } from "react-router-dom";

export default function PostForm({
  post,
  // initialValues = { title: "", body: "" },
}) {
  // const [title, setTitle] = useState(initialValues.title);
  // const [body, setBody] = useState(initialValues.body);

  // const handleSubmit = (e) => {
  //   e.preventDefualt();
  //   onSubmit({ title, body });
  // };
  const { title, body } = post;
  const navigation = useNavigation();

  return (
    <div>
      <h2>PostForm</h2>
      <form method="post">
        <input
          type="text"
          name="title"
          placeholder="title"
          defaultValue={title}
          required
          // value={title}
          // onChange={(e) => setTitle(e.target.value)}
        />
        <br />
        <textarea
          name="body"
          placeholder="body"
          defaultValue={body}
          required
          // value={body}
          // onChange={(e) => setBody(e.target.value)}
        />
        <br />
        <button type="submit" disabled={navigation.state === "submitting"}>
          {navigation.state === "submitting" ? "Saving..." : "Save"}
        </button>
      </form>
    </div>
  );
}
