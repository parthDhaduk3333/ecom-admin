import dotenv from 'dotenv';

dotenv.config();


export const { APP_PORT, MONGO_URL, SESSION_SECRET } = process.env;
export let imageBaseUrl;
