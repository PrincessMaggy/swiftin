'use client'; // This is a client component
import swift from '../assets/swift.png';
import Image from 'next/image';
import user from '../assets/user.gif';
import {useState} from 'react';
import hamburger from '../assets/hamburger.svg';
import close from '../assets/close.png';
import {usePathname} from 'next/navigation';

function Nav() {
    const [isDropdownVisible, setDropdownVisibility] = useState(false);
    const [isMobileNavOpen, setMobileNavOpen] = useState(false);
    const router = usePathname();
    const toggleMobileNav = () => {
        setMobileNavOpen(!isMobileNavOpen);
    };
    const toggleDropdown = () => {
        setDropdownVisibility(!isDropdownVisible);
    };
    return (
        <>
            <nav className='bg-white border-gray-200 dark:bg-gray-900'>
                <div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4'>
                    <a
                        href='/'
                        className='flex items-center space-x-3 rtl:space-x-reverse'
                    >
                        <Image
                            src={swift}
                            width='auto'
                            height='auto'
                            className='h-10'
                            alt='swiftin Logo'
                        />
                        <span className='self-center text-2xl font-semibold whitespace-nowrap dark:text-white'>
                            SwiftIN
                        </span>
                    </a>
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
                                src={user}
                                alt='user photo'
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
                                    Bonnie Green
                                </span>
                                <span className='block text-sm  text-gray-500 truncate dark:text-gray-400'>
                                    name@flowbite.com
                                </span>
                            </div>
                            <ul
                                className='py-2'
                                aria-labelledby='user-menu-button'
                            >
                                <li>
                                    <a
                                        href='#'
                                        className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white'
                                    >
                                        Settings
                                    </a>
                                </li>

                                <li>
                                    <a
                                        href='#'
                                        className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white'
                                    >
                                        Sign out
                                    </a>
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
                                src={isMobileNavOpen ? close : hamburger}
                                height='auto'
                                width='auto'
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
                                <a
                                    href='/'
                                    className={`block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 ${
                                        router === '/'
                                            ? 'bg-blue-700 text-white md:bg-transparent md:text-blue-500'
                                            : 'bg-transparent text-gray-900'
                                    }`}
                                    aria-current='page'
                                >
                                    Home
                                </a>
                            </li>
                            <li>
                                <a
                                    href='/checkin'
                                    className={`block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 ${
                                        router === '/checkin'
                                            ? 'bg-blue-700 text-white md:bg-transparent md:text-blue-500'
                                            : 'bg-transparent text-gray-900'
                                    }`}
                                >
                                    Check-In
                                </a>
                            </li>

                            <li>
                                <a
                                    href='/dashboard'
                                    className={`block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700  ${
                                        router === '/dashboard'
                                            ? 'bg-blue-700 text-white md:bg-transparent md:text-blue-500'
                                            : 'bg-transparent text-gray-900'
                                    }`}
                                >
                                    Dashboard
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Nav;
