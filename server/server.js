const http = require("http");
const app = require("./src/app");
const { loadPlanets } = require("./src/models/planets.model");

const PORT = 4000 || process.env.PORT;

const server = http.createServer(app);

const startServer = async () => {
  await loadPlanets();
  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

startServer();