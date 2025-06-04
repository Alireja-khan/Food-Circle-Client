import {
  createBrowserRouter,
} from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home";
import AddFoods from "../pages/AddFoods";
import AvailableFoods from "../pages/AvailableFoods";
import ManageMyFoods from "../pages/ManageMyFoods";
import MyFoodRequest from "../pages/MyFoodRequest";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";

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
        Component: AddFoods
      },
      {
        path: 'availableFoods',
        Component: AvailableFoods
      },
      {
        path: 'manageMyFoods',
        Component: ManageMyFoods
      },
      {
        path: 'myFoodRequest',
        Component: MyFoodRequest
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
]);
export default router;