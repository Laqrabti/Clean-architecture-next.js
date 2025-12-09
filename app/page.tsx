// app/page.tsx
import UserForm from "./components/user";  // adjust path if needed
import ExpensiveFilterComponent from "./components/special";
import ProductSection from "./components/ProductSection";
import {featuredProducts, products} from "../src/infrastructure/data/data"
// import {RenderProducts} from "@/app/components/Play"
import UserDashboard from "./components/new";
import Play from "./components/Play";
import UsersPage from "./components/UserPage";
import LogoTransition from "./components/gucci";
import ChatbotLogoTransition from "./components/chatbot";
import ChatbotTransitionClient from "./components/newCHAT";
// import {Counter} from"./components/hello";

export default function Page() {

  return (
    
    <div>
      {/* < ChatbotLogoTransition /> */}
      {/* < LogoTransition /> */}
      < ChatbotTransitionClient />
      {/* <UsersPage /> */}
      {/* < Counter /> */}
      {/* < Play />
      < UserDashboard /> */}
      {/* <RenderProducts products={products} /> */}
     {/* <ProductSection 
        products={featuredProducts} 
        sectionTitle="Featured Products" 
      />  */}
    </div>
      // <UserForm />
      // <ExpensiveFilterComponent />
  );
}
