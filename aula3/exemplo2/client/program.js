const express = require('express');
const bodyParser = require('body-parser');
const grpcClient = require('./grpcClient');
const app = express();
const port = 3001;
const cors = require('cors');  

app.use(cors());  

app.use(bodyParser.json());

app.get('/stock/:symbol', (req, res) => {
  grpcClient.GetStock({ symbol: req.params.symbol }, (error, response) => {
    if (!error) {
      res.json(response);
    } else {
      res.status(500).json({ error: error.message });
    }
  });
});


app.listen(port, () => {
  console.log(`REST server running at http://localhost:${port}`);
});
