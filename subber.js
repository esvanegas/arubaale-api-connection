"use strict";
const zmq = require("zeromq");
const sock = new zmq.Subscriber;
sock.connect("tcp://x.x.x.x:7779"); //Aruba ALE ip server
subscribeEvents(["presence","access_point"]); //events to subscribe, if you want to subscribe all events use "" instead
let protobuf = require("protobufjs");
let aleapi;

/**
 * ARUBA ALE event reciever using ZeroMQ and protobuffer
 * This gives you an example on how to establish a connection to Aruba ALE 
 * and how to handle different event types.
 * @author Esteban vanegas
 * @version 1.1.0
 */


async function run() {

    let protofile = await protobuf.load("./proto/aleapi.proto"); //load proto file
    //load global message from aleapi package
    //If package name has changed in aleapi.proto file you must need to change it here
    aleapi = protofile.lookupType("aleapi.nb_event");

    console.log("Subscriber connected to port 7779")
 
    for await (const [topic, msg] of sock) { //Recieves data of each event subscribed
        let topicName = getBuffertext(topic);
        console.log("received a message related to:", topicName, "containing message:");
        switchTopic(topicName,msg);
    }
}

/**
 * Switch topic
 * @param {String} topic topic
 * @param {Buffer} message Message
 */
function switchTopic(topic,message){
    switch(topic){
        case 'presence':
            let presence = decodeALEMessage(message);
            console.log(presence);
            break;
        case 'access_point':
            let access_point = decodeALEMessage(message);
            console.log(access_point);
            break;
        default:
            console.log({[topic]:{'buffer':message}});
            break;
    }
}

/**
 * Prototype Object to format Buffer Object result
 */
Object.prototype.formattingProtoBufObject=function(){
    if(this['sourceId']) this['sourceId']=bufferToHex(this['sourceId']).toUpperCase();
    if(this['presence']){
        if(this.presence['hashedStaEthMac']) this.presence['hashedStaEthMac']=bufferToHex(this.presence['hashedStaEthMac']).toUpperCase();
        if(this.presence['radioMac'].addr) this.presence['radioMac'].addr=bufferToHex(this.presence['radioMac'].addr).toUpperCase();
    };
    if(this['accessPoint']){
        if(this.accessPoint['apEthMac'].addr) this.accessPoint['apEthMac'].addr=bufferToHex(this.accessPoint['apEthMac'].addr).toUpperCase();
        if(this.accessPoint['apIpAddress'].addr) this.accessPoint['apIpAddress'].addr=getBufferIp(this.accessPoint['apIpAddress'].addr);
        if(this.accessPoint['managedBy'].addr) this.accessPoint['managedBy'].addr=getBufferIp(this.accessPoint['managedBy'].addr);
    }
    return this;
}

/**
 * Decode ALE Message
 * @param {Buffer} Buffer buffer to decode
 * @returns {Object} Object message decoded
 */
function decodeALEMessage(Buffer){
    let decoded = aleapi.decode(Buffer);
    let object = aleapi.toObject(decoded, {
        longs: String,
        enums: String
    });
    return object.formattingProtoBufObject();
}

/**
 * Get buffer text
 * @param {Buffer} buffer Buffer
 * @return {String} ASCCI buffer value
 */
function getBuffertext(buffer){
    let text="";
    for(let i=0;i<buffer.length;i++){
        text=text+String.fromCharCode((buffer[i]).toString());
    }
    return text;
}

/**
 * get Buffer HEX value
 * @param {Buffer} buffer Buffer
 * @returns {String} Buffer hex value
 */
function bufferToHex(buffer){
    let hexValString="";
    for(let i=0;i<buffer.length;i++){
        hexValString=hexValString+(buffer[i]).toString(16);
    }
    return hexValString;
}

/**
 * get Buffer Ip value
 * @param {Buffer} buffer buffer
 * @returns {String} Ip value
 */
function getBufferIp(buffer){
    let ip=[];
    for(let i=0;i<buffer.length;i++){
        ip[i]=(buffer[i]).toString();
    }
    return ip.join('.');
}

/**
 * Subscribe events to ALE API connection
 * @param {String[]} eventsArray Events to subscribe
 */
function subscribeEvents(eventsArray){
    for(let i=0;i<eventsArray.length;i++){
        sock.subscribe(eventsArray[i]);
    }
}

/**
 * Start Ale connection
 */
run()