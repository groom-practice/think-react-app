import {
  useActionData,
  useLoaderData,
  useNavigate,
  useNavigation,
  useParams,
} from "react-router-dom";
import PostForm from "../_components/PostForm";
import { useEffect, useState } from "react";
import { getPostById, updatePost } from "../apis/posts";

export default function EditPost() {
  // const { id } = useParams();
  // const [post, setPost] = useState(null);
  // const navigate = useNavigate();

  // useEffect(() => {
  //   getPostById(id).then((res) => setPost(res));
  // }, [id]);

  // const handleUpdate = async (data) => {
  //   await updatePost(id, data).then((res) => console.log(res));
  //   navigate(`/posts/${id}`);
  // };

  // if (!post) return <div>Loading...</div>;

  const post = useLoaderData();
  const result = useActionData(); // route에서 정의한 action 함수의 반환값 받기
  const navigate = useNavigate();

  console.log(post, result);
  return (
    <div>
      <h2>Edit Post Id : {post.id}</h2>
      <PostForm post={post} />
      {result?.error && <p style={{ color: "red" }}>{result?.error}</p>}
      {result?.success && (
        <div>
          <span style={{ color: "green" }}>Post updated successfully!</span>
          <button onClick={() => navigate(-1)}>back</button>
        </div>
      )}
    </div>
  );
}
