// app/page.tsx
import UserForm from "./components/user";  // adjust path if needed
import ExpensiveFilterComponent from "./components/special";
// import ProductSection from "./components/ProductSection";
import {featuredProducts, products} from "../src/infrastructure/data/data"
// import {RenderProducts} from "@/app/components/Play"
import UserDashboard from "./components/new";
import Play from "./components/Play";
import UsersPage from "./components/UserPage";
import LogoTransition from "./components/gucci";
import ChatbotLogoTransition from "./components/chatbot";
import ChatbotTransitionClient from "./components/newCHAT";
import GSAPAnimationPage from "./components/animateWithGsap";
// import Try from "./components/code";
import TimelineDemo from "./components/timelineDemo";
import ChatBot from "./components/keepchatbot";
// import {Counter} from"./components/hello";
import MyComponent from "./components/code";
import TestComponent from "./components/code";
import CommentForm from "./components/commentFrom";
import { CommentsComponent } from "./components/comments";
import { CommentForms } from "./components/newForm";
import ContactForm from "./components/hello";
import ModernContactForm from "./components/modernForm";
import LiveSearch from "./components/liveSearch";
import AddToCart from "./components/shoppingCart";
// import { CommentList } from "./components/comments";
import ProductSection from "@/app/components/ProductSection2"
import ShoppingCartComponent from "./components/shoppingCart2";
import TryMyself from "./components/animateWithGsap";
import SVGPathComponent from "./components/svg";
import ChatBot2  from "./components/ctabot";
import Parent from "./components/parent";
import {FlexDirectionDemo} from "./components/design";
import SimpleFlexDemo from "./components/design2";
import TailwindMasterComponent from "./components/tailwind";
import {HELLO} from "@/app/components/stylenow"
import {ChatbotUI} from "@/app/components/simpleChatbot"
import AdvancedChatbot from "./components/advanceChatBot";
import TimerExample from "./components/timer";
import InteractiveNavbar from "./components/myRobot";



export default function Page() {
  const featuredProducts = [
    { 
      id: 1, 
      name: "MacBook Pro", 
      price: 1299, 
      image: "/macbook.jpg",
      description: "Apple M3 chip, 16GB RAM, 512GB SSD",
      rating: 4.8  // Add this
    },
    { 
      id: 2, 
      name: "iPhone 15", 
      price: 799, 
      image: "/iphone.jpg",
      description: "Dynamic Island, 48MP camera, USB-C",
      rating: 4.7  // Add this
    },
    { 
      id: 3, 
      name: "iPad Air", 
      price: 599, 
      image: "/ipad.jpg",
      description: "M1 chip, Liquid Retina display",
      rating: 4.6  // Add this
    }
  ]

  return (

    <div>
      <InteractiveNavbar />
      <TimerExample />
      <AdvancedChatbot />
      <ChatbotUI />
      <HELLO />
      <TailwindMasterComponent />
      <FlexDirectionDemo />
      <Parent />
      <SimpleFlexDemo />
      {/* <ChatBot2 /> */}
      {/* < ChatBot /> */}
      {/* < SVGPathComponent /> */}
      {/* <TimelineDemo /> */}
      {/* < LogoTransition /> */}
      {/* <ShoppingCartComponent /> */}
       {/* <div>
      <ProductSection 
        sectionTitle="Top Selling Electronics" 
        products={featuredProducts}
      />
    </div> */}
      {/* <AddToCart />
      <LiveSearch />
      < ModernContactForm /> */}
      {/* < ContactForm /> */}
      {/* < CommentForm /> */}
      {/* < CommentForm /> */}
      {/* <CommentsComponent /> */}
      {/* < CommentList /> */}
      {/* < CommentForm />  */}
      {/* <TestComponent /> */}
      {/* <MyComponent /> */}
      {/* < MyWork />
      <ChatBot /> */}
      {/* < TimelineDemo />  */}
      {/* < Try /> */}
      {/* < TryMyself />  */}
      {/* < ChatbotLogoTransition /> */}
      {/* < LogoTransition /> */}
      {/* < ChatbotTransitionClient /> */}
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


// // app/page.tsx
// import SourceLogo from "./components/animationSourceDestination.tsx/SourceLogo";
// import Destination from "./components/animationSourceDestination.tsx/Destination";
// import LogoAnimator from "./components/animationSourceDestination.tsx/LogoAnimator";

// export default function Home() {
//   return (
//     <div>
//       {/* NAVBAR - Logo starts here */}
//       <header style={{ 
//         position: 'fixed', 
//         top: 0, 
//         width: '100%', 
//         padding: '20px',
//         backgroundColor: 'white',
//         zIndex: 100 
//       }}>
//         <SourceLogo />
//       </header>

//       {/* ANIMATION CONTROLLER */}
//       <LogoAnimator />

//       {/* SPACER (so we can scroll) */}
//       <div style={{ height: '100vh' }}></div>

      {/* DESTINATION SECTION - Logo ends here */}
//       <section 
//         id="destination-section"
//         style={{ 
//           height: '500px', 
//           backgroundColor: '#f0f0f0',
//           position: 'relative' 
//         }}
//       >
//         <h2>Destination Section</h2>
//         <Destination />
//       </section>
//     </div>
//   );
// }