import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react"
import Cookies from 'js-cookie';

const Login = () => {
  const routes = useRouter();
  const [details,setDetails] = useState({
    email:"",
    password:""
  });

  const handleInputChange = (e)=>{
    const {value,name} = e.target;
    setDetails(prev=>{
      return {...prev,[name]:value}
    })
  }

  const handleSubmit = async (e)=>{
    e.preventDefault();
    try{
      const payload = {
        method:"POST",
        body:JSON.stringify(details),
        headers:{
          'Content-Type':'application/json'
        }
      }
      
      const URL = '/api/login';
      const response = await fetch(URL,payload);
      const data = await response.json();
      console.log({data});

      if(data.error){
        throw data.error;
      }else{
        Cookies.set('token',data.token);
        // M.toast({html: data.message, classes:'green'});
        routes.push('/profile');
      }
    } catch (error ){
      console.log({error})
      M.toast({html: error, classes:'red'});
      // routes.push('/');
    }
  }

  return (
    <div className="container" >
       <div className="row">
      </div>
      <div className='card' >
      <h4 className='center-align' >Login</h4>
      <form onSubmit={handleSubmit} >
      <div className="row">
        <div className="input-field col s12">
          <input id="email" value={details.email} name='email' onChange={handleInputChange} type="email" className="validate" />
          <label htmlFor="email">Email</label>
        </div>
      </div>
      <div className="row">
        <div className="input-field col s12">
          <input id="password" value={details.password} name='password' onChange={handleInputChange} type="password" className="validate" />
          <label htmlFor="password">Password</label>
        </div>
      </div>
      <Link href='/login' >
      <a ><h5 style={{marginLeft:10,textDecoration:'underline'}} >Dont have an account? Signup</h5></a>
      </Link>
      <br />
      <div className='center-align' >
      <button className="btn waves-effect waves-light #2196f3 blue" type="submit" name="action">Submit
        <i className="material-icons right">send</i>
      </button>
      </div>
      <br />
      </form>
      </div>
      </div>
  )
}

export default Login