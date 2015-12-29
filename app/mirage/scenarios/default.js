export default function(server) {
  server.create('carType', {year: 2012, totalInventory: 10, manufacturer: 'Ford', modelName: 'F150', history: [1, 2, 3, 4, 5]});
  server.create('carType', {year: 2015, totalInventory: 0, manufacturer: 'Porshe', modelName: '911'});
  server.createList('carType', 4);
  server.createList('inventoryHistory', 1, {car: '1', checkOut: new Date(), checkIn: new Date()});
  server.createList('inventoryHistory', 5, {car: '1', checkOut: new Date()});
}
