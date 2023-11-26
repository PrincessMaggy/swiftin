import React from 'react';
import Link from 'next/link';

export default function NotFound() {
    return (
        <div className='text-center'>
            <h2 className='text-3xl'>We hit a brick wall.</h2>
            <p>We cound not find the page you were looking for.</p>
            <p>
                Go back to the <Link href='/'>homepage</Link>{' '}
            </p>
        </div>
    );
}
