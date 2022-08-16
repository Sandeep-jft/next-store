import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react"

const Signup = () => {
  const routes = useRouter();
  const [details,setDetails] = useState({
    name:'',
    password:'',
    email:''
  });

  const handleSubmit = async (e)=>{
    e.preventDefault();
    console.log('the details are ', details);

    try{
      const payload = {
        method:"POST",
        body:JSON.stringify(details),
        headers:{
          'Content-Type':'application/json'
        }
      }
      
      const URL = '/api/user';
      const response = await fetch(URL,payload);
      const data = await response.json();

      if(data.error){
        throw data.error;
      }else{
        M.toast({html: data.message, classes:'green'});
        routes.push('/login');
      }
    } catch (error ){
      console.log({error})
      M.toast({html: error, classes:'red'});
      // routes.push('/');
    }

  }

  const handleInputChange = (e)=>{
    const {value,name} = e.target;
    setDetails(prev=>{
      return {...prev,[name]:value}
    })
  }

  return (
    <div className="container" >
      <div className='card' >
      <h4 className="center-align" >Sign up</h4>
      <form onSubmit={handleSubmit}  >
      <div className="row">
        <div className="input-field col s12">
          <input value={details.name} id="name" onChange={handleInputChange} name="name" type="text" className="validate" />
          <label htmlFor="name">Name</label>
        </div>
      </div>
      <div className="row">
        <div className="input-field col s12">
          <input value={details.password} id="password" onChange={handleInputChange} name="password" type="password" className="validate" />
          <label htmlFor="password">Password</label>
        </div>
      </div>
      <div className="row">
        <div className="input-field col s12">
          <input value={details.email} id="email" name="email" onChange={handleInputChange}  type="email" className="validate" />
          <label htmlFor="email">Email</label>
        </div>
      </div>
      <Link href='/login' >
      <a ><h5 style={{marginLeft:10,textDecoration:'underline'}} >Already have an account? Login</h5></a>
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

export default Signup