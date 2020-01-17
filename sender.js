const express = require('express');
const amqp = require('amqplib/callback_api');

const app = express();

amqp.connect('amqp://localhost', (err, conn) => {
    
    if (err) {
        console.log('Erro ao criar conexão');
    }

    conn.createChannel((err, ch) => {
        const queue = 'FirstQueue';
        const msg = {type: 2, content: 'Baldinho!'};

        ch.assertQueue(queue, { durable: false });
        ch.sendToQueue(queue, Buffer.from(JSON.stringify(msg)));
        console.log('Message was sent!');
    });

    setTimeout(() => {
        conn.close();
        process.exit(0);
    }, 500);
});

const port = 3333;

app.listen(port, () => console.log(`App listen on port ${port}`));
