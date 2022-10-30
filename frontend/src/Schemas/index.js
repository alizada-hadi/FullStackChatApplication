import * as Yup from 'yup'


export const loginSchema = Yup.object().shape({
    email : Yup.string().email("Please enter a valid email ").required("Required"), 
    password : Yup.string().min(5).required("Required")
})