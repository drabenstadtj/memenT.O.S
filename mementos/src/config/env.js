/**
 * Environment configuration helper
 *
 * This file provides easy access to environment variables
 * and utility functions for environment-specific behavior
 */

export const env = {
  // Application environment
  APP_ENV: import.meta.env.VITE_APP_ENV || 'development',

  // API configuration
  API_URL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
  API_TIMEOUT: parseInt(import.meta.env.VITE_API_TIMEOUT || '30000', 10),

  // Feature flags
  ENABLE_DEBUG: import.meta.env.VITE_ENABLE_DEBUG === 'true',
  ENABLE_ANALYTICS: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',

  // Application metadata
  APP_TITLE: import.meta.env.VITE_APP_TITLE || 'mementO.S.',
  APP_VERSION: import.meta.env.VITE_APP_VERSION || '1.0.0',
};

/**
 * Check if running in development mode
 */
export const isDevelopment = () => env.APP_ENV === 'development';

/**
 * Check if running in production mode
 */
export const isProduction = () => env.APP_ENV === 'production';

/**
 * Conditional logger that only logs in development
 */
export const logger = {
  log: (...args) => {
    if (env.ENABLE_DEBUG) {
      console.log('[mementO.S.]', ...args);
    }
  },
  error: (...args) => {
    if (env.ENABLE_DEBUG) {
      console.error('[mementO.S.]', ...args);
    }
  },
  warn: (...args) => {
    if (env.ENABLE_DEBUG) {
      console.warn('[mementO.S.]', ...args);
    }
  },
  info: (...args) => {
    if (env.ENABLE_DEBUG) {
      console.info('[mementO.S.]', ...args);
    }
  },
};

/**
 * Get full API endpoint URL
 */
export const getApiUrl = (path = '') => {
  const baseUrl = env.API_URL.replace(/\/$/, ''); // Remove trailing slash
  const cleanPath = path.replace(/^\//, ''); // Remove leading slash
  return cleanPath ? `${baseUrl}/${cleanPath}` : baseUrl;
};

export default env;
