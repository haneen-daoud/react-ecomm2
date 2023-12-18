import React from 'react'
import { useFormik } from 'formik';
import Input from '../../pages/Input';
import { LoginSchema, registerSchema } from '../validation/validate.js';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import {  Link, useNavigate } from 'react-router-dom';


export default function Login({saveCurrentUser}) {
const navigate=useNavigate()

    const initialValues= {
        email:'',
        password:'',
    };


    const onSubmit = async (users) => {
         const {data} = await axios.post(`https://ecommerce-node4.vercel.app/auth/signin`,users);
         if (data.message == 'success'){
            localStorage.setItem("UserToken",data.token)
            
            saveCurrentUser();
            toast.success('login successfuly', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
                navigate('/home')
         }

    }
    const formik = useFormik ({
        initialValues,
        onSubmit,
        validationSchema:LoginSchema
        // validate:values=>{
        //     let errors  = {};
        //     if (!values.userName){
        //         errors.userName = "username is required";
        //     }
        //     if(!values.email){
        //         errors.email = "email is required";
        //     }
        //     if(!values.password){
        //         errors.password = "password is required";
        //     }
        //     return errors;
        // }
    });

    const inputs = [
        {
            id:'email',
            type:'email',
            name:'email',
            title:'user email',
            value:formik.values.email,
        },
        {
            id:'password',
            type:'password',
            name:'password',
            title:'user password',
            value:formik.values.password,
        },
    ]

    
    const renderInputs = inputs.map ((input,index)=>
    <Input type={input.type}
           id={input.id}
           name={input.name} 
           title={input.title}
           value={input.value}  
           key={index}
           onChange={input.onChange||formik.handleChange} 
           errors={formik.errors}
           onBlur={formik.handleBlur} 
           touched={formik.touched}/>
    )
    
  return (
    
    <div className=' container'>
        <h1>Log in</h1>
        <form onSubmit={formik.handleSubmit} encType='multipart/form-data'>
        {renderInputs}
        <button type='submit' disabled={!formik.isValid}>Login</button>
        <Link to="/send" className='text-decoration-none'>forget password?</Link>
      
        </form>
    </div>

  )
}