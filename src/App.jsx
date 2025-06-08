import { useEffect, useState } from 'react'
import authService from './appwrite/auth';
import { useDispatch } from 'react-redux';
import { login, logout } from './store/authSlice';
import { Outlet } from 'react-router-dom';
import { Footer, Header } from './component';

import './App.css'

useEffect(() => {
  const timeout = setTimeout(async () => {
    await authService.logout();
    window.location.href = "/login";
  }, 15 * 60 * 1000); // 15 minutes

  const resetTimer = () => {
    clearTimeout(timeout);
  };

  window.addEventListener("mousemove", resetTimer);
  window.addEventListener("keypress", resetTimer);

  return () => {
    window.removeEventListener("mousemove", resetTimer);
    window.removeEventListener("keypress", resetTimer);
  };
}, []);


function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }))
        }
        else {
          dispatch(logout());
        }
      })
      .finally(() => { setLoading(false) })
  }, [])

  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : null
}

export default App
