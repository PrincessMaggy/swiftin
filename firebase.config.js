import {initializeApp} from 'firebase/app';
import {getAnalytics} from 'firebase/analytics';
import {getAuth} from 'firebase/auth';

const firebaseConfig = {
    apiKey: 'AIzaSyD-arai26trnteetmHoKNmQU1X-Jq6FteE',
    authDomain: 'swiftin-acaec.firebaseapp.com',
    projectId: 'swiftin-acaec',
    storageBucket: 'swiftin-acaec.appspot.com',
    messagingSenderId: '399496062536',
    appId: '1:399496062536:web:19b467123db79f7e265a7d',
    measurementId: 'G-VTXPKYB8M7',
};

// Initialize Firebase
const auth = initializeApp(firebaseConfig);
export const app = getAuth(auth);
const analytics = getAnalytics(auth);
