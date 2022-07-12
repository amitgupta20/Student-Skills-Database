import React from "react";
import "./DoubtBlog.css";
import { Navbar } from "../../Navbar";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const formatDate = (dateString) => {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };
  return new Date(dateString).toLocaleDateString(undefined, options);
};
const DoubtBlogs = () => {
  let location = useLocation();
  //console.log(location);
  const [replybox, setReplybox] = useState(false);
  const [replyPostIndex, setReplyPostIndex] = useState();
  // const [pId, setPId] = useState(null);
  const [replyMsg, setReplyMsg] = useState("");
  const [contentPost, setContentPost] = useState("");
  const [posts, setPosts] = useState();
  const [seenPostIndex, setSeenPostIdx] = useState(-1);
  const [comments, setComments] = useState();
  const [myPosts, setMyPosts] = useState(false);

  const handlePost = (e) => {
    setContentPost(e.target.value);
  };
  const handleComment = (e) => {
    setReplyMsg(e.target.value);
  };

  const handleUpVote = (id, e, pid) => {
    e.preventDefault();
    axios
      .post("https://levelup-lnm.herokuapp.com/student/upVote", {
        cId: id,
      })
      .then((response) => {
        // // setComments(response.data);
        getCommentById(pid);
        // setSeenPostIdx(0);
        setComments(comments);
        // comments.sort(function (x, y) {
        //   return x.upVotes - y.upVotes;

        // });
      });
    // axios
    // .post("https://levelup-lnm.herokuapp.com/student/getCommentById", {
    //   pId: id,
    // })
    // .then((response) => {
    //    setComments(response.data);
    //   // comments.sort(function (x, y) {
    //   //   return x.upVotes - y.upVotes;
    //   // });
    // });
  };

  const getCommentById = (id) => {
    axios
      .post("https://levelup-lnm.herokuapp.com/student/getCommentById", {
        pId: id,
      })
      .then((response) => {
        setComments(response.data);
        // comments.sort(function (x, y) {
        //   return x.upVotes - y.upVotes;
        // });
      });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    let post = {
      email: location.state.email,
      content: contentPost,
    };

    //console.log(post);
    axios
      .post("https://levelup-lnm.herokuapp.com/student/createPost", {
        post,
      })
      .then(({ data }) => {
        // console.log("Inside DATA ", data);

        posts.push(data);
        // console.log(posts);
        setPosts(posts);
        posts.sort(function (x, y) {
          return x.timestamp - y.timestamp;
        });
        setContentPost("");
      });
  };
  const handleCommentSubmit = (id, e) => {
    e.preventDefault();
    let comment = {
      email: location.state.email,
      content: replyMsg,
      pId: id,
    };

    // console.log(comment);
    axios
      .post("https://levelup-lnm.herokuapp.com/student/createComment", {
        comment,
      })
      .then(({ data }) => {
        // console.log("Inside DATA ", data);

        comments.push(data);
        //  console.log(data);
        setComments(comments);
        comments.sort(function (x, y) {
          return x.timestamp - y.timestamp;
        });
        setReplybox(!replybox);
      });
  };
  function getlength(x) {
    if (x.length < 30) {
      x = x + " ";
    }
    // console.log(x);
    return x;
  }

  useEffect(() => {
    if (myPosts) {
      axios
        .post("https://levelup-lnm.herokuapp.com/student/getMyPosts", {
          email: location.state.email,
        })
        .then((response) => {
          //   console.log(response);
          //console.log(response.data);

          setPosts(response.data);
          posts.sort(function (x, y) {
            return x.time - y.time;
          });
          //  setPosts(posts);
        });
    } else {
      axios
        .post("https://levelup-lnm.herokuapp.com/student/getallPost", {
          email: location.state.email,
        })
        .then((response) => {
          //   console.log(response);
          //console.log(response.data);

          setPosts(
            response.data.sort(function (x, y) {
              return x.time - y.time;
            })
          );

          //  setPosts(posts);
        });
    }
  }, [location.state.email, myPosts, posts]);
  return (
    <div id="profileContainer" className="blogs-container">
      <Navbar />
      {/* <h1 className="head">Discussions</h1> */}
      <div className="container">
        <div className="section-title">
          <h2 className="head">Discussions</h2>
        </div>
        <div className="container container-doubtBlog">
          <div className="comment-thread">
            <h3 className="posts-container-head">
              {!myPosts ? "All Posts" : "My Posts"}
            </h3>
            {posts ? (
              posts.map((post, index) => (
                <>
                  <hr className="line-doubt"></hr>
                  <details open className="comment" id="comment-1" key={index}>
                    <a href="#comment-1" className="comment-border-link">
                      <span className="sr-only">Jump to comment-1</span>
                    </a>
                    <summary>
                      <div className="comment-heading">
                        <div className="comment-info">
                          <div className="heading-show-btn ">
                            <p className="comment-author">
                              {getlength(post.content.slice(0, 30)) + "...."}
                              {"<" + post.email + ">"}
                            </p>

                            <button
                              type="button"
                              className="open-close-post"
                              onClick={() => {
                                if (seenPostIndex === -1) {
                                  setSeenPostIdx(index);
                                  getCommentById(post.pId);
                                } else setSeenPostIdx(-1);
                              }}
                            >
                              {" "}
                              {seenPostIndex === index
                                ? "Hide Post"
                                : "Show Post"}
                            </button>
                          </div>
                          <p className="m-0">{formatDate(post.time)}</p>
                        </div>
                      </div>
                    </summary>

                    {seenPostIndex === index && (
                      <div>
                        <div className="comment-body">
                          <p>{post.content}</p>
                          <button
                            type="button"
                            onClick={() => {
                              setReplybox(!replybox);
                              setReplyPostIndex(index);
                            }}
                          >
                            Reply
                          </button>
                          <div>
                            {replybox && index === replyPostIndex ? (
                              <div
                                className="reply-form "
                                id="comment-1-reply-form"
                              >
                                <textarea
                                  placeholder="Reply to comment"
                                  className="posting-comment"
                                  rows="4"
                                  onChange={handleComment}
                                ></textarea>
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    handleCommentSubmit(post.pId, e);
                                  }}
                                >
                                  Submit
                                </button>
                              </div>
                            ) : (
                              <></>
                            )}
                          </div>
                        </div>

                        <h3 className="head">
                          {comments?.length > 0
                            ? "Comments(" + comments?.length + ")"
                            : ""}
                        </h3>

                        <div className="replies">
                          {comments ? (
                            comments.map((comment, index) => (
                              <>
                                <details
                                  open
                                  className="comment"
                                  id="comment-2"
                                  key={index}
                                >
                                  <a
                                    href="#comment-2"
                                    className="comment-border-link"
                                  >
                                    <span className="sr-only">
                                      Jump to comment-2
                                    </span>
                                  </a>

                                  <summary>
                                    <div className="comment-heading">
                                      {/* <div className="comment-voting"> */}
                                      <button
                                        type="button"
                                        onClick={(e) => {
                                          handleUpVote(
                                            comment.cId,
                                            e,
                                            comment.pId
                                          );
                                        }}
                                      >
                                        <span aria-hidden="true">&#9650;</span>
                                        <span className="sr-only">Vote up</span>
                                      </button>

                                      {/* </div> */}
                                      <div className="comment-info">
                                        <span className="comment-author">
                                          {comment.email}
                                        </span>
                                        <p className="m-0">
                                          {comment.upVotes} points &bull;{" "}
                                          {formatDate(comment.time)}
                                        </p>
                                      </div>
                                    </div>
                                  </summary>

                                  <div className="comment-body">
                                    <p>{comment.content}</p>
                                    {/* <button
                              type="button"
                              data-toggle="reply-form"
                              data-target="comment-2-reply-form"
                            >
                              Reply
                            </button>
                            <button type="button">Flag</button>

                            <form
                              method="POST"
                              className="reply-form d-none"
                              id="comment-2-reply-form"
                            >
                              <textarea
                                placeholder="Reply to comment"
                                rows="4"
                              ></textarea>
                              <button type="submit">Submit</button>
                              <button
                                type="button"
                                data-toggle="reply-form"
                                data-target="comment-2-reply-form"
                              >
                                Cancel
                              </button>
                            </form> */}
                                  </div>
                                </details>
                              </>
                            ))
                          ) : (
                            <>Not Mentioned</>
                          )}
                        </div>
                      </div>
                    )}
                  </details>
                </>
              ))
            ) : (
              <>Not Mentioned</>
            )}
          </div>
          <div className="comment-sidebar">
            <div className="sidebar-features">
              <button
                onClick={() => {
                  setMyPosts(!myPosts);
                }}
                className="btn-custom post-btn-margin"
              >
                {myPosts ? "Show All Posts" : "Show My Posts"}
              </button>
              {/* <button>my comments</button> */}
              {/* <h3 className="head">Post </h3> */}

              <div className="reply-form" id="comment-1-reply-form">
                <textarea
                  placeholder="Post Doubts here"
                  rows="4"
                  value={contentPost}
                  className="posting-doubt"
                  onChange={handlePost}
                ></textarea>
                <div className="">
                  <button
                    className="btn-custom align-btn"
                    type="submit"
                    onClick={handleSubmit}
                  >
                    Post
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoubtBlogs;
