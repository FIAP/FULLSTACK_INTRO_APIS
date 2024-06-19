const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const fs = require('fs');
const path = require('path');
const PROTO_PATH = './stock.proto';

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
});

const stockProto = grpc.loadPackageDefinition(packageDefinition).stock;

const mockDataPath = path.join(__dirname, 'data.json');
const mockData = JSON.parse(fs.readFileSync(mockDataPath, 'utf8'));

function getCurrentDateFormatted() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0'); // Janeiro é 0!
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

const server = new grpc.Server();

server.addService(stockProto.StockService.service, {
  GetStock: (call, callback) => {
    const symbol = call.request.symbol;
    const currentDate = getCurrentDateFormatted();

    if (mockData['Meta Data']['2. Symbol'] === symbol) {
      const history = {};
      for (const [date, data] of Object.entries(mockData['Time Series (Daily)'])) {
        history[date] = {
          open: data['1. open'],
          high: data['2. high'],
          low: data['3. low'],
          close: data['4. close'],
          volume: data['5. volume']
        };
      }

      callback(null, { symbol, history });
    } else {
      callback({
        code: grpc.status.NOT_FOUND,
        details: 'Not Found'
      });
    }
  }
});

server.bindAsync('127.0.0.1:50051', grpc.ServerCredentials.createInsecure(), () => {
  console.log('Server running at http://127.0.0.1:50051');
  server.start();
});
