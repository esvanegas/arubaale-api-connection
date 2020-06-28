# arubaale-api-connection
### Introduction
 This code's purpose was based on how to establish and handle events of Aruba ALE API. But could be used to other projects related to ZeroMQ or ProtoBuffers.
 
## Initial steps
### Pre - requirements
 Before continuing your ALE server must be able to receive events, to know that, login into your ALE server and type the following command:
 ```bash
 /opt/ale/bin/feed-reader
 ```
 If you can see events data, your server is prepared to establish the connection. If is not the case please dig into the problem and refer to [Aruba Airheads Community](http://community.arubanetworks.com)
 
 ### Installation method
 To run the code please clone the repo and execute the following command:
  ```bash
 npm install
 ```
 It is important to change the *Aruba ALE IP* on the *subber.js* file.
 
 ## Annexes
 1. [ALE example - @pthornycroft](https://github.com/pthornycroft/ALE-Demonstrator-2)
 2. [ALE sample code feed reader - Airheads](https://community.arubanetworks.com/t5/Aruba-Apps/Sample-java-code-for-ALE-feed-reader-protobuf-over-ZMQ/td-p/261481)
