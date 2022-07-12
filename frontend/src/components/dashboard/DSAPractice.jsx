import React, { useEffect, useState } from "react";
import Collapsible from "react-collapsible";
import QuestionBank from "../../data/questionBank.json";
import { Navbar } from "../../Navbar";
//import Question from './Question';
// import {QuestionBank} from './questionBank.json'
import "../styles/dsa.scss";
const DSAPractice = () => {
  const [questionBank, setQuestionBank] = useState();

  useEffect(() => {
    setQuestionBank(QuestionBank);
  }, []);
  //     let QuestionBank = [ {
  //       "title": "Reverse the array",
  //       "paragraph": "Write a program to reverse an array or string",
  //       "link":"https://www.geeksforgeeks.org/write-a-program-to-reverse-an-array-or-string/ "
  //     },
  //     {"title": "Reverse the array",
  //     "paragraph": "Write a program to reverse an array or string",
  //     "link":"https://www.geeksforgeeks.org/write-a-program-to-reverse-an-array-or-string/ "
  //   }
  // ];
  // console.log(QuestionBank);
  return (
    <div id="profileContainer">
      <Navbar />
      <div className="container">
        <div className="emp-profile">
          <h1 className="head">PRACTICE PROBLEMS</h1>
          <hr className="line-practice-head"></hr>

          {QuestionBank.map((tags, index) => (
            <div className="tagsGroup">
              <h2 key={index} className="innerHeading">
                {tags.title}
              </h2>
              {tags.bank.map((problem, index) => (
                <Collapsible key={index} trigger={problem.title}>
                  <p key={index} className="questionsHead">
                    {problem.paragraph}
                  </p>

                  <a key={index} className="questionsHead" href={problem.link}>
                    <button className="form-control btn-success ">
                      Proceed to problem
                    </button>
                  </a>
                </Collapsible>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DSAPractice;
