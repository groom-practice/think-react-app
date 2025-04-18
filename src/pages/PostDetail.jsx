import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getPostById } from "../apis/posts";

export default function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    getPostById(id).then((res) => setPost(res));
  }, [id]);

  if (!post) return <div>...Loading</div>;

  return (
    <div>
      <h2>Post Id : {id}</h2>
      <h3>{post.title}</h3>
      <p>{post.body}</p>
      <Link to={`/posts/${post.id}/edit`}>Edit</Link>
    </div>
  );
}
