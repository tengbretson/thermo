import { Interface } from 'readline';
import { createServer } from 'net';
import { MongoClient } from 'mongodb';

const DB_URL = 'mongodb://localhost:27017/test';
const MAC_PATTERN = /([0-9a-f]{1,2}[\.:-]){5}([0-9a-f]{1,2})/ig;

MongoClient.connect(DB_URL, (error, db) => {
  if (error) console.error(`Mongo connection failed: ${error.message}`);

  const arp_server = createServer(connection =>
    new Interface(connection, null).on('line', line =>
      (line.match(MAC_PATTERN) || [])
        .map(mac => mac.toUpperCase())
        .forEach(mac => arp_server.emit('mac', mac))
    )
  );

  arp_server.on('mac', mac =>
    db.collection('presence')
      .update({ mac }, { mac, lastSeen: new Date }, { upsert: true })
  );

  arp_server.listen(9090);
});
