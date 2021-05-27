const http = require('http');
const PORT = process.env.PORT || 5000;
const { matchRoute } = require('./helpers');
const mongoose = require('mongoose');
const routes = require('./routes');

mongoose
  .connect(
    'mongodb+srv://admin:admin@cluster0.c4xra.mongodb.net/PuAc?retryWrites=true&w=majority',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    }
  )
  .then((_) => console.log('Connected to DB!'))
  .catch((err) => console.log(err));

http
  .createServer(async (req, res) => await matchRoute(req, res, routes))
  .listen(PORT, () => console.log(`Server is now running at port:${PORT}`));
