import React, { useState } from 'react'
import { FaUserCircle } from "react-icons/fa";
import { LuArrowUpDown } from "react-icons/lu";

const CommentsList = ({ comments, NestedommentFun }) => {
    const [showNested, setShowNested] = useState({});
    const [showBox, setShowBox] = useState({});
    const [text_cmt, setText] = useState('');

    const toggleNested = (comment_id) => {
        setShowNested({ ...showNested, [comment_id]: !showNested[comment_id] });
    };

    const openBox = (comment_id) => {
        setShowBox({ ...showBox, [comment_id]: true });
    };

    const closeBox = (comment_id) => {
        setShowBox({ ...showBox, [comment_id]: false });
    };

    const createCommentFun = (e, comment_id) => {
        e.preventDefault();
        NestedommentFun(comment_id, text_cmt);
        closeBox(comment_id);
        setText('')
        // toggleNested(comment_id);
        
    };
    return (
        <div style={{ height: "500px", overflowY: 'scroll', "marginLeft": "25px" }}>
            {comments?.map((comment) => (
                <div style={{ marginBottom: "10px", backgroundColor: "skyblue", padding: '10px', borderRadius: "5px" }} key={comment._id}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div>
                            <span><FaUserCircle style={{ fontSize: '22px', color: 'blue' }} /> {comment?.author?.first_name} {comment?.author?.last_name}</span>
                        </div>
                        <div>
                            {comment?.comments?.length > 0 &&
                                <span><LuArrowUpDown style={{ fontSize: '25px', cursor: 'pointer' }} onClick={() => toggleNested(comment._id)} /></span>
                            }
                        </div>
                    </div>
                    <div>
                        <span>{comment.comment_text}</span>
                    </div>
                    <div>
                        <form onSubmit={(e) => createCommentFun(e, comment._id)}>
                            <div style={{ display: !showBox[comment._id] && "none" }}>
                                <input
                                    type='text'
                                    name='text_cmt'
                                    value={text_cmt}
                                    required
                                    onChange={(e) => setText(e.target.value)}
                                />
                            </div>
                            <button type='submit' style={{ display: !showBox[comment._id] && "none" }}>SEND</button>
                        </form>
                        <button type='reset' onClick={() => openBox(comment._id)} style={{ display: showBox[comment._id] && "none" }}>Reply</button>
                    </div>
                    {comment.comments && comment.comments.length > 0 &&
                        <div style={{ marginLeft: '50px', backgroundColor: "orange", padding: '15px', display: !showNested[comment._id] && "none" }}>
                            {comment.comments?.map((first_comment) => (
                                <div style={{ marginBottom: "10px", backgroundColor: "skyblue", padding: '10px', borderRadius: "5px" }} key={first_comment._id}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <div>
                                            <span><FaUserCircle style={{ fontSize: '22px', color: 'blue' }} /> {first_comment?.author?.first_name} {first_comment?.author?.last_name}</span>
                                        </div>
                                        <div>
                                            {first_comment?.comments?.length > 0 &&
                                                <span><LuArrowUpDown style={{ fontSize: '25px', cursor: 'pointer' }} onClick={() => toggleNested(first_comment._id)} /></span>
                                            }
                                        </div>
                                    </div>
                                    <div>
                                        <span>{first_comment.comment_text}</span>
                                    </div>
                                    <div>
                                        <form onSubmit={(e) => createCommentFun(e, first_comment._id)}>
                                            <div style={{ display: !showBox[first_comment._id] && "none" }}>
                                                <input
                                                    type='text'
                                                    name='text_cmt'
                                                    value={text_cmt}
                                                    required
                                                    onChange={(e) => setText(e.target.value)}
                                                />
                                            </div>
                                            <button type='submit' style={{ display: !showBox[first_comment._id] && "none" }}>SEND1</button>
                                        </form>
                                    </div>
                                    {first_comment.comments && first_comment.comments.length > 0 &&
                                        <div style={{ marginLeft: '50px', backgroundColor: "blue", padding: '15px' }}>
                                            {first_comment.comments?.map((second_comment) => (
                                                <div style={{ marginBottom: "10px", backgroundColor: "skyblue", padding: '10px', borderRadius: "5px" }} key={second_comment._id}>
                                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                        <div>
                                                            <span><FaUserCircle style={{ fontSize: '22px', color: 'blue' }} /> {second_comment?.author?.first_name} {second_comment?.author?.last_name}</span>
                                                        </div>
                                                        <div>
                                                            {second_comment?.comments?.length > 0 &&
                                                                <span><LuArrowUpDown style={{ fontSize: '25px', cursor: 'pointer' }} onClick={() => toggleNested(second_comment._id)} /></span>
                                                            }
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <span>{second_comment.comment_text}</span>
                                                    </div>
                                                    <div>
                                                        <form onSubmit={(e) => createCommentFun(e, second_comment._id)}>
                                                            <div style={{ display: !showBox[second_comment._id] && "none" }}>
                                                                <input
                                                                    type='text'
                                                                    name='text_cmt'
                                                                    value={text_cmt}
                                                                    required
                                                                    onChange={(e) => setText(e.target.value)}
                                                                />
                                                            </div>
                                                            <button type='submit' style={{ display: !showBox[second_comment._id] && "none" }}>SEND2</button>
                                                        </form>
                                                        <button type='reset' onClick={() => openBox(second_comment._id)} style={{ display: showBox[second_comment._id] && "none" }}>Reply</button>
                                                    </div>
                                                    {second_comment.comments && second_comment.comments.length > 0 &&
                                                        <div style={{ marginLeft: '50px', backgroundColor: "blue", padding: '15px' }}>
                                                            {second_comment.comments?.map((third_comment) => (
                                                                <div style={{ marginBottom: "10px", backgroundColor: "skyblue", padding: '10px', borderRadius: "5px" }} key={third_comment._id}>
                                                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                                        <div>
                                                                            <span><FaUserCircle style={{ fontSize: '22px', color: 'blue' }} /> {third_comment?.author?.first_name} {third_comment?.author?.last_name}</span>
                                                                        </div>
                                                                        <div>
                                                                            {third_comment?.comments?.length > 0 &&
                                                                                <span><LuArrowUpDown style={{ fontSize: '25px', cursor: 'pointer' }} onClick={() => toggleNested(third_comment._id)} /></span>
                                                                            }
                                                                        </div>
                                                                    </div>
                                                                    <div>
                                                                        <span>{third_comment.comment_text}</span>
                                                                    </div>
                                                                    <div>
                                                                        <form onSubmit={(e) => createCommentFun(e, second_comment._id)}>
                                                                            <div style={{ display: !showBox[second_comment._id] && "none" }}>
                                                                                <input
                                                                                    type='text'
                                                                                    name='text_cmt'
                                                                                    value={text_cmt}
                                                                                    required
                                                                                    onChange={(e) => setText(e.target.value)}
                                                                                />
                                                                            </div>
                                                                            <button type='submit' style={{ display: !showBox[second_comment._id] && "none" }}>SEND</button>
                                                                        </form>
                                                                        <button type='reset' onClick={() => openBox(second_comment._id)} style={{ display: showBox[first_comment._id] && "none" }}>Reply</button>
                                                                    </div>

                                                                </div>
                                                            ))}
                                                        </div>
                                                    }
                                                </div>
                                            ))}
                                        </div>
                                    }
                                </div>
                            ))}
                        </div>
                    }
                </div>
            ))}
        </div>
    )
}


export default CommentsList
