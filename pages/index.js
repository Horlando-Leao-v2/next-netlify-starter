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
        <style>{`
          .container {
            max-width: 800px;
            margin: 0 auto;
            padding: 2rem;
            font-family: Arial, sans-serif;
          }
          main {
            text-align: center;
          }
          .form-group {
            margin-bottom: 1rem;
          }
          label {
            display: block;
            margin-bottom: 0.5rem;
            font-weight: bold;
          }
          input {
            width: calc(100% - 2rem);
            padding: 0.5rem;
            border: 1px solid #ccc;
            border-radius: 4px;
          }
          button {
            background-color: #0070f3;
            color: white;
            padding: 0.75rem 1.5rem;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            transition: background-color 0.3s;
          }
          button:hover {
            background-color: #005bb5;
          }
          .response {
            margin-top: 2rem;
            text-align: left;
            word-break: break-word;
          }
        `}</style>
      </Head>

      <main>
        <Header title="Atendimento Automatizado" />
        <p className="description">
          Teste seu aplicativo WABA na META
        </p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="authToken">Auth Token:</label>
            <input
              type="text"
              id="authToken"
              value={authToken}
              placeholder="Sem o prefixo 'Bearer'"
              onChange={(e) => setAuthToken(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="appId">Phone Id:</label>
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
