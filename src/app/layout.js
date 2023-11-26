import {Rubik} from 'next/font/google';
import Footer from './components/footer';
import Nav from './components/nav';
import './globals.css';

const rubik = Rubik({subsets: ['latin']});

export const metadata = {
    title: 'SwiftIn Event App',
    description: 'Check-in attendees at an event',
};

export default function RootLayout({children}) {
    return (
        <html lang='en'>
            <body className={rubik.className}>
                <Nav />
                {children}
                <Footer />
            </body>
        </html>
    );
}
