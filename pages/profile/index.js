import { useRouter } from 'next/router';
import React from 'react'
import Cookies from 'js-cookie';

const Profile = () => {
  const router =  useRouter();
  
  const handleLogout = async (e)=>{
    e.preventDefault();
    try{
      const response = await fetch('/api/logout');
      const data = await response.json();
      console.log({logout:data});
      if(data.error) throw data.error;
      Cookies.remove('token');
      router.push('/login');
    } catch (error ){
        M.toast({html: error, classes:'red'});
    }
  }
  return (
    <div className='container' >
      <h5 className='center-align'>Profile</h5>
      <br />
      <div className='center-align' >
      <button className="btn waves-effect waves-light #2196f3 blue" type="submit" onClick={handleLogout} >Logout
        <i className="material-icons right">send</i>
      </button>
      </div>
    </div>
  )
}

export default Profile