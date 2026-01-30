import { createBrowserRouter } from "react-router-dom";
import Home from "../Home/Home";
import Login from "../components/LOgin/login";
import Contact from "../components/Contact/Contact";
import MainApp from "../components/MainAPP/MainApp";
import StoryMain from "../components/Main story/StoryMian";
import MenMain from "../MEN Component/Main/MenMain";
import Hero1 from "../MEN Component/Page1/page";
import WomenMain from "../Women Component/WomenMain/womenMain";
import Heroin1 from "../Women Component/Women/Heroin1";
import MenGallery from "../MEN Component/Aesthetic/Aesthetic";
import MenCollection from "../MEN Component/MenCollection/MenCollection";
import ProductDetail from "../MEN Component/Winter Detail/WinterDetail";
import ErrorBoundary from "../components/ErrorBoundary";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        index: true,
        element: <MainApp />
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/Contact",
        element: <Contact />
      },
      {
        path: "/story",
        element: <StoryMain />
      },
      {
        path: "/profile",
        element: <div className="min-h-screen bg-black text-white flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-light mb-4">User Profile</h1>
            <p className="text-white/60">Profile page coming soon...</p>
          </div>
        </div>
      },
      {
        path: "/settings",
        element: <div className="min-h-screen bg-black text-white flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-light mb-4">Settings</h1>
            <p className="text-white/60">Settings page coming soon...</p>
          </div>
        </div>
      },
      {
        path: "/dashboard",
        element: <div className="min-h-screen bg-black text-white flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-light mb-4">Dashboard</h1>
            <p className="text-white/60">Dashboard coming soon...</p>
          </div>
        </div>
      }
    ]
  },
  {
    path: "/men",
    element: <MenMain />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        index: true,
        element: <Hero1 />
      },
      {
        path: "aesthetic",
        element: <MenGallery />
      },
      {
        path: "Products",
        element: <MenCollection />
      },
      {
        path: ":id", // Fixed: removed "men/" prefix since we're already under /men
        element: <ProductDetail />
      }
    ]
  },
  {
    path: "/women",
    element: <WomenMain />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        index: true,
        element: <Heroin1 />
      },
      {
        path: ":id", // Added dynamic route for women's products too
        element: <div className="min-h-screen bg-black text-white flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-light mb-4">Product Details</h1>
            <p className="text-white/60">Women's product page coming soon...</p>
          </div>
        </div>
      }
    ]
  }
], {
  future: {
    v7_startTransition: true, // Enable React.startTransition for state updates
    v7_relativeSplatPath: true, // Enable relative splat path resolution
  }
});

export default Router;  