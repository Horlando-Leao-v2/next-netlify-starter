import Head from 'next/head'
import { useState } from 'react';
import Header from '@components/Header'
import Footer from '@components/Footer'

export default function Home() {
  const [authToken, setAuthToken] = useState('');
  const [appId, setAppId] = useState('');
  const [response, setResponse] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const url = `https://graph.facebook.com/v20.0/${appId}?fields=health_status`;
    const options = {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${authToken}`
      }
    };

    try {
      const res = await fetch(url, options);
      const data = await res.json();
      setResponse(data);
    } catch (error) {
      console.error('Error fetching data:', error);
      setResponse({ error: 'Failed to fetch data' });
    }
  };

  return (
    <div className="container">
      <Head>
        <title>Next.js Starter!</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Header title="Welcome to my app!" />
        <p className="description">
          Get started by editing <code>pages/index.js</code>
        </p>

        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="authToken">Auth Token:</label>
            <input
              type="text"
              id="authToken"
              value={authToken}
              onChange={(e) => setAuthToken(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="appId">App ID:</label>
            <input
              type="text"
              id="appId"
              value={appId}
              onChange={(e) => setAppId(e.target.value)}
              required
            />
          </div>
          <button type="submit">Submit</button>
        </form>

        {response && (
          <div className="response">
            <h3>Response:</h3>
            <pre>{JSON.stringify(response, null, 2)}</pre>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
