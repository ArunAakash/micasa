import React, { useRef } from 'react'
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import SendIcon from '@mui/icons-material/Send';
import { Link } from 'react-router-dom';
import styles from './Footer.module.scss';

const AboutData = {
  heading: ['Mi', 'Casa'],
  content: ['Copyrights MiCasa Homes and Properties.', 'All rights reserved.'],
  socialIcons: [<InstagramIcon />, <TwitterIcon />, <YouTubeIcon />, <LinkedInIcon />],
}

const companyMenu = {
  label: 'Company',
  menus: [
    { label: 'About us', route: '/' },
    { label: 'Blog', route: '/' },
    { label: 'Contact Us', route: '/contactUs' },
    { label: 'Pricing', route: '/' },
    { label: 'Testimonials', route: '/' },
  ]
}

const supportMenu = {
  label: 'Support',
  menus: [
    { label: 'Help Center', route: '/' },
    { label: 'Terms of Service', route: '/' },
    { label: 'Legal', route: '/' },
    { label: 'Privacy Policy', route: '/' },
    { label: 'Status', route: '/' },
  ]
}

const Footer = () => {

  const email = useRef()

  const renderAboutPage = (data) => {
    const { heading, content, socialIcons } = data;
    return (
      <div className={styles.aboutPage}>
        <div className={styles.heading}>
          {heading.map((data, index) => <span key={index}>{data}</span>)}
        </div>
        <div className={styles.content}>
          {content.map((data, index) => <div key={index}>{data}</div>)}
        </div>
        <div className={styles.socialMedia}>
          {socialIcons.map((icon, index) => <span key={index}>{icon}</span>)}
        </div>
      </div>
    )
  }

  const renderMenu = (data) => {
    const { label, menus } = data;
    return (
      <div className={styles.menu}>
        <div className={styles.subHeading}>
          {label}
        </div>
        <div className={styles.menuItems}>
          {menus.map((menu, index) => (
            <Link
              key={index}
              to={menu.route}>
              {menu.label}
            </Link>
          ))}
        </div>
      </div>
    )
  }

  const handleNewsLetter = (event) => {
    event.preventDefault();

    const { current } = email

    console.log('email address', current.value)
    email.current.value = ''
  }

  console.log(email)

  const renderNewsLetter = (data) => {
    return (
      <div className={styles.newsLetter}>
        <div className={styles.label}>Stay up to date</div>

        <form onSubmit={handleNewsLetter}>
          <div className={styles.emailContainer}>
            <input ref={email} type='email' placeholder='Your email address' required />
            <button type='submit' className={styles.sendIcon}><SendIcon /></button>
          </div>
        </form>

      </div>
    )
  }

  return (
    <footer>
      <div className={styles.container}>
        {renderAboutPage(AboutData)}
        {renderMenu(companyMenu)}
        {renderMenu(supportMenu)}
        {renderNewsLetter()}
      </div>
    </footer>
  )
}

export default Footer