import Mirage, {faker} from 'ember-cli-mirage';

export default Mirage.Factory.extend({
  year: 2015,
  manufacturer() {
    return faker.random.arrayElement([
      'Kia',
      'Toyota',
      'Jeep',
      'Nissan',
      'Mazda',
    ]);
  },

  modelName() {
    return faker.random.arrayElement([
      'Sorento',
      'Camry',
      'Cherokee',
      'Sentra',
      '3',
    ]);
  },

  totalInventory() {
    return faker.random.number();
  },
});
