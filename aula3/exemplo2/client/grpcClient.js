const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const PROTO_PATH = './stock.proto';

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
});

const stockProto = grpc.loadPackageDefinition(packageDefinition).stock;
const client = new stockProto.StockService('127.0.0.1:50051', grpc.credentials.createInsecure());

module.exports = client;
