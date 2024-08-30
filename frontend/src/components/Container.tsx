import React from "react";
import Navbar from "./Navbar";

type Props = {
  children: React.ReactNode;
};

const Container = ({ children }: Props) => {
  return (
    <>
      <Navbar />
      <main className="container text-white  mx-auto my-4 p-8 ">
        {children}
      </main>
    </>
  );
};

export default Container;
