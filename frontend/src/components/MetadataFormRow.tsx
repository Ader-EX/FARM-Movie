import React from "react";

type Props = {
  title: string;
  children: React.ReactNode;
};

const MetadataFormRow = ({ title, children }: Props) => {
  return (
    <div className="mb-2">
      <label
        htmlFor="name"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {title}
      </label>
      {children}
    </div>
  );
};

export default MetadataFormRow;
