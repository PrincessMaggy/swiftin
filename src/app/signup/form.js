'use client';
import {getAuth, createUserWithEmailAndPassword} from 'firebase/auth';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {app} from '../../../firebase.config';
import {useState} from 'react';

function Form() {
    const auth = getAuth();
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        confirmPass: '',
        phonenumber: '',
        company: '',
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // createUserWithEmailAndPassword();
        console.log(formData, 'formData');
        if (formData.password !== formData.confirmPass) {
            toast.error('Passwrds do not match!!');
        } else {
            createUserWithEmailAndPassword(
                auth,
                formData.email,
                formData.password,
            )
                .then((userCredential) => {
                    // Signed up
                    const user = userCredential.user;
                    console.log(user, 'user');
                    toast.success('Sign up was successful');
                    // ...
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    toast.error(errorMessage);
                    toast(errorCode);
                    // ..
                });
        }
    };

    return (
        <form className='max-w-sm mx-auto mt-4' onSubmit={handleSubmit}>
            <div className='relative z-0 w-full mb-5 group'>
                <input
                    type='text'
                    name='firstname'
                    id='firstname'
                    className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
                    onChange={handleChange}
                    value={formData.firstname}
                    required
                />
                <label
                    htmlFor='floating_first_name'
                    className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
                >
                    First name
                </label>
            </div>
            <div className='relative z-0 w-full mb-5 group'>
                <input
                    type='text'
                    name='lastname'
                    id='lastname'
                    className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
                    onChange={handleChange}
                    value={formData.lastname}
                    required
                />
                <label
                    htmlFor='floating_last_name'
                    className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
                >
                    Last name
                </label>
            </div>
            <div className='relative z-0 w-full mb-5 group'>
                <input
                    type='email'
                    name='email'
                    id='email'
                    value={formData.email}
                    className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
                    onChange={handleChange}
                    required
                />
                <label
                    htmlFor='email'
                    className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
                >
                    Email address
                </label>
            </div>
            <div className='relative z-0 w-full mb-5 group'>
                <input
                    type='password'
                    name='password'
                    id='password'
                    className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
                    onChange={handleChange}
                    value={formData.password}
                    required
                />
                <label
                    htmlFor='password'
                    className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
                >
                    Password
                </label>
            </div>
            <div className='relative z-0 w-full mb-5 group'>
                <input
                    type='password'
                    name='confirmPass'
                    id='confirmPass'
                    className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
                    onChange={handleChange}
                    value={formData.confirmPass}
                    required
                />
                <label
                    htmlFor='floating_repeat_password'
                    className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
                >
                    Confirm password
                </label>
            </div>
            <div className='relative z-0 w-full mb-5 group'>
                <input
                    type='tel'
                    name='phonenumber'
                    id='phonenumber'
                    className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
                    onChange={handleChange}
                    value={formData.phonenumber}
                    required
                />
                <label
                    htmlFor='floating_phone'
                    className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
                >
                    Phone number
                </label>
            </div>
            <div className='relative z-0 w-full mb-5 group'>
                <input
                    type='text'
                    name='company'
                    id='company'
                    className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
                    onChange={handleChange}
                    value={formData.company}
                    required
                />
                <label
                    htmlFor='floating_company'
                    className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
                >
                    Company (Ex. Google)
                </label>
            </div>
            <button
                type='submit'
                className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
            >
                Submit
            </button>
        </form>
    );
}

export default Form;
