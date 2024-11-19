import React, { useState } from "react";
import MainContent from "./components/MainContent";
import Profile from "./components/Profile";
import './style.css'
import Sidebar from "./components/Sidebar";
import Portfolio from "./pages/Portfolio";


const App = () => {
  const [profileData, setProfileData] = useState(null);



  return (
    <div className="app">
      <Portfolio/>
      {/* <Sidebar/>
      <MainContent setProfileData={setProfileData} />
      <Profile profileData={profileData} /> */}
    </div>
  );
};

export default App;
