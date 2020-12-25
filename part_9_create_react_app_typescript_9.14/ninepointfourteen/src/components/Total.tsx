import React from "react";

interface TotalProps {
    courseParts: number;
}

const Total: React.FC<TotalProps> = ({ courseParts }) => {
  return (
<p>
        Number of exercises{" "}
        {courseParts}
      </p>
  );
};

export default Total;