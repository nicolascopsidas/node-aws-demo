import { Amplify } from 'aws-amplify';

// API endpoint for direct fetch calls
export const API_ENDPOINT = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/dev';

// This configuration would be updated with actual values after deployment
const amplifyConfig = {
  API: {
    endpoints: [
      {
        name: 'ecommerceAPI',
        endpoint: API_ENDPOINT,
        region: process.env.NEXT_PUBLIC_AWS_REGION || 'us-east-1'
      }
    ]
  }
};

// Initialize Amplify
export const configureAmplify = () => {
  Amplify.configure(amplifyConfig);
};

export default amplifyConfig;
