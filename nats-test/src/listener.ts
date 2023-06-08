import nats from 'node-nats-streaming';
import { TicketCreatedListener } from './events/ticket-created-listener';

console.clear();

const stan = nats.connect('ticketing', '123', {
    url: 'http://localhost:4222',
});

stan.on('connect', () => {
    console.log('Listener connected to NATS');

    stan.on('close', () =>{
        console.log('NATS Connection closed!');
        process.exit();
    })

    new TicketCreatedListener(stan).listen();
});

// FOR MAC: gracefully shutdown
process.on('SIGINT', ()=> stan.close()) //Intterupt signal
process.on('SIGTERM', ()=> stan.close()) // terminate signal

