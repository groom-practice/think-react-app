import { useEffect, useState } from "react";
import { Link, useLoaderData, useParams } from "react-router-dom";
import { getPostById } from "../apis/posts";

export default function PostDetail() {
  // const { id } = useParams();
  // const [post, setPost] = useState(null);

  // useEffect(() => {
  //   getPostById(id).then((res) => setPost(res));
  // }, [id]);

  // if (!post) return <div>loading...</div>;

  // ✅ 데이터 받아오는 과정이 한줄로 끝났습니다.
  const post = useLoaderData();

  return (
    <div>
      <h3>PostDetail Page</h3>
      <h4>Post Id : {id}</h4>
      <h5>{post.title}</h5>
      <p>{post.body}</p>
      <Link to={`/posts/${post.id}/edit`}>Edit</Link>
    </div>
  );
}
