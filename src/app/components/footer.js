'use client'; // This is a client component
import Image from 'next/head';
import Link from 'next/link';

function Footer() {
    return (
        <>
            <footer className='bg-white dark:bg-gray-900'>
                <div className='mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8'>
                    <div className='md:flex md:justify-between'>
                        <div className='mb-6 md:mb-0'></div>
                        <div className='grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3'>
                            <div>
                                <h2 className='mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white'>
                                    Resources
                                </h2>
                                <ul className='text-gray-500 dark:text-gray-400 font-medium'>
                                    <li className='mb-4'>
                                        <Link
                                            href='https://swiftin.vercel.app/'
                                            className='hover:underline'
                                        >
                                            SwiftIN
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href='#'
                                            className='hover:underline'
                                        >
                                            ---
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h2 className='mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white'>
                                    Follow us
                                </h2>
                                <ul className='text-gray-500 dark:text-gray-400 font-medium'>
                                    <li className='mb-4'>
                                        <Link
                                            href='https://github.com/princessmaggy/'
                                            className='hover:underline '
                                        >
                                            Github
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href='https://twitter.com/princessmaggy7'
                                            className='hover:underline'
                                        >
                                            Twitter
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h2 className='mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white'>
                                    Legal
                                </h2>
                                <ul className='text-gray-500 dark:text-gray-400 font-medium'>
                                    <li className='mb-4'>
                                        <Link
                                            href='#'
                                            className='hover:underline'
                                        >
                                            Privacy Policy
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href='#'
                                            className='hover:underline'
                                        >
                                            Terms &amp; Conditions
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <hr className='my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8' />
                    <div className='sm:flex sm:items-center sm:justify-between'>
                        <span className='text-sm text-gray-500 sm:text-center dark:text-gray-400'>
                            © 2023
                            <Link
                                href='https://swiftin.vercel.app/'
                                className='hover:underline'
                            >
                                SwiftIN
                            </Link>
                            . All Rights Reserved.
                        </span>
                        <div className='flex mt-4 sm:justify-center sm:mt-0'>
                            <Link
                                href='#'
                                className='flex items-center space-x-3 rtl:space-x-reverse'
                            >
                                <Image
                                    src='/assets/facebook.svg'
                                    alt='fb'
                                    height={20}
                                    width={20}
                                />
                                <span className='sr-only'>Facebook page</span>
                            </Link>

                            <Link
                                href='#'
                                className='text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5'
                            >
                                <Image
                                    src='/assets/twitter.svg'
                                    alt='twiter'
                                    height={20}
                                    width={20}
                                />
                                <span className='sr-only'>Twitter page</span>
                            </Link>
                            <Link
                                href='#'
                                className='text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5'
                            >
                                <Image
                                    src='/assets/github.svg'
                                    width={20}
                                    height={20}
                                    className='h-10'
                                    alt='swiftin Logo'
                                />
                                <span className='sr-only'>GitHub account</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}

export default Footer;
