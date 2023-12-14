import axios from 'axios';
import React, { useEffect, useState } from 'react'
import UserDetali from './UserDetali';
import { useNavigate } from 'react-router-dom';
import Loader1 from '../../components/loader/Loader1';

const User = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [user_data, setUser_data] = useState([]);

    const viewPostFun =(id) =>{
        navigate(`/post/${id}`)
    };


    useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/users').then((res) => {
            if (res.request.status === 200) {
                setUser_data(res.data);
                setLoading(false);
            }
        })
    }, []);
    return (
        <>
        {loading &&
          <Loader1 />
        }
        {!loading &&
        <div>
            {user_data.map((user_detail) => (
                <div style={{ marginBottom: '1px' }} key={user_detail.id}>
                    <UserDetali
                        user_detail={user_detail}
                        viewPostFun={viewPostFun}
                    />
                </div>
            ))
            }
        </div>
         }
         </>
    )
}

export default User
