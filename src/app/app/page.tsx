import Footer from "@/components/shared/footer";
import { NavBar } from "@/components/shared/navbar";
import React from "react";

const App = () => {
  return (
    <>
      <NavBar isApp={true} />
      <div className="container mx-auto ">
        <div className="mx-auto grid max-w-7xl  grid-cols-1 gap-6 p-3 md:p-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 "></div>
      </div>
      {/* <Footer/> */}
    </>
  );
};

export default App;
