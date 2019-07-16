const express = require('express');

const dbConnection = require('../data/db-config.js');

const router = express.Router();

// Get all cars
router.get('/', (req, res) => {
  const { limit = 5, sortby = 'id', sortdir = 'desc' } = req.query;

  dbConnection('cars')
    .orderBy(sortby, sortdir)
    .limit(limit)
    .then(cars => {
      res.status(200).json(cars);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

// Add a new car
router.post('/', async (req, res) => {
  try {
    const {
      body,
      body: {
        VIN,
        make,
        model,
        mileage,
        transmissionType = 'unset',
        titleStatus = 'unset',
      },
    } = req;
    console.log(body);
    if (Object.entries(body).length === 0 && body.constructor === Object) {
      res.status(400).json({ message: 'No car data was provided.' });
    } else if (!VIN || !make || !model || !mileage) {
      res
        .status(400)
        .json({ message: 'Not all sufficent car data were provided.' });
    }

    const [id] = await dbConnection('cars').insert({
      VIN,
      make,
      model,
      mileage,
      transmissionType,
      titleStatus,
    });
    const newCar = await dbConnection('cars').where({ id });

    res.status(201).json(newCar);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Get a specific car by ID
router.get('/:id', async (req, res) => {});

// Delete a car
router.delete('/:id', async (req, res) => {});

// Update a car
router.put('/:id', async (req, res) => {});

module.exports = router;
