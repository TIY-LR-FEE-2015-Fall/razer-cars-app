export default function(server) {
  server.create('car-type', {year: 2012, totalInventory: 10, manufacturer: 'Ford', modelName: 'F150', history: [1, 2, 3, 4, 5]});
  server.create('car-type', {year: 2015, totalInventory: 0, manufacturer: 'Porshe', modelName: '911'});
  server.createList('car-type', 4);
  server.createList('inventory-history', 1, {car: '1', checkOut: new Date(), checkIn: new Date()});
  server.createList('inventory-history', 5, {car: '1', checkOut: new Date()});
}
