import * as yup from 'yup'
export const registerSchema=yup.object({
    userName:yup.string().required().min(3,"must be at least 3 char").max(30,"max is 30 char"),
    email:yup.string().required().email(),
    password:yup.string().required().min(3,"must be at least 3 char").max(30,"max is 30 char")
})

export const LoginSchema=yup.object({
    email:yup.string().required().email(),
    password:yup.string().required().min(3,"must be at least 3 char").max(30,"max is 30 char")
})