import React from "react";
import Part from './Part';
import { CoursePart } from '../index';


// interface Part {
//     name: string;
//     exerciseCount: number;
// }

// interface ContentProps {
//     courseParts : Part[];
// }

const Content: React.FC<{ courseParts: CoursePart[]}> = ( {courseParts} ) => {
  return (
      <>
      {courseParts.map(p => <Part key={p.name} part={p}/>)}
      </>
  );
};

export default Content;