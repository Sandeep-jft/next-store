
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

const Navbar = ()=>{
    const routes = useRouter();

    const getActiveRoute = (route)=>{
        if(route === routes.pathname){
            return 'active'
        }
        return ''
    }
    return (
        <>
        <Head>
        <title>E-cart Store</title>
        </Head>
        <nav style={{backgroundColor:'#2196f3'}}>
        <div className="nav-wrapper #2196f3 blue" style={{margin:'0px 20px'}}>
            <Link href="/">
                <a className="brand-logo left" >E-Cart</a>
            </Link>
            <ul id="nav-mobile" className="right">
                <li className={getActiveRoute('/signup')}>
                    <Link href="/signup">
                    <a  >Sign up</a>
                    </Link>
                </li>
                <li className={getActiveRoute('/login')} >
                    <Link href="/login">
                    <a >Login</a>
                    </Link>
                </li>
                <li className={getActiveRoute('/create')}>
                    <Link href="/create">
                    <a >Create</a>
                    </Link>
                </li>
            </ul>
        </div>
        </nav>

        </>
    )
}

export default Navbar;