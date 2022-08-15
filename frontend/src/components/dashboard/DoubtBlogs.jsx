import React from "react";
import "./DoubtBlog.css";
import { Navbar } from "../../Navbar";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { DashboardNavigation } from "../DashboardNavigation";
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
const DoubtBlogs = (props) => {
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
      .post("http://localhost:2000/student/upVote", {
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
    // .post("http://localhost:2000/student/getCommentById", {
    //   pId: id,
    // })
    // .then((response) => {
    //    setComments(response.data);
    //   // comments.sort(function (x, y) {
    //   //   return x.upVotes - y.upVotes;
    //   // });
    // });
  };
  const doubtSolved = async (email, postId) => {
    await axios.post("http://localhost:2000/student/solvedDoubt", {
      email: email,
      postId: postId,
    });
    setSeenPostIdx(-1);
    axios
      .post("http://localhost:2000/student/getMyPosts", {
        email: props.email || location.state.email,
      })
      .then((response) => {
        //   console.log(response);
        //console.log(response.data);
        let postss = response.data;
        postss.reverse();
        setPosts(postss);
        //  setPosts(posts);
      });
    console.log(posts);
    setComments([]);
  };
  const getCommentById = (id) => {
    axios
      .post("http://localhost:2000/student/getCommentById", {
        pId: id,
      })
      .then((response) => {
        let commentss = response.data;

        commentss.sort(function (x, y) {
          return y.upVotes - x.upVotes;
        });
        setComments(commentss);
        // comments.sort(function (x, y) {
        //   return x.upVotes - y.upVotes;
        // });
      });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    let post = {
      email: props.email || location.state.email,
      content: contentPost,
    };

    //console.log(post);
    axios
      .post("http://localhost:2000/student/createPost", {
        post,
      })
      .then(({ data }) => {
        // console.log("Inside DATA ", data);
        let postss = posts;
        postss.unshift(data);
        // posts.push(data);
        // console.log(posts);
        setPosts(postss);
        // posts.sort(function (x, y) {
        //   return x.timestamp - y.timestamp;
        // });
        setContentPost("");
      });
  };
  const handleCommentSubmit = (id, e) => {
    e.preventDefault();
    let comment = {
      email: props.email || location.state.email,
      content: replyMsg,
      pId: id,
    };

    // console.log(comment);
    axios
      .post("http://localhost:2000/student/createComment", {
        comment,
      })
      .then(({ data }) => {
        let commentss = comments;
        commentss.push(data);

        commentss.sort(function (x, y) {
          return y.upVotes - x.upVotes;
        });
        setComments(commentss);
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
        .post("http://localhost:2000/student/getMyPosts", {
          email: props.email || location.state.email,
        })
        .then((response) => {
          //   console.log(response);
          //console.log(response.data);
          let postss = response.data;
          postss.reverse();
          setPosts(postss);
          //  setPosts(posts);
        });
    } else {
      axios
        .post("http://localhost:2000/student/getallPost", {
          email: props.email || location.state.email,
        })
        .then((response) => {
          //   console.log(response);
          //console.log(response.data);
          let postss = response.data;
          postss.reverse();
          setPosts(postss);
          //  setPosts(posts);
        });
    }
  }, [location.state.email, props.email, myPosts, posts]);
  return (
    <div id="profileContainer" className="blogs-container">
      <DashboardNavigation username={props.username || "My Account"} />
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
              posts.length > 0 ? (
                posts.map((post, index) => (
                  <>
                    <hr key={index + "1"} className="line-doubt"></hr>
                    <details
                      open
                      className="comment"
                      id="comment-1"
                      key={index + "2"}
                    >
                      <a key={index + "3"} href="#comment-1" className="comment-border-link">
                        <span key={index + "4"} className="sr-only">Jump to comment-1</span>
                      </a>
                      <summary key={index + "5"}>
                        <div className="comment-heading" key={index + "6"}>
                          <div className="comment-info" key={index + "7"}>
                            <div className="heading-show-btn " key={index + "8"}>
                              <p className="comment-author" key={index + "9"}>
                                {getlength(post.content.slice(0, 30)) + "...."}
                                {"<" + post.email + ">"}
                                {post.isSolved ? "  ---[Solved]---" : ""}
                              </p>

                              <button
                                type="button"
                                className="open-close-post"
                                key={index + "10"}
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
                            <p className="date-posts">
                            key={index + "11"}
                              {formatDate(post.time)}
                            </p>
                          </div>
                        </div>
                      </summary>

                      {seenPostIndex === index && (
                        <div key={index + "12"}>
                          <div className="comment-body" key={index + "13"}>
                            <div className="post-data-container" key={index + "14"}>
                              <p key={index + "15"}>{post.content}</p>
                            </div>

                            <button
                              key={index + "16"}
                              type="button"
                              onClick={() => {
                                setReplybox(!replybox);
                                setReplyPostIndex(index);
                              }}
                            >
                              Reply
                            </button>
                            <div key={index + "17"}>
                              {replybox && index === replyPostIndex ? (
                                <div
                                key={index + "18"}
                                  className="reply-form "
                                  id="comment-1-reply-form"
                                >
                                  <textarea
                                    key={index + "19"}
                                    placeholder="Reply to comment"
                                    className="posting-comment"
                                    rows="4"
                                    onChange={handleComment}
                                  ></textarea>
                                  <button
                                    key={index + "20"}
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

                          <h3 key={index + "21"} className="head">
                            {comments?.length > 0
                              ? "Comments(" + comments?.length + ")"
                              : ""}
                          </h3>

                          <div key={index + "22"} className="replies">
                            {comments ? (
                              comments.map((comment, index) => (
                                <>
                                  <details
                                    open
                                    className="comment"
                                    id="comment-2"
                                    key={index + "23"}
                                  >
                                    <a
                                      key={index + "24"}
                                      href="#comment-2"
                                      className="comment-border-link"
                                    >
                                      <span key={index + "25"} className="sr-only">
                                        Jump to comment-2
                                      </span>
                                    </a>

                                    <summary key={index + "26"}>
                                      <div key={index + "27"} className="comment-heading">
                                        {/* <div className="comment-voting"> */}
                                        <button
                                          key={index + "28"}
                                          type="button"
                                          onClick={(e) => {
                                            handleUpVote(
                                              comment.cId,
                                              e,
                                              comment.pId
                                            );
                                          }}
                                        >
                                          <span key={index + "29"} aria-hidden="true">
                                            &#9650;
                                          </span>
                                          <span key={index + "30"} className="sr-only">
                                            Vote up
                                          </span>
                                        </button>

                                        {/* </div> */}
                                        <div key={index + "31"} className="comment-info">
                                          <p key={index + "32"} className="comment-author">
                                            {comment.email}
                                          </p>
                                          {myPosts && !post.isSolved && (
                                            <button
                                            key={index + "33"}
                                              type="button"
                                              className="open-close-post  btn-warning"
                                              onClick={() =>
                                                doubtSolved(
                                                  comment.email,
                                                  post._id
                                                )
                                              }
                                            >
                                              Accept Solution
                                            </button>
                                          )}
                                          <p className="m-0 comment-below-head" key={index + "34"}>
                                            {comment.upVotes} points &bull;{" "}
                                            {formatDate(comment.time)}
                                          </p>
                                        </div>
                                      </div>
                                    </summary>

                                    <div className="comment-body" key={index + "35"}>
                                      <p key={index + "36"}>{comment.content}</p>
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
                <>
                  <hr className="line-doubt"></hr>
                  <p  className="text-center posts-responce">No Posts Found</p>
                </>
              )
            ) : (
              <>
                <hr className="line-doubt"></hr>

                <p className="text-center posts-responce">Loading</p>
              </>
            )}
          </div>
          <div className="comment-sidebar">
            <div className="sidebar-features">
              <button
                onClick={() => {
                  setMyPosts(!myPosts);
                  setSeenPostIdx(-1);
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
