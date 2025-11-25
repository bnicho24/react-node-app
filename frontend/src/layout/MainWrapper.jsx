import React, { useEffect } from 'react'
import Header from './Header'
import Sidebar from './Sidebar'
import PageContainer from './PageContainer'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


const MainWrapper = () => {
    const navigate = useNavigate();
    useEffect(() => {
    let timeout;

    const resetTimer = () => {

      if (timeout) clearTimeout(timeout);

      timeout = setTimeout(() => {
        localStorage.clear();
        toast.error("Session expired due to inactivity. Please log in again."); 
        navigate("/login");
      }, 5 * 60 * 1000);
    };

    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("keydown", resetTimer);
    window.addEventListener("click", resetTimer);

    resetTimer();

    return () => {
      clearTimeout(timeout);
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("keydown", resetTimer);
      window.removeEventListener("click", resetTimer);
    };
  }, [navigate]);
  
  return (
   <>
    <div className="container-fluid p-0">
        <Header />
        <div className="main-layout">
            <div className='d-flex'>
                <div className='col-lg-2'>
                    <Sidebar />
                </div>
                <div className='col-lg-10'>
                    <PageContainer />
                </div>
            </div>

        </div>
   </div>
   </>
  )
}

export default MainWrapper