const { default: connectMongo } = require("helper/initDB");
const { default: product } = require("models/product");

const getProducts = async ()=>{
  connectMongo();
  const products = await product.find();
  return products;

}



export default getProducts;