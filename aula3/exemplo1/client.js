const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const packageDefinition = protoLoader.loadSync('helloworld.proto', {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
});
const helloProto = grpc.loadPackageDefinition(packageDefinition).helloworld;

function main() {
  const client = new helloProto.Greeter('localhost:50051', grpc.credentials.createInsecure());
  const user = process.argv[2] || 'Mundo';

  client.sayHello({ name: user }, (err, response) => {
    if (err) {
      console.error(err);
    } else {
      console.log('Greeting:', response.message);
    }
  });
}

main();
