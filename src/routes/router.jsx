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
        loader:
          async () =>
          ({ params }) =>
            getPostById(params.id),
      },
      {
        path: "posts/:id/edit",
        element: <EditPost />,
        loader: async ({ params }) => getPostById(post.id, data),
        action: async ({ params, request }) => {
          const formData = await request.formData();
          const data = {
            title: formData.get("title"),
            body: formData.get("body"),
          };
          return updatePost(params.id, data);
        },
      },
    ],
  },
]);

export default router;
