export const ENV_VARS = {
    GOOGLE_AUTH_CLIENT_ID: 'GOOGLE_AUTH_CLIENT_ID',
    GOOGLE_AUTH_CLIENT_SECRET: 'GOOGLE_AUTH_CLIENT_SECRET',
  };

  export const env = (key: string): string => {
    const value = process.env[key];
    if (!value) {
      throw new Error(`Missing environment variable: ${key}`);
    }
    return value;
  };
