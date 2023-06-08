import nats from 'node-nats-streaming';

console.clear();

const stan = nats.connect('ticketing', 'abc', {
  url: 'http://localhost:4222',
});

stan.on('connect', () => {
  console.log('Publisher connected to NATS');

  const data = JSON.stringify({
    id: '576fn98435',
    name: 'finale',
    userId: 'cvx43534sdf'
  })

  stan.publish('ticket:created', data, ()=>{
    console.log('Event Published');
  })
});
