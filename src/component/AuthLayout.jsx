// import React, { useEffect, useState } from 'react'
// import { useSelector } from 'react-redux'
// import { useNavigate } from 'react-router-dom'

// export default function AuthLayout({ children, authentication = true }) {
//     const [loader, setLoader] = useState(true)
//     const navigate = useNavigate();
//     const authStatus = useSelector(state => state.auth.status)

//     useEffect(() => {
//         // it will run when the user does not pass authentication
//         if (authentication && authStatus !== authentication) {
//             navigate("/login")
//         }

//         // it will run when the user do pass authentication
//         else if (!authentication && authStatus !== authentication) {
//             navigate("/")
//         }

//         setLoader(false)
//     }, [navigate, authentication, authStatus])
//     return loader ? <h1>Loading..</h1> : {children}
// }

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function AuthLayout({ children, authentication = true }) {
    const [loader, setLoader] = useState(true);
    const navigate = useNavigate();
    const authStatus = useSelector(state => state.auth.status);

    useEffect(() => {
        if (authentication && !authStatus) {
            // If authentication is required AND user is NOT logged in, redirect to login
            navigate("/login");
        } else if (!authentication && authStatus) {
            // If authentication is NOT required AND user IS logged in, redirect to home (or another appropriate page)
            navigate("/");
        }
        setLoader(false);
    }, [navigate, authentication, authStatus]);

    return loader ? <h1>Loading..</h1> : <>{children}</>;
}