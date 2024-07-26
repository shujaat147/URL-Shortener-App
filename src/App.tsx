import React, { useState } from 'react';
import Form from './components/UrlForm';
import List from './components/UrlList';

interface Url {
  original: string;
  shortened: string;
}

const App: React.FC = () => {
  const [urls, setUrls] = useState<Url[]>([]);

  const addShortenedUrl = (shortenedUrl: string, originalUrl: string) => {
    setUrls([...urls, { original: originalUrl, shortened: shortenedUrl }]);
  };

  return (
    <div className="container">
      <h1 className="my-4">URL Shortener</h1>
      <Form onSubmit={addShortenedUrl} />
      <List urls={urls} />
    </div>
  );
};

export default App;
