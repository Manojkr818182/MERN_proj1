import React from 'react'
import { ThreeCircles } from 'react-loader-spinner'

const Loader1 = () => {
    return (
        <div style={{ height: '90vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <ThreeCircles
                height="100"
                width="100"
                color="orange"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                ariaLabel="three-circles-rotating"
                outerCircleColor="red"
                innerCircleColor="silver"
                middleCircleColor="gold"
            />
        </div>
    )
}

export default Loader1
