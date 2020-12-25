import React from "react";

interface Part {
    name: string;
    exerciseCount: number;
}

interface ContentProps {
    courseParts : Part[];
}

const Content: React.FC<ContentProps> = ( {courseParts}: ContentProps ) => {
  return (
      <>
      {courseParts.map(p => <p key={p.name} >{p.name} {p.exerciseCount}</p>)}
      </>
  );
};

export default Content;