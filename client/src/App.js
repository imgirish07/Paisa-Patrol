import Signup from "./components/Signup";
import Login from "./components/Login";
import Home from "./components/Home";
import Navbar from './components/Navbar';
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import About from "./components/About";
import ContactUs from "./components/ContactUs";
import Dashboard from "./components/Dashboard";
import ContactDetails from "./components/ContactDetails";
import AddExpense from "./components/AddExpense";
import ContactList from "./components/ContactList";
import History from "./components/History";
import DashContent from "./components/DashContent";
import AnthropicAI from "./components/AnthropicAI";
import ForgotPassword from "./components/ForgotPassword";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            {/* <Route path="about" element={<About />} /> */}
            <Route path="contact-us" element={<ContactUs />} />
            <Route path="signup" element={<Signup />} />
            <Route path="login" element={<Login />} />
            <Route path="forgotpassword" element={<ForgotPassword />} />
            <Route path="dashboard" element={<Dashboard />}>
              <Route path="dashcontent" element={<DashContent />} />
              <Route path="addexpense" element={<AddExpense />} />
              <Route path="contacts" element={<ContactList />} />
              <Route path="contactdetails" element={<ContactDetails />} />
              <Route path="history" element={<History />} />
              <Route path="assistant" element={< AnthropicAI />} />
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;