import React, { useEffect, useState } from 'react'
import Loader1 from '../../components/loader/Loader1';

const About = () => {
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 1000)
    }, [])
    return (
        <>
            {loading &&
                <Loader1 />
            }
            {!loading &&
                <div style={{ display: 'flex', justifyContent: "center", paddingTop: "125px" }}>
                    <span>About page !</span>
                </div>
            }
        </>
    )
};

export default About;