import axios from 'axios';
import * as dotenv from 'dotenv';

dotenv.config();

interface Request {
  query: {
    type?: string;
    address?: string;
  };
  method?: string;
}

interface Response {
  set: (header: string, value: string) => void;
  status: (code: number) => { json: (data: any) => void; send: (data: any) => void };
  json: (data: any) => void;
  send: (data: any) => void;
}

export const apiCall = async (req: Request, res: Response) => {
  // Set CORS headers
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.set('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(204).send('');
    return;
  }

  const { type, address } = req.query;

  if (!type || !address) {
    res.status(400).json({ error: 'Missing type or address parameter' });
    return;
  }

  const key = process.env.GOOGLE_MAPS_API_KEY;
  if (!key) {
    res.status(500).json({ error: 'API key not configured' });
    return;
  }

  try {
    let url: string;
    let responseType: 'json' | 'arraybuffer' = 'json';

    if (type === 'aerial') {
      url = `https://aerialview.googleapis.com/v1/videos:lookupVideo?address=${encodeURIComponent(address)}&key=${key}`;
      responseType = 'json';
    } else if (type === 'streetview') {
      url = `https://maps.googleapis.com/maps/api/streetview?size=600x300&location=${encodeURIComponent(address)}&key=${key}`;
      responseType = 'arraybuffer'; // For image data
    } else {
      res.status(400).json({ error: 'Invalid type. Use "aerial" or "streetview"' });
      return;
    }

    const response = await axios.get(url, {
      responseType: responseType as any,
      timeout: 10000, // 10 second timeout
    });

    if (type === 'aerial') {
      res.status(200).json(response.data);
    } else if (type === 'streetview') {
      res.set('Content-Type', 'image/png'); // Assuming PNG, but Google returns JPEG usually
      res.status(200).send(response.data);
    }
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      if (type === 'aerial' && error.response.status === 404) {
        res.status(200).json({ error: 'No aerial view available' });
        return;
      } else if (type === 'streetview') {
        res.status(200).json({ error: 'No street view available' });
        return;
      }
    }

    let sanitizedError = 'An unknown error occurred while fetching data';

    if (axios.isAxiosError(error)) {
      sanitizedError = error.message || 'API request failed';

      // Redact the API key from any error messages
      sanitizedError = sanitizedError.replace(new RegExp(key!, 'g'), '[REDACTED_API_KEY]');

      if (error.response) {
        // Add status code for more context
        sanitizedError += ` (HTTP ${error.response.status})`;
      } else if (error.code) {
        sanitizedError += ` (Code: ${error.code})`;
      }
    }

    res.status(500).json({ error: sanitizedError });
  }
};