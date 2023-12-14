import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import PostDetail from './PostDetail';
import Loader1 from '../../components/loader/Loader1';

const Post = () => {
    const { user_id } = useParams();
    const [loading, setLoading] = useState(true);
    const [post_data, setPost_data] = useState([])
    useEffect(() => {
        axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${user_id}`).then((res) => {
            if (res.request.status === 200) {
                setPost_data(res.data);
                setTimeout(() => {
                    setLoading(false);
                }, 1000)
            }
        })
    }, [])
    return (
        <>
            {loading &&
                <Loader1 />
            }
            {!loading &&
                <div>
                    {post_data.map((post_data) => (
                        <div style={{ marginBottom: '1px' }} key={post_data.id}>
                            <PostDetail
                                post_detail={post_data}
                            />
                        </div>
                    ))
                    }
                </div>
            }
        </>
    )
}

export default Post
