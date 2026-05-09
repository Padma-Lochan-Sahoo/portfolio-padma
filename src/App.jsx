import React, { useState } from "react";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/layout/Navbar";
import CustomCursor from "./components/common/CustomCursor";
import IntroAnimation from "./components/common/IntroAnimation";
import Home from "./pages/Home";

const App = () => {
  const [introDone, setIntroDone] = useState(false);

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} gutter={8} />
      {!introDone && <IntroAnimation onFinish={() => setIntroDone(true)} />}
      {introDone && (
        <>
          <CustomCursor />
          <Navbar />
          <Home />
        </>
      )}
    </>
  );
};

export default App;
