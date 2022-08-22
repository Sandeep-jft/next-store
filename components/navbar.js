
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { parseCookies } from 'nookies'
import Cookies from 'js-cookie'
import { Fragment, useState, useEffect } from "react";

const Navbar = ()=>{
    const [ isLoggedIn, setIsLoggedIn ] = useState( false );
    const routes = useRouter();
    const loginToken = Cookies.get('token');
    const {token} = parseCookies();

    useEffect(()=>{
        setIsLoggedIn(token?true: false);
    },[])


    const getActiveRoute = (route)=>{
        if(route === routes.pathname){
            return 'active'
        }
        return '';
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
                {
                    !isLoggedIn ? <Fragment>
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
                    </Fragment> : 
                    <Fragment>
                        <li className={getActiveRoute('/create')}>
                    <Link href="/create">
                    <a >Create</a>
                    </Link>
                    </li>
                        <li className={getActiveRoute('/profile')}>
                        <Link href="/profile">
                        <a >Profile</a>
                        </Link>
                    </li>
                    </Fragment>

                }
                
            </ul>
        </div>
        </nav>

        </>
    )
}

export default Navbar;