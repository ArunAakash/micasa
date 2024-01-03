import React from 'react'
import styles from './ContactUs.module.scss'
import FormHelper from '../../components/FormHelper';

const contactInfo = [
    { label: "Email", value: "contact@example.com" },
    { label: "Phone", value: "+1 234 567 890" },
    { label: "Address", value: "123 Main Street, City, Country" },
]

const formConfig = [
    {
        label: 'Name',
        name: 'name',
        type: 'text',
        required: true,
    },
    {
        label: 'Email',
        name: 'email',
        type: 'email',
        required: true,
    },
    {
        label: 'Name',
        name: 'name',
        type: 'text',
        required: true,
    },
]

function ContactUs() {

    const renderInfo = (data, index) => {
        const { label, value } = data
        return (
            <div key={index} className={styles.infoItem}>
                <span className={styles.label}>{label}:</span>
                <span className={styles.value}>{value}</span>
            </div>
        )
    }

    const formStyles = {
        flexDirection: 'column',
    }

    const formSubmit = (data) => [
        console.log('form data', data)
    ]

    return (
        <div className={styles.container}>
            <div className={styles.details}>
                <h2 className={styles.heading}>Contact Us</h2>
                <p className={styles.description}>Please fill out the form below to get in touch with us</p>
            </div>
            <FormHelper
                onSubmit={formSubmit}
                config={formConfig}
                formStyles={formStyles} />
            <div className={styles.info}>
                <div className={styles.subHeading}>Reach out us here:</div>
                {contactInfo.map(renderInfo)}
            </div>
        </div>
    )
}

export default ContactUs