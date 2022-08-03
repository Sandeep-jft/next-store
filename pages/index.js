import ProductCard from 'components/productCard'
import getProducts from 'services/getProduct'
import styles from '../styles/Home.module.css'

export default function Home(props) {
  const { products = [] } = props;
  return (
    <div className={styles.container}>
      <ProductCard products={products} />
    </div>
  )
}

export const getStaticProps = async (context)=>{
  const products = await getProducts();
  return {
    props:{
      products: JSON.parse(JSON.stringify(products))
    },
    revalidate:5
  }
}
