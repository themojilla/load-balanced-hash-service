module.exports = {
  apps: [
    {
      name: 'hash-server-1',
      script: 'dist/index.js',
      instances: 1,
      env: {
        NODE_ENV: 'production',
        PORT: 3001,
        SERVER_ID: 'server1'
      },
      watch: false
    },
    {
      name: 'hash-server-2',
      script: 'dist/index.js',
      instances: 1,
      env: {
        NODE_ENV: 'production',
        PORT: 3002,
        SERVER_ID: 'server2'
      },
      watch: false
    },
    {
      name: 'hash-server-3',
      script: 'dist/index.js',
      instances: 1,
      env: {
        NODE_ENV: 'production',
        PORT: 3003,
        SERVER_ID: 'server3'
      },
      watch: false
    }
  ]
};