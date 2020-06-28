# arubaale-api-connection
### Introduction
 This code purpose was based on show how to establish and handle events of Aruba ALE API. But could be use to other projects related with ZeroMQ or ProtoBuffers.
 
## Initial steps
### Pre - requirements
 Before continue your ALE server must be able to recieve events, to know that log into your ALE server and type the following command
 ```bash
 /opt/ale/bin/feed-reader
 ```
 If you can see events data, your server is working to establish the connection, if is not the case please dig into the problem and refer to [Aruba Airheads Community](http://community.arubanetworks.com)
 
 ### Installation method
 To run the code please clone the repo and execute the following command:
  ```bash
 npm install
 ```
 It is important to change the *Aruba ALE IP* on the *subber.js* file.
 
 ## Annexes
 1. [ALE example - @pthornycroft](https://github.com/pthornycroft/ALE-Demonstrator-2)
 2. [ALE sample code feed reader - Airheads](https://community.arubanetworks.com/t5/Aruba-Apps/Sample-java-code-for-ALE-feed-reader-protobuf-over-ZMQ/td-p/261481)
