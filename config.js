export default function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', 'https://natega-eg.vercel.app');
    
    const config = {
        proxyUrl: process.env.PROXY_URL || "https://holy-cherry-7a55.xitog45610.workers.dev/?url=",
        sourceDomain: process.env.SOURCE_DOMAIN || "https://than.nezakr.net",
        localFile: process.env.LOCAL_FILE || "results.csv",
        timeout: 15000,
        firebase: {
            apiKey: process.env.FIREBASE_API_KEY || "AIzaSyCu_dSvie4rBs18tF0zpojbREwQdIbuavI",
            authDomain: process.env.FIREBASE_AUTH_DOMAIN || "natega-c989c.firebaseapp.com",
            projectId: process.env.FIREBASE_PROJECT_ID || "natega-c989c",
            storageBucket: process.env.FIREBASE_STORAGE_BUCKET || "natega-c989c.firebasestorage.app",
            messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || "67961607225",
            appId: process.env.FIREBASE_APP_ID || "1:67961607225:web:7e36f0e5ef23e08467e9e8",
            measurementId: process.env.FIREBASE_MEASUREMENT_ID || "G-4TGFDQKTL7"
        }
    };
    
    res.status(200).json(config);
}
