import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Navbar from "./pages/Navbar";
import Doctorscard from "./pages/Doctorscard";
import Appoinmentform from "./pages/Appoinmentform";
import Login from "./pages/Login";
import PrivateRoutes from "./pages/PrivateRoutes";
import Adminpage from "./pages/Adminpage";
import Adddoctors from "./pages/Adddoctors";
import Doctorspage from "./pages/Doctorspage";
import Bookedticket from "./pages/Bookedticket";
import Myappoinments from "./pages/Myappoinments";
import Doctorappointments from "./pages/Doctorappointments";
import Updateschedule from "./pages/Updateschedule";
import Adminbooking from "./pages/Adminbooking";
import Availableslots from "./pages/Availableslots";
import Mailfordoc from "./pages/Mailfordoc";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsAndConditions from "./pages/TermsAndCondition";
import Security from "./pages/Security";
import AboutUs from "./pages/AboutUs";




function App() {
  
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/appointment" element={<Appoinmentform />} />
        <Route path="/availableslots" element={<Availableslots/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/doctorss" element={<Doctorscard />} />
        <Route path="/bookedticket" element={<Bookedticket />} />
        
        <Route path="/myappointments" element={<Myappoinments  />} />
        <Route path="/privacy" element={<PrivacyPolicy  />} />
        <Route path="/terms" element={<TermsAndConditions />} />
        <Route path="/security" element={<Security  />} />
        <Route path="/aboutus" element={<AboutUs  />} />

        
 

      
        <Route element={<PrivateRoutes allowedRoles={["Admin"]} />}>
          <Route path="/adminpage" element={<Adminpage />} />
          <Route path="/adddoctors" element={<Adddoctors />} />
          <Route path="/bookings" element={<Doctorspage />} />
          <Route path="/adminbooking" element={<Adminbooking />} />
          <Route path="/mailfordoc" element={<Mailfordoc/>} />
        </Route>

        
        <Route element={<PrivateRoutes allowedRoles={["doctor"]} />}>
          <Route path="/doctorspage" element={<Doctorspage />} />
          <Route path="/doctorbooking" element={<Doctorappointments />} />
          <Route path="/updateschedule" element={<Updateschedule />} />
          
        </Route>
      </Routes>
    </div>
  );
}

export default App;
