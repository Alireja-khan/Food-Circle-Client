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
import ChatDashboard from "../pages/Chat/ChatDashboard";
import ChatRoom from "../pages/Chat/ChatRoom";

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
        loader: async ({ params }) => {
          try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/foods/${params.id}`);
            if (!response.ok) {
              throw new Error('Food not found');
            }
            return await response.json();
          } catch (error) {
            return { error: true, message: 'Failed to load food details' };
          }
        }
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
      // 🆕 Chat Routes
      {
        path: 'chat',
        element: <PrivateRoute>
          <ChatDashboard />
        </PrivateRoute>
      },
      {
        path: 'chat/:roomId',
        element: <PrivateRoute>
          <ChatRoom />
        </PrivateRoute>,
        loader: async ({ params }) => {
          try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/messages/${params.roomId}`);
            if (!response.ok) {
              throw new Error('Chat room not found');
            }
            const messages = await response.json();
            return { roomId: params.roomId, initialMessages: messages };
          } catch (error) {
            return { roomId: params.roomId, initialMessages: [], error: 'Failed to load messages' };
          }
        }
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