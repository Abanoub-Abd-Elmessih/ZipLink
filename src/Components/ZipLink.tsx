import axios from 'axios';
import React, { useState } from 'react'
import CopyToClipboard from 'react-copy-to-clipboard';
import { IoIosLink } from 'react-icons/io';

export default function ZipLink() {
  const [url, setUrl] = useState<string>('');
  const [isError, setIsError] = useState<string | null>(null);
  const [shortenedUrl, setShortenedUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);
  const token = 'ff33a3df8e4730f67305f3eadaef58c464f82b23';

  const ZippingUrl = async () => {
    try {
      const response = await axios.post(
        'https://api-ssl.bitly.com/v4/shorten',
        {
          long_url: url,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      setShortenedUrl(response.data.link);
    } catch (error) {
      console.log(error);
      setShortenedUrl(null);
      setIsError('Failed to shorten the URL. Please try again.');
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsError(null);
    if (url) {
      ZippingUrl();
    } else {
      setIsError('Please enter a valid URL.');
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center text-white">
        Zip Link <IoIosLink className="fs-2" />
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="urlInput" className="form-label text-white">
            Enter URL:
          </label>
          <input
            type="url"
            className="form-control"
            id="urlInput"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-wallpaper btn-lg fw-bold">
          Zipping URL
        </button>
      </form>

      {shortenedUrl && (
        <div className="mt-3">
          <h4 className="text-white">Zipped URL :</h4>
          <a
            className="alert alert-success mt-3 p-2 d-inline-block text-primary"
            href={shortenedUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {shortenedUrl}
          </a>
          <CopyToClipboard text={shortenedUrl} onCopy={() => setCopied(true)}>
            <button
              className={`btn ms-2 py-2 ${
                copied ? 'btn-success' : 'btn-outline-light fw-bold'
              }`}
            >
              {copied ? 'Copied!' : 'Copy URL'}
            </button>
          </CopyToClipboard>
        </div>
      )}

      {isError && <div className="alert alert-danger mt-3">{isError}</div>}
    </div>
  );

}
