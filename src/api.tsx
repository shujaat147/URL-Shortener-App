import axios from 'axios';
import { z } from 'zod';

const BASE_URL = 'https://spoo.me';

// Define Zod schema for URL
const urlSchema = z.string().url("Invalid URL");

export async function shortenUrl(originalUrl: string, alias?: string, password?: string, maxClicks?: number) {
    const data: any = { url: originalUrl };
    if (alias) data.alias = alias;
    if (password) data.password = password;
    if (maxClicks) data['max-clicks'] = maxClicks;

    try {
        const response = await axios.post(`${BASE_URL}/`, data, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error shortening URL:', error.response?.data || error.message);
        throw error;
    }
}
