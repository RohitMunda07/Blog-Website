import React from 'react'

function Container({children}) {

    return <div className='w-full max-w-7xl mx-auto px-4'>{children}</div>;
}

export default Container

// by changing the width & height of container I can adjust the component's width & height inside the container