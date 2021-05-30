module.exports = {
  apps: [
    {
      name: 'truly-server',
      script: './src/index.js',
      instances: 'max',
      exec_mode: 'cluster'
    }
  ]
};
