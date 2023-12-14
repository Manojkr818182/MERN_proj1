import React, { useEffect, useState } from 'react'
import axios from 'axios';
import styles from './home.module.css';
import { FcLike } from "react-icons/fc";
import user_logo from '../../assets/user.png'
import { BiSolidUserVoice } from "react-icons/bi";
import { IoMdHeartEmpty } from "react-icons/io";
import Post from './Post';
import authHeader from '../../services/authHandler';
import Swal from 'sweetalert2';
import CommentList from './CommentList';
import Loader1 from '../../components/loader/Loader1';
import { useSelector } from 'react-redux';
import CommentsList from './CommentsList';


const Home = () => {
  const { user } = useSelector((state) => state.userAuth);
  const [loading, setLoading] = useState(true);
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [postList, setPostList] = useState([]);

  const [textComment, setTextComment] = useState('')

  const handleChangeFile = (e) => {
    setFile(e.target.files[0]);
  };
  const submitFun = (e) => {
    e.preventDefault();
    const form_data = new FormData();
    form_data.append('title', title);
    form_data.append('content', content);
    form_data.append('files', file);

    axios.post("http://192.168.0.110:6060/api/createPost", form_data, {
      headers: authHeader()
    }).then((res) => {
      if (res.data.code === 1) {
        Swal.fire({
          icon: "success",
          title: "Post created",
          showConfirmButton: false,
          timer: 1000
        });
        getPosts();
        setFile(null);
        setContent("");
        setTitle('');
      } else {
      }
    })
  }



  const likeFun = (post_id) => {
    let data = { post_id: post_id };
    axios.post("http://192.168.0.110:6060/api/createLikeAction", data, {
      headers: authHeader()
    }).then((res) => {
      if (res.data.code === 1) {
        getPosts();
        //instead of recall Api push user_id into Likes Array
      } else {
      }
    })
  };
  const unLikeFun = (post_id) => {
    let data = { post_id: post_id };
    axios.post("http://192.168.0.110:6060/api/createUnLikeAction", data, {
      headers: authHeader()
    }).then((res) => {
      if (res.data.code === 1) {
        getPosts();
        //instead of recall Api pop user_id from  Likes Array
      } else {
      }
    })
  }

  const commentFun = (e, post_id) => {
    e.preventDefault();
    const data = {
      post_id: post_id,
      comment_text: textComment
    };
    axios.post("http://192.168.0.110:6060/api/createComment", data, {
      headers: authHeader()
    }).then((res) => {
      if (res.data.code === 1) {
        getPosts();
        setTextComment("");
      } else {
      }
    })
  };

  const NestedommentFun = (comment_id, text_msg) => {
    const data = {
      parent_comment_id: comment_id,
      comment_text: text_msg
    };
    axios.post("http://192.168.0.110:6060/api/createNestedComment", data, {
      headers: authHeader()
    }).then((res) => {
      if (res.data.code === 1) {
        getPosts();
      } else {
      }
    })
  };

  const getPosts = () => {
    axios.get("http://192.168.0.110:6060/api/getPostsDetails", {
      headers: authHeader()
    }).then((res) => {
      if (res.data.code === 1) {
        setPostList(res.data.data)
      }
    })
  }

  const mnj = (date) => {
    const post_data = new Date(date);
    return post_data.getHours() + ":" + post_data.getMinutes() + "::" + post_data.getDate() + "/" + (post_data.getMonth() + 1) + "/" + post_data.getFullYear();
  }
  useEffect(() => {
    getPosts();
    setTimeout(() => {
      setLoading(false);
    }, 1500)
  }, [])

  return (
    <>
      {loading &&
        <Loader1 />
      }
      {!loading &&

        <div className={styles.container}>
          <div className={styles.left_container}>
            <Post
              submitFun={submitFun}
              file={file}
              handleChangeFile={handleChangeFile}
              title={title}
              setTitle={setTitle}
              content={content}
              setContent={setContent}
            />
          </div>
          <div className={styles.right_container}>
            {
              postList.map((post) => {
                return (
                  <div key={post._id} className={styles.post}>
                    <div className={styles.heading}>
                      <div className={styles.title}>
                        <span>{post.title}</span>
                      </div>
                      <div className={styles.author}>
                        <div>
                          <span>
                            <BiSolidUserVoice style={{ fontSize: '25px' }} />
                            {post?.author?.first_name} {post?.author?.last_name}
                          </span>
                        </div>
                        <span>
                          {mnj(post.createdAt)}
                        </span>
                      </div>
                    </div>
                    <div className={styles.images}>
                      <img src={`http://192.168.0.110:6060/${post.img_urls[0]}`} />
                    </div>
                    <div className={styles.content}>
                      <p>{post.content}</p>
                    </div>
                    <div className={styles.comments_area}>
                      <CommentList
                        comments={post.comments}
                        NestedommentFun={NestedommentFun}
                      />
                      {/* <CommentsList
                        comments={post.comments}
                        NestedommentFun={NestedommentFun}
                      /> */}
                    </div>
                    <div className={styles.bottom_div}>
                      <form onSubmit={(e) => commentFun(e, post._id)}>
                        <div style={{ display: 'flex', padding: '6px', paddingLeft: "25px" }}>
                          <div>
                            <img src={user_logo} width="40px" height="40px" />
                          </div>
                          <div style={{ width: "60%", paddingLeft: '10px' }}>
                            <input type='text'
                              style={{ backgroundColor: 'whitesmoke' }}
                              name='textComment'
                              required
                              value={textComment}
                              onChange={(e) => setTextComment(e.target.value)}
                            />
                          </div>&nbsp;&nbsp;
                          <div style={{ marginTop: '6px' }}>
                            <button type='submit' >Comment</button> &nbsp;&nbsp;
                            <button type='reset' onClick={() => setTextComment('')}>Clear</button>
                          </div>
                        </div>
                      </form>
                      <div className={styles.actions}>

                        {post?.likes.includes(user?._id) &&
                          <span>
                            <FcLike style={{ fontSize: '25px', cursor: 'pointer' }} onClick={() => unLikeFun(post._id)} />
                            {post?.likes.length}
                          </span>
                        }
                        {!(post?.likes.includes(user?._id)) &&
                          <span><IoMdHeartEmpty style={{ fontSize: '25px', cursor: 'pointer' }} onClick={() => likeFun(post._id)} />
                            {post?.likes.length}
                          </span>
                        }
                      </div>
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>
      }
    </>
  )
}

export default Home
