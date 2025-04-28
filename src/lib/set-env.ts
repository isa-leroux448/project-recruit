export const DOMAIN = 
    process.env.NEXT_PUBLIC_REACT_APP_STAGE === "prod"
    ? process.env.DOMAIN_PROD
    : process.env.DOMAIN_DEV

export const MONGODB_URI = 
    process.env.NEXT_PUBLIC_REACT_APP_STAGE === "prod"
    ? process.env.MONGODB_URI_PROD
    : process.env.MONGODB_URI_DEV
