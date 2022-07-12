import React, { useEffect, useState } from "react";
import Collapsible from "react-collapsible";
import QuestionBank from "../../data/daily.json";
import { Navbar } from "../../Navbar";
//import Question from './Question';
// import {QuestionBank} from './questionBank.json'
import "../styles/dsa.scss";


function msToTime(s) {

  // Pad to 2 or 3 digits, default is 2
  function pad(n, z) {
    z = z || 2;
    return ('00' + n).slice(-z);
  }

  var ms = s % 1000;
  s = (s - ms) / 1000;
  var secs = s % 60;
  s = (s - secs) / 60;
  var mins = s % 60;
  var hrs = (s - mins) / 60;

  return pad(hrs) + ':' + pad(mins) + ':' + pad(secs) + '.' + pad(ms, 3);
}

const DailyProblems = () => {
  const [questionBank, setQuestionBank] = useState();

  useEffect(() => {
    setQuestionBank(QuestionBank);
  }, []);

  return (
    <div id="profileContainer">
      <Navbar />
      <div className="container">
        <div className="emp-profile">
          <h1 className="head">Daily Problems</h1>
          <hr className="line-practice-head"></hr>

          {QuestionBank.map((_pops, index) => (
            <div className="tagsGroup">
              {/* <h2 key={index} className="innerHeading">
                {_pops.title}
              </h2> */}
                 


              {_pops.bank.map((problem, index) => (
              <div>
              
                   { Date.now() > problem.date && Date.now() < problem.date + 86400000 ?
                              <div>
                                <h2> TODAY'S PROBLEM </h2>
                              <Collapsible key={index} trigger={problem.title}>
                                <a key={index} className="questionsHead" href={problem.link}>
                                  <button className="form-control btn-success ">
                                    Proceed to problem
                                  </button>
                                </a>
                              </Collapsible>
                              <h2> OLDER PROBLEMS </h2>
                              </div>
                              :  

                                
                                  Date.now() > problem.date  ?
                                  <div>
                                  <Collapsible key={index} trigger={problem.title}>
                                    <a key={index} className="questionsHead" href={problem.link}>
                                      <button className="form-control btn-success ">
                                        Proceed to problem
                                      </button>
                                    </a>
                                  </Collapsible>
                                  </div>
                                  : 
                                    null
                                                   
                    }
                  
              
              </div>
                        ))}




            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DailyProblems
;
