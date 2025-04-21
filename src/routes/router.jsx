import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import PostList from "../pages/PostList";
import PostDetail from "../pages/PostDetail";
import EditPost from "../pages/EditPost";
import ErrorPage from "../pages/ErrorPage";
import { getAllPosts, getPostById, updatePost } from "../apis/posts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "posts",
        element: <PostList />,
        loader: async () => ({ allPosts: await getAllPosts() }),
      },
      {
        path: "posts/:id",
        element: <PostDetail />,
        loader: async ({ params }) => getPostById(params.id),
      },
      {
        path: "posts/:id/edit",
        element: <EditPost />,
        loader: async ({ params }) => getPostById(params.id),
        action: async ({ params, request }) => {
          const formData = await request.formData();
          const title = formData.get("title");
          const body = formData.get("body");

          if (!title || !body) {
            return { error: "title, body are required" }; // useActionData()로 받을 값
          }

          try {
            await updatePost(params.id, { title, body });
            return { success: true };
          } catch {
            return { error: "Failed to update post" };
          }
        },
      },
    ],
  },
]);

export default router;
