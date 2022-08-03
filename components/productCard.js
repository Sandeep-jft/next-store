import Card from "./card";

const ProductCard = (props) => {
    const { products = []} = props;
  return (
    <div>
        <h3>Products</h3>
        <br />
            <div className="row-card">
            {
                products.map(item=>{
                    return <Card key={item._id.toString()} data = {item} />
                })
            }
            </div>        
    </div>
  )
}

export default ProductCard