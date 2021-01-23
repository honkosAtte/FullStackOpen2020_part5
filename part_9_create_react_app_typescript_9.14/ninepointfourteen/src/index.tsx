import React from "react";
import ReactDOM from "react-dom";

import Header from './components/Header';
import Content from './components/Content';
import Total from './components/Total';

// new types
interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartBaseExtension extends CoursePartBase {
  description: string;
}

interface CoursePartOne extends CoursePartBaseExtension {
  name: "Fundamentals";
}

interface CoursePartTwo extends CoursePartBase {
  name: "Using props to pass data";
  groupProjectCount: number;
}

interface CoursePartThree extends CoursePartBaseExtension {
  name: "Deeper type usage";
  exerciseSubmissionLink: string;
}

interface CoursePartFour extends CoursePartBaseExtension {
  name: "My own type";
  exerciseSubmissionLink: string;
  myOwnProperty: string;
}


export type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree | CoursePartFour;

const App: React.FC = () => {
  const courseName = "Half Stack application development";

// this is the new coursePart variable
const courseParts: CoursePart[] = [
  {
    name: "Fundamentals",
    exerciseCount: 10,
    description: "This is an awesome course part"
  },
  {
    name: "Using props to pass data",
    exerciseCount: 7,
    groupProjectCount: 3
  },
  {
    name: "Deeper type usage",
    exerciseCount: 14,
    description: "Confusing description",
    exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev"
  },
  {
    name: "My own type",
    exerciseCount: 114,
    description: "TypeScript is wonderful",
    exerciseSubmissionLink: "www.mystuff.com",
    myOwnProperty: "Hello World"
  }
];

  return (
    <div>
      <Header name={courseName} />
      <Content courseParts={courseParts}/>
      <Total courseParts={courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}/>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
