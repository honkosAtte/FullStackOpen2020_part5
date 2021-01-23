import React from "react";
import { CoursePart } from '../index';

const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };


const Part: React.FC<{part: CoursePart}> = (  { part }  ) => {

switch (part.name) {
    case "Fundamentals":
        return <div><b>Name: {part.name} </b>Description: {part.description} Exercisecount: {part.exerciseCount}</div>
    case "Using props to pass data":
        return <div><b>Name: {part.name} </b>  Exercise count: {part.exerciseCount} Group project count: {part.groupProjectCount}</div>
    case "Deeper type usage":
        return <div><b>Name: {part.name} </b> Description: {part.description} Exercisecount: {part.exerciseCount} Exec submissionlink: {part.exerciseSubmissionLink}</div>
    case "My own type":
        return <div><b>Name: {part.name} </b> Description: {part.description} Exercisecount: {part.exerciseCount} Exec submissionlink: {part.exerciseSubmissionLink} My Own property: {part.myOwnProperty}</div>
    default: 
    return assertNever(part)
}
};

export default Part;