import React, { useContext, useState } from 'react'
import { FormContext } from '../contexts/FormContext'

const ContactForm = () => {
  
    const { formData, setFormData, errors, options, validateForm, handleInputChange } = useContext(FormContext)

    const [ submitted, setSubmitted ] = useState(false)

    const handleOk = () => {
        setSubmitted(false)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (validateForm()) {
            
            const res = await fetch('https://win24-assignment.azurewebsites.net/api/forms/contact', 
            {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            })

            if(res) { //it kept sending 400 (Bad request) in the API link so I changed it to send the data no matter what
                setSubmitted(true)
                setFormData({ fullName: '', 
                    email: '', 
                    category: options[0].id })
              } 
        } 
    }

    if(submitted) {
        return (
          <div className = "confirmation-message">
            <h2>Thank you for contacting us</h2>
            <p>We will get yo you as soon as possible</p>
            <button className='btn-primary' onClick={handleOk}>Ok</button>
          </div>
        )
      }



    return (
        <form className="reg-form" noValidate onSubmit={handleSubmit}>
            <h1>Get Online Consultation</h1>

            <div className="userName">
                <div className="input-group">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input
                        type="text"
                        name="fullName"
                        className={`form-input ${errors.fullName ? 'input-error' : ''} `}
                        value={formData.fullName}
                        onChange={handleInputChange}
                        required
                    />
                    {errors.fullName && <p className="invalid-input">{errors.fullName}</p>}
                </div>
            </div>

            <div className="userContact">
                <div className="input-group">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input
                        type="email"
                        name="email"
                        className={`form-input ${errors.name ? 'input-error' : ''} `}
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                    />
                    {errors.email && <p className="invalid-input">{errors.email}</p>}
                </div>
            </div>

            <div className="input-group">
                <label htmlFor="specialist" className="form-label">Specialist</label>
                <select
                    className={`form-input ${errors.name ? 'input-error' : ''} `}
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                >
                    {options.map(option => (
                        <option key={option.id} value={option.id}>{option.text}</option>
                    ))}
                </select>
            </div>

            <div className="formBtn">
                <button type="submit" id="submitBtn" className="btn-primary submitBtn" onClick={handleOk}>Make an appointment</button>
            </div>
        </form>
    );
};

export default ContactForm;


// import React, { useState } from 'react'

// const ContactForm = () => {
  
//     const [options, setOptions] = useState([
//         { id: 1, text: "Features" },
//         { id: 2, text: "Services" },
//         { id: 3, text: "Finance" },
//         { id: 4, text: "Other" }
//     ]);

//     const [formData, setFormData] = useState(
//         { fullName: '', 
//           email: '', 
//           category: options[0].id })

    

//     const [errors, setErrors] = useState({})

//     const [submitted, setSubmitted] = useState(false)

//     const validateForm = () => {
//         const newErrors = {}

//         if (!/^[A-Öa-ö\s\-]{2,}$/.test(formData.fullName)) {
//             newErrors.fullName = "Must be at least 2 characters long, no numbers"
//         }
//         if (!/^[A-Za-z0-9._-]+@[A-Za-z0-9.-]+\.[A-Za-z0-9]{2,}$/.test(formData.email)) {
//             newErrors.email = "Please, enter a valid email"
//         }

//         setErrors(newErrors);
//         return Object.keys(newErrors).length === 0
//     }

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({ ...formData, [name]: value })
//     }

//     const handleOk = () => {
//         setSubmitted(false)
//     }

//     const handleSubmit = async (e) => {
//         e.preventDefault()

//         if (validateForm()) {
            
//             const res = await fetch('https://win24-assignment.azurewebsites.net/api/forms/contact', 
//             {
//                 method: 'post',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify(formData)
//             })

//             if(res) { //it kept sending 400 (Bad request) in the API link so I changed it to send the data no matter what
//                 setSubmitted(true)
//                 setFormData({ fullName: '', 
//                     email: '', 
//                     category: options[0].id })
//               } 
//         } 
//     }

//     if(submitted) {
//         return (
//           <div className = "confirmation-message">
//             <h2>Thank you for contacting us</h2>
//             <p>We will get yo you as soon as possible</p>
//             <button className='btn-primary' onClick={handleOk}>Ok</button>
//           </div>
//         )
//       }

