import React from "react";
type Props = {
  title: string;
  children: React.ReactNode;
};
const ActorSelector = ({ title, children }: Props) => {
  return (
    <div className="md:w-1/2 sm:w-full">
      <div className=" ">
        <label htmlFor="years" className="block mb-2 text-lg font-medium">
          <h2>{title}</h2>
        </label>
        {children}
      </div>
    </div>
  );
};

export default ActorSelector;
