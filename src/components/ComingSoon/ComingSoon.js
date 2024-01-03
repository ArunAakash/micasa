import React from 'react'
import styles from './ComingSoon.module.scss'
import { Link } from 'react-router-dom'
import { images } from '../../assets/images'

const DefaultConfig = {
    title: 'Coming Soon',
    description: 'We are working on something awesome!',
    buttonText: 'Go To Home',
    imgSrc: images.underConstruction2,
    route: '/',
}

const ComingSoon = ({config = DefaultConfig}) => {
    const { title, description, buttonText, imgSrc, route } = config;
  return (
    <div className={styles.container}>
        <div className={styles.content}>
            <h1 className={styles.title}>{title}</h1>
            <p className={styles.description}>{description}</p>
            <img src={imgSrc} alt={title} />
            <button className={styles.button}>
                <Link to={route}>{buttonText}</Link>
            </button>
        </div>
    </div>
  )
}

export default ComingSoon