import { createBrowserRouter } from "react-router-dom";
import Home from "../Home/Home";
import Login from "../components/LOgin/login";
import Contact from "../components/Contact/Contact";
import MainApp from "../components/MainAPP/MainApp";
import StoryMain from "../components/Main story/StoryMian";
import MenMain from "../MEN Component/Main/MenMain";
import Hero1 from "../MEN Component/Page1/page";
import WomenMain from "../Women Component/WomenMain/womenMain";
import Heroin1 from "../Women Component/Heroin1/heroin1";
import MenGallery from "../MEN Component/Aesthetic/Aesthetic";
import MenCollection from "../MEN Component/MenCollection/MenCollection";
import ProductDetail from "../MEN Component/Winter Detail/WinterDetail";
import ErrorBoundary from "../components/ErrorBoundary";
import PaymentExample from "../components/Payment/PaymentExample";
import Heroin from "../Women Component/Women/Heroin1";
import Board from "../Dasboard/BoardMain/Board";
import AdminHome from "../Dasboard/Dasboard/Dasboard"
import PaymentCollection from "../Dasboard/Winter Payment/Winpayment";
import ProductEntryForm from "../Dasboard/addWinter/AddWinter";
import WomenMainPage from "../Women Component/Dress Collection/WomenMain";
import DressDetail from "../Women Component/DressDetail/DressDetail";
import AddWomen from "../Dasboard/addwomen/addWomen";
import FemalePaymentLedger from "../Women Component/Cart/Cart";
import Collection from "../MEN Component/Payment Collection/Collection";

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
        path: "/payment-demo",
        element: <PaymentExample />
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
        path: "/orders",
        element: <div className="min-h-screen bg-black text-white flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-light mb-4">Your Orders</h1>
            <p className="text-white/60">Orders page coming soon...</p>
          </div>
        </div>
      },
      {
        path: "/cart",
        element: <FemalePaymentLedger />
      }
    ]
  },
  {
    path: "/Dashboard",
    element: <Board></Board>,
    children: [
      {
        index: true,
        element: <AdminHome></AdminHome>
      },
      {
        path: "winter-payment",
        element: <PaymentCollection></PaymentCollection>
      },
      {
        path :"winter-entry",
        element:<ProductEntryForm></ProductEntryForm>
      },
      {
        path :"women-entry",
        element:<AddWomen></AddWomen>
      },
      {
        path : "Cart",
        element : <FemalePaymentLedger></FemalePaymentLedger>
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
        path :"CART",
        element : <Collection></Collection>
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
        element: <Heroin1></Heroin1>
      },
      {
        path : "Heroin",
        element :<Heroin></Heroin>
      },
      {
        path :"WomenC",
        element: <WomenMainPage></WomenMainPage>
      },
      {
        path :":id",
        element: <DressDetail></DressDetail>
      },
      {
        path : "Cart",
        element : <FemalePaymentLedger></FemalePaymentLedger>
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