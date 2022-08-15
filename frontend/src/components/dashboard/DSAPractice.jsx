import React, { useEffect, useState } from "react";
import Collapsible from "react-collapsible";
import QuestionBank from "../../data/questionBank.json";
import { Navbar } from "../../Navbar";
import { DashboardNavigation } from "../DashboardNavigation";
//import Question from './Question';
// import {QuestionBank} from './questionBank.json'
import "../styles/dsa.scss";
const DSAPractice = (props) => {
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
      <DashboardNavigation username={props.username || "My Account"}/>
      <div className="container">
        <div className="emp-profile">
          <h1 className="head">PRACTICE PROBLEMS</h1>
          <hr className="line-practice-head"></hr>

          {QuestionBank.map((tags, index) => (
            <div key={index + "1"} className="tagsGroup">
              <h2 key={index + "2"} className="innerHeading">
                {tags.title}
              </h2>
              {tags.bank.map((problem, index) => (
                <Collapsible key={index + "3"} trigger={problem.title}>
                  <p key={index + "4"} className="questionsHead">
                    {problem.paragraph}
                  </p>

                  <a
                    key={index + "5"}
                    className="questionsHead"
                    href={problem.link}
                  >
                    <button
                      key={index + "6"}
                      className="form-control btn-success "
                    >
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
