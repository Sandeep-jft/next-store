import Image from "next/image"
import Link from "next/link";

const Card = (props) => {
    const { data } = props;
  return (
      <div className="card card-custom" >
        <div className="card-image">
          <Image src={data.mediaUrl} alt='product-image' objectFit="cover" className="card-custom" blurDataURL={data.mediaUrl} width={350}  height={300} placeholder="blur" />
          <span className="card-title">{data.name}</span>
        </div>
        <div className='product-price' >
          <p>Rs. {data.price}</p>
        </div>
        <div className="card-content ">
          <p className="card-content-detail">{data.description}</p>
        </div>
        <div className="card-action">
          <Link href={'/product/[pid]'} as={`/product/${data._id}`} >
          <a >Details</a>
          </Link>
        </div>
        <style jsx>
            {
                `
                .product-price{
                    padding-left:24px;
                    margin-bottom:-26px;
                }
                .card-content-detail{
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
                `
            }
        </style>
      </div>
  )
}

export default Card