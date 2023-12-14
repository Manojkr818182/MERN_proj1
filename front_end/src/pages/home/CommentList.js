import React, { useState } from 'react'
import { FaUserCircle } from "react-icons/fa";
import { LuArrowUpDown } from "react-icons/lu";

const CommentList = ({ comments,NestedommentFun }) => {

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
    };
    return (
        <div style={{ height: "350px", overflowY: 'scroll', "marginLeft": "25px" }}>
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
                        <div style={{ display: !showNested[comment._id] && "none" }}>
                            <CommentList comments={comment.comments} />
                        </div>
                    }
                </div>
            ))}
        </div>
    )
}

export default CommentList;
