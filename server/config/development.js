module.exports = {
  logging: true,
  seed: true,
  database: {
    url: process.env.MONGOURL || 'mongodb://localhost:27017/example'
  }
}
