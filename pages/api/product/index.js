// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import connectMongo from "helper/initDB"
import Product from "models/product";
import getProducts from "services/getProduct";

connectMongo();

export default async function handler(req, res) {
  try {
    switch(req.method){
      case "GET":
        await getAllProducts(req,res);
        break;
      case "POST":
        await addProduct(req,res);
        break;
    }
  } catch (error){
    res.status(401).json({ error })
  }
}

const getAllProducts = async (req,res)=>{
  try{
    const products = await getProducts();
    if(!products){
     throw (products);
    }
    res.status(200).json({ message: 'success', products })

  } catch(error){
    res.status(401).json({ error })

  }
}

const addProduct = async (req,res)=>{
  try{
    const {name,description,mediaUrl,price} = req.body;
    if(!name || !description || !mediaUrl || !price){
      throw ('Please provide all fields');
    }
    const products = new Product({
      name,
      description,
      mediaUrl,
      price
    })

    const data = await products.save();
    res.status(201).json({ message: 'success', product:data })
  } catch (error){
    res.status(422).json({ error })
  }
  
}