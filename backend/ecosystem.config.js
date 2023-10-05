module.exports = {
  apps: [
    {
      name: "server",
      script: "./server.js",
      wacht: true,
      instances: "max",
      exec_mode: "cluster",
      env_production: {
        NODE_ENV: "production",
        PORT: "8080",
      },
    },
  ],
};
//!pm2 start process.json --env production
//?pm2 restart process.json --env development
