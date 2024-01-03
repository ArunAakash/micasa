import React, { useEffect, useState } from 'react'
import styles from './Header.module.scss'
import { headerConfig, NavItems } from '../../constants';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { Link, useLocation } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';

const RenderTitle = ({ data }) => {
    const { title, options } = data;
    const [firstTitle, secondTitle] = title.split(' ');
    return (
        <div className={styles.sectionOne}>
            <h1 className={styles.title}>
                <span>{firstTitle}</span>
                <span>{secondTitle}</span>
            </h1>
            <div className={styles.options}>
                {options.map((val, index) => <div key={index}><span>{val}</span> <PlayArrowIcon /></div>)}
            </div>
        </div>
    )
}

const RenderNavigationLinks = ({ data, setCurrentNav, currentNav, setIsMenuOpen }) => {
    return (
        <div className={styles.sectionTwo}>
            <nav className={styles.navigation}>
                {data.map(nav => (
                    <Link
                        className={nav.id === currentNav.id ? styles.active : ''}
                        to={nav.route}
                        key={nav.id}
                        onClick={() => { setCurrentNav(nav); setIsMenuOpen(false); }}>
                        {nav.label}
                    </Link>
                ))}
            </nav>
        </div>
    )
}


function Header({ navData = NavItems, headerData = headerConfig }) {

    const [currentNav, setCurrentNav] = useState({})
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const { pathname } = useLocation()

    //API Config
    // async function fetchData(url){
    //     try{
    //         const res = await fetch(url)
    //         if(!res.ok){
    //             console.log('response.fail')
    //         }
    //         return await res.json()
    //     }
    //     catch(error){
    //         console.log(error)
    //     }
    // }

    // useEffect(() => {
    //     fetchData('https://mocki.io/v1/eb75919c-5028-4435-b381-f0c235248945')
    // },[])

    useEffect(() => {
        const nav = navData.find(nav => nav.route === pathname)

        //mount
        setCurrentNav(nav)
    }, [pathname, navData])

    const renderButtons = () => {
        return (
            <div className={styles.sectionThree}>
                <button>Login In</button>
                <button className={styles.signUp}>Sign Up</button>
            </div>
        )
    }

    const renderMobileMenu = () => {
        return (
            <div className={styles.mobileContainer}>
                <RenderNavigationLinks
                    currentNav={currentNav}
                    setCurrentNav={setCurrentNav}
                    data={navData}
                    setIsMenuOpen={setIsMenuOpen}
                />
                {renderButtons()}
                <div
                    onClick={() => setIsMenuOpen(false)}
                    className={styles.closeIcon}>
                    X
                </div>
            </div>
        )
    }

    return (
        <header>
            <div className={styles.container}>
                <div className={styles.header}>
                    {/* {renderTitle(headerData)} */}
                    <RenderTitle data={headerData} />
                    {/* {renderNavigationLinks()} */}
                    <RenderNavigationLinks
                        currentNav={currentNav}
                        setCurrentNav={setCurrentNav}
                        data={navData}
                        setIsMenuOpen={setIsMenuOpen}
                    />
                    {renderButtons()}
                    <div className={styles.mobileMenu}
                        onClick={() => setIsMenuOpen(true)}>
                        <MenuIcon />
                    </div>
                </div>
                {isMenuOpen ? renderMobileMenu() : ''}
            </div>
        </header>
    )
}


export default Header

{/* 
<div className="title">

</div>
<div className="navigation">

</div>
<div className="loginButtons">

</div> */}