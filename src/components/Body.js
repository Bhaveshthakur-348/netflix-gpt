import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Browse from "./Browse"
import Login from "./Login"
import MovieDetails from "./MovieContainer/MovieDetails"

const Body = () => {
  const appRouter = createBrowserRouter([
    {
        path: '/',
        element: <Login />
    },
    {
        path: "/browse",
        element: <Browse />
    },
    {
      path: "/browse/:movieId",
      element: <MovieDetails />,
    },
  ])


  return (
    <div>
       <RouterProvider router={appRouter} />
    </div>
  )
}

export default Body