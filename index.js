"use-strict";

const retriever = require('node-ssdp').Client;
const client = new retriever();

const sender = require('node-ssdp').Server;
const server = new sender();

main();

function main(){
  initializeServer();
  initializeClient();
}


function initializeServer(){
    server.addUSN('upnp:rootdevice');
    server.addUSN('urn:schemas-upnp-org:device:MediaServer:1');
    server.addUSN('urn:schemas-upnp-org:service:ContentDirectory:1');
    server.addUSN('urn:schemas-upnp-org:service:ConnectionManager:1');

    server.on('advertise-alive', function (headers) {
      // Expire old devices from your cache.
      // Register advertising device somewhere (as designated in http headers heads)
    });

    server.on('advertise-bye', function (headers) {
      // Remove specified device from cache.
    });

    // start the server
    server.start();
    console.log("[SERVER] server started");

    process.on('exit', function(){
      server.stop() // advertise shutting down and stop listening
    })

}

function initializeClient(){
  client.search('ssdp:all');
  console.log("[CLIENT] search started")

  client.on("response", (headers, statusCode, rInfo)=> {
    console.log(rInfo);
  });

}
