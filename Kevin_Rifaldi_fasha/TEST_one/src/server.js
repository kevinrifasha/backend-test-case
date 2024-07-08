const app = require('./app');

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Mini Library API listening at http://localhost:${port}`);
});
