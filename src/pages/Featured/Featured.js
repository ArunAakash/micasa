import React, { useEffect, useRef, useState } from 'react'
import styles from './Featured.module.scss'
import cx from 'classnames';
import { images } from '../../assets/images';
import { icons } from '../../assets/icons';

const tabConfig = [
    { label: 'House', id: 'house', icon: <icons.HomeIcon /> },
    { label: 'Villa', id: 'villa', icon: <icons.VillaIcon /> },
    { label: 'Apartment', id: 'apartment', icon: <icons.ApartmentIcon /> },
]

const houseConfig = [
    {
        label: "Ikeja, Lagos",
        id: "ikeja-lagos",
        price: "2,00,000",
        bedroom: 3,
        interest: '31',
        rating: 4.5,
        imgSrc: images.house1,
    },
    {
        label: "Lekki House, Lagos",
        id: "lekki-lagos",
        price: "1,24,000",
        bedroom: 4,
        interest: '23',
        rating: 4.8,
        imgSrc: images.house2,
    },
    {
        label: "Machu Picchu House, Peru",
        id: "machu-picchu-peru",
        price: "95,000",
        bedroom: 2,
        interest: '44',
        rating: 4.2,
        imgSrc: images.house3,
    },
    {
        label: "Santorini House, Greece",
        id: "santorini-greece",
        price: "1,35,000",
        bedroom: 3,
        interest: '55',
        rating: 4.7,
        imgSrc: images.house4,
    },
    {
        label: "Kyoto House, Japan",
        id: "kyoto-japan",
        price: "88,000",
        bedroom: 2,
        interest: '18',
        rating: 4.6,
        imgSrc: images.house1,
    },
    {
        label: "Grand Canyon House, USA",
        id: "grand-canyon-usa",
        price: "1,12,000",
        bedroom: 3,
        interest: '42',
        rating: 4.4,
        imgSrc: images.house2,
    },
]

const Featured = () => {

    const [currentTab, setCurrentTab] = useState();
    const [currentHouse, setCurrentHouse] = useState();
    const [activeArrow, setActiveArrow] = useState();

    const currentHouseRef = useRef()

    useEffect(() => {
        setCurrentTab(tabConfig[0])
        setCurrentHouse(houseConfig[0])
        setActiveArrow('left')
    }, [])
 
    useEffect(() => {
        if(currentHouseRef.current){
            currentHouseRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
                inline: 'nearest',
            })
        }
    },[currentHouse])

    const handlePreviousHouse = () => {
        if (currentHouse.id === houseConfig[0].id) {
            return null;
        }
        const currentIndex = houseConfig.findIndex(house =>
            house.id === currentHouse.id)
        if (currentIndex > 0) {
            setCurrentHouse(houseConfig[currentIndex - 1])
        }
        if (houseConfig[0]) {
            setActiveArrow('right')
        }
    }

    const handleNextHouse = () => {
        if (currentHouse.id === houseConfig[houseConfig.length - 1].id) {
            return null;
        }
        const currentIndex = houseConfig.findIndex(house =>
            house.id === currentHouse.id)
        if (currentIndex < houseConfig.length - 1) {
            setCurrentHouse(houseConfig[currentIndex + 1])
        }
        if (houseConfig[houseConfig.length - 1]) {
            setActiveArrow('left')
        }
    }

    const renderTab = (data) => {
        const { label, id, icon } = data
        return (
            <div
                key={id}
                className={cx(styles.tab,
                    currentTab?.id === id ? styles.activeTab : '')}
                onClick={() => setCurrentTab(data)}
            >
                {icon} <span>{label}</span>
            </div>
        )
    }

    const renderBuilding = (data) => {
        const { label, id, price, rating, imgSrc, interest, bedroom } = data;
        const check = currentHouse?.id === id
        return (
            <div key={id}
                className={cx(styles.building,
                    check ? styles.activeBuilding : '')}
                ref={check ? currentHouseRef : null}
                onClick={() => setCurrentHouse(data)}
            >
                <img src={imgSrc} alt={label} />
                <div className={styles.details}>
                    <div className={styles.label}>{label}</div>
                    <div className={styles.otherDetails}>
                        <div className={styles.section}>
                            <icons.PersonIcon />
                            <div className={styles.temp}>{bedroom} bedroom</div>
                        </div>
                        <div className={styles.section}>
                            <icons.WifiIcon />
                            <div className={styles.section}>Wi-Fi</div>
                        </div>
                    </div>
                </div>
                <div className={styles.price}>
                    <span>₹</span>
                    {price}
                    <span> / annum</span>
                </div>
                <div className={styles.interest}>
                    {interest} have interest in this property
                </div>
                <button className={styles.viewMore}>
                    <span>View More <icons.ArrowForwardIcon /></span>
                </button>
            </div>
        )
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.title}><span>Featured </span>Houses<span></span></div>
                <div className={styles.tabs}>{tabConfig.map((renderTab))}</div>
                <div className={styles.scrollButtons}>
                    <icons.KeyboardArrowLeftIcon
                        className={cx(styles.right,
                            activeArrow === 'right' ? styles.activeArrow : '')}
                        onClick={handlePreviousHouse}
                    />
                    <icons.KeyboardArrowLeftIcon
                        className={cx(styles.left,
                            activeArrow === 'left' ? styles.activeArrow : '')}
                        onClick={handleNextHouse}
                    />
                </div>
            </div>
            <div className={styles.houses}>
                {houseConfig.map(renderBuilding)}
            </div>
        </div>
    )
}

export default Featured