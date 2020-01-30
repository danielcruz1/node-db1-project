const server = require('./server.js');

const PORT = process.env.PORT || 4000;

server.get('/', (req, res) => {
  res.send('<h2>WELCOME TO THE ROCK!</h2>')
})

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});