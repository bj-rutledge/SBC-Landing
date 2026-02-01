/**
 * This file tells TypeScript how to handle non-code file imports.
 * By declaring modules for these file types, we can import them
 * W
 * This file declares modules for image imports to prevent
 * TypeScript linting errors when using gatsby-plugin-image.
 * This file tells TypeScript how to handle non-code file imports.
 * By declaring modules for these file types, we can import them
 * in our .ts/.tsx files without causing type errors.
 */

declare module '*.css';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.png';
declare module '*.svg';
