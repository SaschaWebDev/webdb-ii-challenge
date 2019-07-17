exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('cars')
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex('cars').insert([
        {
          vin: 'JH4KC1F37EC002467',
          make: 'toyota',
          model: 'camry',
          mileage: 1000,
          transmissionType: 'received',
          titleStatus: 'clean',
        },
        {
          vin: '5TDZK23C38S161678',
          make: 'audi',
          model: 'a6',
          mileage: 120000,
          transmissionType: 'canceled',
          titleStatus: 'salvage',
        },
        {
          vin: '1HGCM56374A162113',
          make: 'ford',
          model: 'fiesta',
          mileage: 40000,
          transmissionType: 'transfering',
          titleStatus: 'clean',
        },
        {
          vin: '3VW1K7AJXFM244823',
          make: 'bmw',
          model: 'm2',
          mileage: 20000,
        },
      ]);
    });
};
