module.exports = {
  apps: [
    {
      name: "inventory-mgmt",
      script: "npm",
      args: "run dev",
      env: {
        NODE_ENV: "devleopment",
        ENV_VAR1: "environment-variable",
      },
    },
  ],
};
