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

//https://www.cloudamqp.com/docs/nodejs.html
// https://api.cloudamqp.com/console/bf0e94e9-8e4b-412c-bce5-1c2da061be00/details
//https://github.com/squaremo/amqp.node/
//https://www.cloudamqp.com/blog/part1-rabbitmq-for-beginners-what-is-rabbitmq.html
//https://www.cloudkarafka.com/
//https://www.cloudamqp.com/blog/how-to-run-rabbitmq-with-nodejs.html