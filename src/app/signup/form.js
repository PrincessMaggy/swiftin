'use client';
import {getAuth, createUserWithEmailAndPassword} from 'firebase/auth';
import {toast, ToastContainer} from 'react-toastify';
import {useRouter} from 'next/navigation';
import {app, db, storage} from '../../../firebase.config';
import {useState, useEffect} from 'react';
import {doc, setDoc} from 'firebase/firestore';
import {ref, uploadBytes, getDownloadURL} from 'firebase/storage';
import Image from 'next/image';

function Form() {
    const auth = getAuth();
    const {push} = useRouter();
    const [imageUploaded, setImageUploaded] = useState(false);
    const [profileImageFile, setProfileImageFile] = useState(null);
    const [uploadedImageUrl, setUploadedImageUrl] = useState('');
    const [userCreated, setUserCreated] = useState(null);

    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        confirmPass: '',
        phonenumber: '',
        company: '',
        image: '',
        imageUrl: '',
    });
    let imageUrl;
    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPass) {
            toast.error('Passwords do not match!!');
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
                    setUserCreated(user);
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    toast.error(`${errorCode} : ${errorMessage}`);
                });
        }
    };

    const uploadImageToStorage = async (profileImageFile, userCreated) => {
        if (!profileImageFile) {
            return '';
        }

        try {
            const timestamp = new Date().getTime();
            const uniqueId = Math.random().toString(36).substring(7);
            const imageFileName = `${timestamp}_${uniqueId}.jpg`;

            const imageRef = ref(
                storage,
                `profile-pics/${userCreated?.uid}/${imageFileName}`,
            );
            await uploadBytes(imageRef, profileImageFile);
            imageUrl = await getDownloadURL(imageRef);

            return imageUrl;
        } catch (err) {
            toast('Error uploading image: ' + err.message);
            return '';
        }
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const imagePreview = document.getElementById('imagePreview');
                imagePreview.Src = e.target.result;
                setUploadedImageUrl(e.target.result);

                setFormData((prev) => ({
                    ...prev,
                    imageUrl: e.target.result,
                }));

                setUploadedImageUrl(e.target.result);
                setProfileImageFile(file);
                setImageUploaded(true);
            };

            reader.readAsDataURL(file);
            setProfileImageFile(file);
        }
    };

    const addProfilePicToFirestore = async (
        formData,
        imageUrl,
        userCreated,
    ) => {
        try {
            await setDoc(doc(db, 'profiles', userCreated?.uid), {
                userId: userCreated?.uid,
                name: `${formData.firstname} ${formData.lastname}`,
                phonenumber: formData.phonenumber,
                email: formData.email,
                company: formData.company,
                imageUrl: imageUrl,
            });
            toast.success('Sign up was successful');

            setTimeout(() => {
                push('/dashboard');
            }, 5000);
        } catch (err) {
            throw err.message;
        }
    };

    useEffect(() => {
        const uploadProfilePic = async () => {
            if (profileImageFile && userCreated?.uid) {
                try {
                    const imageUrl = await uploadImageToStorage(
                        profileImageFile,
                        userCreated,
                    );

                    await addProfilePicToFirestore(
                        formData,
                        imageUrl,
                        userCreated,
                    );
                } catch (err) {
                    toast.error(err.message);
                }
            }
        };

        uploadProfilePic();
    }, [profileImageFile, userCreated]);

    return (
        <form className='max-w-sm mx-auto mt-4' onSubmit={handleSubmit}>
            <ToastContainer />

            <hr className='border-gray-400 -mt-6' />

            <div
                className={`upload_image mx-8 py-12 mt-12 mb-2 cursor-pointer ${
                    imageUploaded ? 'image-preview-bg' : 'bg-gray-200'
                }`}
            >
                <input
                    type='file'
                    accept='image/*'
                    onChange={handleImageUpload}
                    style={{display: 'none'}}
                    id='imageUploadInput'
                />
                <label
                    htmlFor='imageUploadInput'
                    className='flex flex-col justify-center items-center cursor-pointer'
                >
                    <Image
                        src={
                            imageUploaded
                                ? uploadedImageUrl
                                : '/assets/upload-image.png'
                        }
                        alt=''
                        srcSet=''
                        id='imagePreview'
                        name='image'
                        value={formData.image}
                        className='w-164 image-preview'
                        width={50}
                        height={50}
                    />
                    <p className='text-xs md:text-base'>
                        {imageUploaded
                            ? 'Image Successfully Uploaded'
                            : 'Upload Profile Pic'}
                    </p>
                </label>
            </div>
            <p className='mx-8 text-left text-[12px] text-gray-500 mb-10'>
                Recommended size: 1080 x 1920
            </p>

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
