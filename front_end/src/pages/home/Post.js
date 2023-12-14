import React, { useState } from 'react';
import dummy from '../../assets/dummy.png';
import styles from './post.module.css';

const Post = (props) => {
    const{submitFun, file, handleChangeFile, title, setTitle,content, setContent } = props;

    return (
        <div className={styles.container}>
            <form className={styles.form} onSubmit={submitFun}>
                <div className={styles.picture}>
                    <label>
                        {!file &&
                            <img src={dummy} alt="dummy"  />
                        }
                        {file &&
                            <img src={URL.createObjectURL(file)} alt="main"  />
                        }
                        <input
                            type="file"
                            name="file"
                            onChange={handleChangeFile}
                            accept="image/*"
                        />
                    </label>
                </div>
                <div>
                    <div>
                        <div>
                            <label>Post Title</label>
                        </div>
                        <div>
                            <input type='text'
                                name='title'
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>
                    </div>
                    <div>
                        <div>
                            <label>Post Content</label>
                        </div>
                        <div>
                            <textarea rows="4" cols="56"
                                name='content'
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
                <div>
                    <button type='submit'>SUMBIT</button>
                </div>
            </form>
        </div>
    )
}

export default Post
