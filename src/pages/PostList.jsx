import { useEffect, useState } from "react";
import { deletePost, getAllPosts } from "../apis/posts";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";

export default function PostList() {
  const [posts, setPosts] = useState([]);
  const [openModal, setOpenModal] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    getAllPosts().then((res) => {
      setPosts(res);
    });
  }, []);

  const handleDelete = async () => {
    if (openModal === null) return;

    setIsDeleting(true);

    try {
      await deletePost(openModal);
      setPosts((prev) => prev.filter((p) => p.id !== openModal));
    } catch (error) {
      console.error("Failed to delete post:", error);
      setIsDeleting(false);
    } finally {
      setIsDeleting(false);
      setOpenModal(null);
    }
  };

  return (
    <div>
      <h2>Posts Lists</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <Link to={`/posts/${post.id}`}>
              {post.id}. {post.title}
            </Link>{" "}
            <button onClick={() => setOpenModal(post.id)}>Delete</button>
          </li>
        ))}
      </ul>

      {openModal &&
        createPortal(
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0,0,0,0.5)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              style={{
                backgroundColor: "white",
                padding: "20px",
                borderRadius: "5px",
              }}
            >
              <h3>Are you sure you want to delete id={openModal} post?</h3>
              <button onClick={handleDelete} disabled={isDeleting}>
                Yes
              </button>
              <button onClick={() => setOpenModal(null)} disabled={isDeleting}>
                No
              </button>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}
