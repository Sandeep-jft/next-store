
import connectMongo from "helper/initDB"
import Product from "models/product";

connectMongo();

export default async function handler(req, res) {
  try {
    console.log('the handler is here', req.query, req.method);
    switch(req.method){
      case "GET":
        await getProduct(req,res);
        break;
      case "DELETE":
        await deleteProduct(req,res);
        break;
    }
  } catch (error){
    return res.status(401).json({ error })
  }
}

const getProduct = async (req,res)=>{
  try{
    const {pid} = req.query;
    const productDetails = await Product.findOne({_id : pid});
    if(productDetails){
      return res.status(200).json({ message:'success', productDetails })
    }else{
      return res.status(401).json({ error:"Not Found" })
    }
  } catch (error){
    return res.status(401).json({ error })

  }
}

const deleteProduct = async (req,res)=>{
  try{
    const {pid} = req.query;
    const product = await Product.findByIdAndDelete({_id:pid})
    if( product ){
      return res.status(200).json({ message: 'success' })
    }else{
      return res.status(401).json({ error:"Not found" })
    }
  } catch (error){
    return res.status(401).json({ error })

  }
}