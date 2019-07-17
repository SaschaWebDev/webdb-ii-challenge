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
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const car = await dbConnection('cars').where({ id });

    if (car) {
      res.status(200).json(car);
    } else {
      res
        .status(404)
        .json({ message: `Car with the id of ${id} was not found.` });
    }
  } catch (err) {
    res.status(500).json({ message: `Failed to retrieve car of id ${id}.` });
  }
});

// Delete a car
router.delete('/:id', async (req, res) => {
  try {
    const {
      params: { id },
    } = req;

    const successFlag = await dbConnection('cars')
      .where({ id })
      .del();
    if (successFlag > 0) {
      res.status(200).json({ message: 'The car was removed successfully.' });
    } else {
      res.status(404).json({ message: 'The car could not be found.' });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
});

// Update a car
router.put('/:id', async (req, res) => {
  try {
    const {
      params: { id },
      body,
      body: { VIN, make, model, mileage, transmissionType, titleStatus },
    } = req;

    if (Object.entries(body).length === 0 && body.constructor === Object) {
      res.status(400).json({ message: 'No car data was provided.' });
    }

    const successFlag = await dbConnection('cars')
      .where({ id })
      .update({
        VIN: VIN,
        make: make,
        model: model,
        mileage: mileage,
        transmissionType: transmissionType,
        titleStatus: titleStatus,
      });
    if (successFlag > 0) {
      res
        .status(200)
        .json({ message: `The car with the id ${id} was updated` });
    } else {
      res.status(400).json({
        message: `The provided data to update a car with the id ${id} were not well formed.`,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: `There was an error updating the car with the id ${id}`,
    });
  }
});

module.exports = router;
