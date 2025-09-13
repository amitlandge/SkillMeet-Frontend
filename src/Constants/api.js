const server = import.meta.env.VITE_SERVER;

console.log("Backend API:", server);
// 👉 in dev: http://localhost:5000/api
// 👉 in prod: https://api.skillmeet.com/api
export { server };
