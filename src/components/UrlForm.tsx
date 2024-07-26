import React, { useState } from 'react';
import { z } from 'zod';
import { shortenUrl } from '../api'; // Import the API function

interface UrlFormProps {
    onSubmit: (originalUrl: string, shortenedUrl: string) => void;
}

const urlSchema = z.string().url("Invalid URL");

const UrlForm: React.FC<UrlFormProps> = ({ onSubmit }) => {
    const [originalUrl, setOriginalUrl] = useState('');
    const [alias, setAlias] = useState('');
    const [password, setPassword] = useState('');
    const [maxClicks, setMaxClicks] = useState<number | undefined>(undefined);
    const [error, setError] = useState('');
    const [shortenedUrl, setShortenedUrl] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            urlSchema.parse(originalUrl);
            const result = await shortenUrl(originalUrl, alias, password, maxClicks);
            setShortenedUrl(result.short_url);
            onSubmit(originalUrl, result.short_url);
            setOriginalUrl('');
            setAlias('');
            setPassword('');
            setMaxClicks(undefined);
            setError('');
        } catch (e) {
            if (e instanceof z.ZodError) {
                setError(e.errors[0].message);
            } else {
                setError('An error occurred while shortening the URL.');
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="urlInput" className="form-label">Enter URL</label>
                <input
                    type="url"
                    className="form-control"
                    id="urlInput"
                    value={originalUrl}
                    onChange={(e) => setOriginalUrl(e.target.value)}
                    required
                />
                <label htmlFor="aliasInput" className="form-label">Custom Alias (Optional)</label>
                <input
                    type="text"
                    className="form-control"
                    id="aliasInput"
                    value={alias}
                    onChange={(e) => setAlias(e.target.value)}
                />
                <label htmlFor="passwordInput" className="form-label">Password (Optional)</label>
                <input
                    type="password"
                    className="form-control"
                    id="passwordInput"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <label htmlFor="maxClicksInput" className="form-label">Max Clicks (Optional)</label>
                <input
                    type="number"
                    className="form-control"
                    id="maxClicksInput"
                    value={maxClicks || ''}
                    onChange={(e) => setMaxClicks(Number(e.target.value))}
                />
                {error && <div className="text-danger mt-2">{error}</div>}
                {shortenedUrl && <div className="text-success mt-2">Shortened URL: <a href={shortenedUrl} target="_blank" rel="noopener noreferrer">{shortenedUrl}</a></div>}
            </div>
            <button type="submit" className="btn btn-primary">Shorten</button>
        </form>
    );
};

export default UrlForm;
