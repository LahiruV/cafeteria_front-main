// local development URL
// const API_URL = 'http://localhost:5222';

// production URL
const API_URL = 'https://cafetaria-resturant.onrender.com';

// expose the API url on the global object so existing code can access it
// `globalThis` works in both browser and Node environments
globalThis.APIUrl = API_URL;

export default API_URL;
