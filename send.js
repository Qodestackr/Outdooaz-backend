// const amqp = require('amqplib/callback_api')
const amqplib = require('amqplib')

// const {exchange, queue, route} = require('../config/amqp')

const amqp_url = 'amqps://kpvlsiuh:9dvqSAhcdOSGrEtqkUfyuX4ujC-DdjPt@elk.rmq2.cloudamqp.com/kpvlsiuh'

async function produce(){
    console.log("Publishing");
    var conn = await amqplib.connect(amqp_url, "heartbeat=60");
    var ch = await conn.createChannel()
    var exch = 'test_exchange';
    var q = 'test_queue';
    var rkey = 'test_route';
    var msg = {name: 'winchy', age: 21, auth:true}
    await ch.assertExchange(exch, 'direct', {durable: true}).catch(console.error);
    await ch.assertQueue(q, {durable: true});
    await ch.bindQueue(q, exch, rkey);
    await ch.publish(exch, rkey, Buffer.from(JSON.stringify(msg))/*Buffer.from(msg)*/);

    console.log(`sent the message of :: ${msg}`)

    setTimeout( function()  {
        ch.close();
        conn.close();},  500 )
}

produce()