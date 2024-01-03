import React, { useState } from 'react'
import styles from './FormHelper.module.scss'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

function FormHelper(
    {
        config = [],
        onSubmit = () => { },
        submitConfig = {},
        formStyles = {}
    }) {

    const [formData, setFormData] = useState({})
    const [formErrors, setFormErrors] = useState({})

    const { label = 'Submit', btnStyles = {} } = submitConfig

    const handleChange = (event) => {
        const { name, value } = event.target
        console.log(name, value);
        setFormData(prevData => ({ ...prevData, [name]: value }))
        setFormErrors(prevData => ({ ...prevData, [name]: '' }))
    }

    const renderFields = (data, index) => {
        const { label, name, type, options, required } = data

        const renderSelect = () => {
            return (
                <select name={name} id={name} onChange={handleChange}>
                    <option key={index} value='' hidden>
                        Select {label}
                    </option>
                    {options.map((option, index) =>
                        <option key={index} value={option.value}>
                            {option.label}
                        </option>
                    )}
                </select>
            )
        }

        const renderInput = () => {
            return (
                <input type='text'
                    name={name}
                    id={name}
                    onChange={handleChange}
                    required={required} />
            )
        }

        const renderFieldType = () => {
            switch (type) {
                case 'select': return renderSelect();
                default: return renderInput();
            }
        }

        return (
            <div className={styles.field} key={index}>
                <label htmlFor={name}>{label}</label>
                {renderFieldType()}
                <div className={styles.error}>
                    {formErrors[name] ? formErrors[name] : ""}
                </div>
            </div>
        )
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const errors = {} //object, for in

        //array.map, foreach, array -> for of

        for (const field of config) {
            const { label, name, required } = field
            if (required && !formData[name]) {
                errors[name] = `${label} is required`
            }
        }

        if (Object.keys(errors).length > 0) {
            setFormErrors(errors)
        }
        else {
            onSubmit(formData)
            //setFormData(config)
        }
    }

    return (
        <div className={styles.container}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.fieldsContainer} style={formStyles}>
                    {config.map(renderFields)}
                </div>
                <button className={styles.submitBtn} style={btnStyles}>
                    {label} <ArrowForwardIcon />
                </button>
            </form>
        </div>
    )
}

export default FormHelper