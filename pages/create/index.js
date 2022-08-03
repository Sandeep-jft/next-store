import Image from "next/image";
import { useRouter } from "next/router";
import { useState, useCallback } from "react"

const Create = () => {
  const [details, setDetails] = useState({
    name:'',
    price:'',
    file:'',
    description:'',
    mediaUrl:''
  });
  const routes = useRouter();

  const handleInputChange = useCallback((event) => {
      const { value, name } = event.target;
      setDetails(prev=>{
        const updated = {
          ...prev,
          [ name ]: value,
        };
        return updated;
      });
    },
    []
  );

  const handleFileInput = useCallback((e)=>{
    const file = e.target.files[0];
    if(file){
      setDetails(prev=>{
        const newState = {...prev,file, mediaUrl:URL.createObjectURL(file)};
        return newState
      });
    }
  },[])

  const handleSubmit= async (event)=>{
    event.preventDefault();
    console.log({details});
    const mediaUrl = await uploadImage();
    const URL = '/api/product';
    const Payload = {
      method:"POST",
      body:JSON.stringify({...details, mediaUrl}),
      headers:{
        'Content-Type':'application/json'
      }
    }
    const response = await fetch(URL,Payload)
    const data =  await response.json();
    if(data.error){
      M.toast({html: data.error, classes:'red'})
    }
    M.toast({html: 'Success', classes:'green'});
    routes.push('/');
  }

  const uploadImage = async ()=>{
    
    const form = new FormData();
    form.append('file',details.file);
    form.append('upload_preset','e-cart');
    form.append('cloud_name','dpxoywhso');


    const response = await fetch('https://api.cloudinary.com/v1_1/dpxoywhso/image/upload',{
      method:'POST',
      body:form
    })
    const data = await response.json();
    return data.url;
  }

    return (
      <div className="container" >
        <h4 className="center-align">Add Product</h4>
        <form onSubmit={handleSubmit} >
          <div className="row" >
            <div className="input-field col s6">
            <input value={details.name} onChange={handleInputChange} placeholder="Name" id="name" name="name" type="text" className="validate" />
            <label className='active' htmlFor="name">Name</label>
            </div>
          </div>
          <div className="row" >
            <div className="input-field col s6">
            <input value={details.price} onChange={handleInputChange} placeholder="Price" type='number' name="price" id="price" className="validate" />
            <label className='active' htmlFor="price">Price</label>
            </div>
          </div>

          <div className="file-field input-field">
            <div className="btn">
              <span>Media File</span>
              <input onChange={handleFileInput} type="file" accept="images/*" />
            </div>
            <div className="file-path-wrapper">
              <input className="file-path validate" type="text" />
            </div>
          </div>

          {
            details.mediaUrl && <Image src={details.mediaUrl} alt='image' height={150} width={200} fill='responsive' />
          }

          <div className="row">
            <div className="input-field col s12">
              <textarea value={details.description} onChange={handleInputChange} name="description" className="materialize-textarea" id="textarea1" ></textarea>
              <label  htmlFor="textarea1">Description</label>
            </div>
          </div>

          <button className="btn waves-effect waves-light" type="submit" name="action">Submit
          <i className="material-icons right">send</i>
        </button>
        </form>
      </div>
    )
  }
  
  export default Create