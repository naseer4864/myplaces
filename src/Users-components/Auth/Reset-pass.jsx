import { useState } from "react";



const defaultForm = {
    email : ""
}

const ResetPass = () => {
    const [formField, setFormField] = useState(defaultForm);
    const [error, setError] = useState(false)
    const [successMessage, setSuccessMessage] = useState(false);
    const {email} = formField;
    

    const resetForm = () => {
        setFormField(defaultForm)
    }
    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormField({...formField, [name] : value})
        setError(false)
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if(formField.email.length < 1){
            setError('Please enter your email')
        } else {
            resetForm()
            setSuccessMessage('Password reset instructions sent to your email.');
            setTimeout(() => {
                setSuccessMessage(false)
            },3000);
            console.log(formField)
        }

    }

    return ( 
        <div className="reset-container">
            <form onSubmit={handleSubmit}>
                <p>Enter your email address to initiate the password reset process.</p>
                <input type="email" name="email" value={email}  onChange={handleChange} placeholder="Enter your email"/>
                {error && <p>{error}</p>}
                {successMessage && <p>{successMessage}</p>}
                <button>RESET PASSWORD</button>
            </form>
        </div>
     );
}
 
export default ResetPass;