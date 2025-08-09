import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home";
import AddFoods from "../pages/AddFood/AddFoods";
import AvailableFoods from "../pages/AvailableFood/AvailableFoods";
import ManageMyFoods from "../pages/ManageFood/ManageMyFoods";
import MyRequestFoods from "../pages/RequestFood/MyRequestFoods";
import SignIn from "../pages/Auth/SignIn";
import SignUp from "../pages/Auth/SignUp";
import FoodDetails from "../pages/AvailableFood/FoodDetails";
import PrivateRoute from "./PrivateRoute";
import MyProfile from "../pages/Profiles/MyProfile";
import DonorProfile from "../pages/Profiles/DonorProfile";
import Contact from "../contacts/Contact";
import NotFound from "../error/NotFound";
// import DonorProfile from "../pages/Profiles/DonorProfile";

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home
      },
      {
        path: 'addFoods',
        element: <PrivateRoute>
          <AddFoods></AddFoods>
        </PrivateRoute>
      },
      {
        path: 'availableFoods',
        Component: AvailableFoods
      },
      {
        path: 'contact',
        Component: Contact
      },

      {
        path: '/foods/:id',
        Component: FoodDetails,
        loader: ({ params }) => fetch(`https://food-circle-server-five.vercel.app/api/foods/${params.id}`)
      },

      {
        path: 'donorProfile',
        element: <DonorProfile />
      },


      {
        path: 'manageMyFoods',
        element: <PrivateRoute>
          <ManageMyFoods></ManageMyFoods>
        </PrivateRoute>
      },
      {
        path: 'myRequestFoods',
        element: <PrivateRoute>
          <MyRequestFoods></MyRequestFoods>
        </PrivateRoute>
      },
      {
        path: 'myProfile',
        element: <PrivateRoute>
          <MyProfile></MyProfile>
        </PrivateRoute>
      },

    ]
  },
  {
    path: 'signIn',
    Component: SignIn
  },
  {
    path: 'signUp',
    Component: SignUp
  },
  {
    path: "*",
    element: <NotFound></NotFound>,
  }
]);
export default router;