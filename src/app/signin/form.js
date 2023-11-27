'use client';
import {app} from '../../../firebase.config';
import {useState, useEffect} from 'react';
import {toast, ToastContainer} from 'react-toastify';
import {
    getAuth,
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
} from 'firebase/auth';
import {useRouter} from 'next/navigation';
import Link from 'next/link';

function Form() {
    const auth = getAuth();
    const {push} = useRouter();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    };
    const handleSubmit = (e) => {
        e.preventDefault();

        signInWithEmailAndPassword(auth, formData.email, formData.password)
            .then((userCredential) => {
                const user = userCredential.user;
                push('/dashboard');
                toast.success('Sign in successful.');
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                toast.error(`${errorCode} : ${errorMessage}`);
            });
    };

    function resetPassword() {
        if (formData.email !== '') {
            sendPasswordResetEmail(
                auth,
                formData.email,
                'https://swiftin.vercel.app/signin',
            )
                .then((userCredential) => {
                    console.log(userCredential);
                    toast('Reset email sent. Please check your mailbox.');
                })
                .catch((err) => {
                    toast.error(err.message);
                });
        } else {
            toast('Input your email before trying to reset.');
        }
    }

    useEffect(() => {
        const savedEmail = localStorage.getItem('rememberedEmail');
        const savedPassword = localStorage.getItem('rememberedPassword');

        if (savedEmail && savedPassword) {
            setFormData({
                email: savedEmail,
                password: savedPassword,
            });
        }
    }, []);

    const handleRememberMeChange = (e) => {
        if (e.target.checked) {
            localStorage.setItem('rememberedEmail', formData.email);
            localStorage.setItem('rememberedPassword', formData.password);
        } else {
            localStorage.removeItem('rememberedEmail');
            localStorage.removeItem('rememberedPassword');
        }
    };
    return (
        <div className='max-w-sm mx-auto m-5'>
            <form className='max-w-sm mx-auto m-5' onSubmit={handleSubmit}>
                <ToastContainer />
                <div className='mb-5'>
                    <label
                        htmlFor='email'
                        className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                    >
                        Your email
                    </label>
                    <input
                        type='email'
                        id='email'
                        name='email'
                        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                        placeholder='name@gmail.com'
                        onChange={handleChange}
                        value={formData.email}
                        required
                    />
                </div>
                <div className='mb-5'>
                    <label
                        htmlFor='password'
                        className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                    >
                        Your password
                    </label>
                    <input
                        type='password'
                        id='password'
                        name='password'
                        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                        onChange={handleChange}
                        value={formData.password}
                        required
                    />
                </div>
                <div className='flex items-start mb-5'>
                    <div className='flex items-center h-5'>
                        <input
                            id='remember'
                            type='checkbox'
                            value=''
                            className='w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800'
                            required
                            onChange={handleRememberMeChange}
                        />
                    </div>
                    <label
                        htmlFor='remember'
                        className='ms-2 text-sm font-medium text-gray-900 dark:text-gray-300'
                    >
                        Remember me
                    </label>
                </div>
                <button
                    type='submit'
                    className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
                >
                    Submit
                </button>
            </form>
            <p
                className='block mb-2 text-sm font-medium text-gray-900 dark:text-white underline'
                onClick={resetPassword}
            >
                Reset password.
            </p>
            <p className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
                Yet to get an account? Click{' '}
                <Link href='/signup' className='underline'>
                    here
                </Link>{' '}
                to sign up.
            </p>
        </div>
    );
}

export default Form;
