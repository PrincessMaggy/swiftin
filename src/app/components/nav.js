'use client'; // This is a client component
import Image from 'next/image';
import {useState, useEffect} from 'react';
import {usePathname, useRouter} from 'next/navigation';
import Link from 'next/link';
import {toast, ToastContainer} from 'react-toastify';
import {signOut} from 'firebase/auth';
import {app} from '../../../firebase.config';
import {UserAuth} from './auth';

function Nav() {
    const [isDropdownVisible, setDropdownVisibility] = useState(false);
    const [isMobileNavOpen, setMobileNavOpen] = useState(false);
    const router = usePathname();
    const {push} = useRouter();
    const {user} = UserAuth();

    const handleSignOut = () => {
        console.log(user);
        if (user) {
            signOut(app)
                .then(() => {
                    toast.success('Sign out successful');
                })
                .catch((err) => {
                    toast.error(err);
                });
        } else {
            // router.reload();
            push('/signin');
        }
    };

    const toggleMobileNav = () => {
        setMobileNavOpen(!isMobileNavOpen);
    };
    const toggleDropdown = () => {
        setDropdownVisibility(!isDropdownVisible);
    };

    useEffect(() => {
        setMobileNavOpen(false);
    }, [router]);
    return (
        <>
            <ToastContainer />
            <nav className='bg-white border-gray-200 dark:bg-gray-900'>
                <div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4'>
                    <Link
                        href={user?.email ? '/' : '/signin'}
                        className='flex items-center space-x-3 rtl:space-x-reverse'
                    >
                        <Image
                            src='/assets/swift.png'
                            width={40}
                            height={40}
                            className='h-10'
                            alt='swiftin Logo'
                        />
                        <span className='self-center text-2xl font-semibold whitespace-nowrap dark:text-white'>
                            SwiftIN
                        </span>
                    </Link>
                    <div className='flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse'>
                        <button
                            type='button'
                            className='flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600'
                            id='user-menu-button'
                            aria-expanded={isDropdownVisible}
                            onClick={toggleDropdown}
                        >
                            <span className='sr-only'>Open user menu</span>
                            <Image
                                className='w-8 h-8 rounded-full'
                                src='/assets/user.gif'
                                alt='user photo'
                                width={20}
                                height={20}
                            />
                        </button>
                        {/* dropdown menu */}

                        <div
                            className={`z-50 ${
                                isDropdownVisible ? '' : 'hidden'
                            } my-4 mt-10 absolute right-10 top-10 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600`}
                            id='userdropdown'
                        >
                            <div className='px-4 py-3'>
                                <span className='block text-sm text-gray-900 dark:text-white'>
                                    {user?.displayName}
                                </span>
                                <span className='block text-sm  text-gray-500 truncate dark:text-gray-400'>
                                    {user?.email}
                                </span>
                            </div>
                            <ul
                                className='py-2'
                                aria-labelledby='user-menu-button'
                            >
                                <li>
                                    <Link
                                        href={
                                            user?.email
                                                ? '/settings'
                                                : '/signin'
                                        }
                                        className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white'
                                    >
                                        Settings
                                    </Link>
                                </li>

                                <li>
                                    <p
                                        className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white'
                                        onClick={handleSignOut}
                                    >
                                        {user ? 'Sign out' : 'Sign in'}
                                    </p>
                                </li>
                            </ul>
                        </div>
                        <button
                            data-collapse-toggle='navbar-user'
                            type='button'
                            aria-expanded={isMobileNavOpen}
                            onClick={toggleMobileNav}
                            className='
                            inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600'
                            aria-controls='navbar-user'
                        >
                            <span className='sr-only'>Open main menu</span>
                            <Image
                                src={
                                    isMobileNavOpen
                                        ? '/assets/close.png'
                                        : '/assets/hamburger.svg'
                                }
                                height={30}
                                width={30}
                                alt='harmburger'
                            />
                        </button>
                    </div>
                    <div
                        className={` ${
                            isMobileNavOpen ? '' : 'hidden'
                        } items-center justify-between d:block w-full md:flex md:w-auto md:order-1`}
                        id='navbar-user'
                    >
                        <ul className='flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700'>
                            <li>
                                <Link
                                    href={user?.email ? '/' : '/signin'}
                                    className={`block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 ${
                                        router === '/'
                                            ? 'bg-blue-700 text-white md:bg-transparent md:text-blue-500'
                                            : 'bg-transparent text-gray-900'
                                    }`}
                                    aria-current='page'
                                >
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href={user?.email ? '/checkin' : '/signin'}
                                    className={`block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 ${
                                        router === '/checkin'
                                            ? 'bg-blue-700 text-white md:bg-transparent md:text-blue-500'
                                            : 'bg-transparent text-gray-900'
                                    }`}
                                >
                                    Check-In
                                </Link>
                            </li>

                            <li>
                                <Link
                                    href={
                                        user?.email ? '/dashboard' : '/signin'
                                    }
                                    className={`block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700  ${
                                        router === '/dashboard'
                                            ? 'bg-blue-700 text-white md:bg-transparent md:text-blue-500'
                                            : 'bg-transparent text-gray-900'
                                    }`}
                                >
                                    Dashboard
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Nav;
