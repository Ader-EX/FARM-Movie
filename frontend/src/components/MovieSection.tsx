import React from "react";

type props = {
  title: string;
  description: string;
  children: React.ReactNode;
};

const MovieSection = ({ title, description, children }: props) => {
  return (
    <section className="border-2 rounded-xl border-border-black bg-secondary-black p-6 text-start mr-4 mb-2">
      <div className="">
        <h1 className="font-semibold text-2xl text-primary-blue">{title}</h1>
        <p className="mb-4 text-opacity-90 text-white">{description}</p>
      </div>

      <div>{children}</div>
    </section>
  );
};

export default MovieSection;
