"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiCall = void 0;
const axios_1 = __importDefault(require("axios"));
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const apiCall = async (req, res) => {
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
        let url;
        let responseType = 'json';
        if (type === 'aerial') {
            url = `https://aerialview.googleapis.com/v1/videos:lookupVideo?address=${encodeURIComponent(address)}&key=${key}`;
            responseType = 'json';
        }
        else if (type === 'streetview') {
            url = `https://maps.googleapis.com/maps/api/streetview?size=600x300&location=${encodeURIComponent(address)}&key=${key}`;
            responseType = 'arraybuffer'; // For image data
        }
        else {
            res.status(400).json({ error: 'Invalid type. Use "aerial" or "streetview"' });
            return;
        }
        const response = await axios_1.default.get(url, {
            responseType: responseType,
            timeout: 10000, // 10 second timeout
        });
        if (type === 'aerial') {
            res.status(200).json(response.data);
        }
        else if (type === 'streetview') {
            res.set('Content-Type', 'image/png'); // Assuming PNG, but Google returns JPEG usually
            res.status(200).send(response.data);
        }
    }
    catch (error) {
        let sanitizedError = 'An unknown error occurred while fetching data';
        if (axios_1.default.isAxiosError(error)) {
            sanitizedError = error.message || 'API request failed';
            // Redact the API key from any error messages
            sanitizedError = sanitizedError.replace(new RegExp(key, 'g'), '[REDACTED_API_KEY]');
            if (error.response) {
                // Add status code for more context
                sanitizedError += ` (HTTP ${error.response.status})`;
            }
            else if (error.code) {
                sanitizedError += ` (Code: ${error.code})`;
            }
        }
        res.status(500).json({ error: sanitizedError });
    }
};
exports.apiCall = apiCall;
