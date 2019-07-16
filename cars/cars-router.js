const express = require('express');

const dbConnection = require('../data/db-config.js');

const router = express.Router();

// Get all cars
router.get('/', (req, res) => {});

// Add a new car
router.post('/', async (req, res) => {});

// Get a specific car by ID
router.get('/:id', async (req, res) => {});

// Delete a car
router.delete('/:id', async (req, res) => {});

// Update a car
router.put('/:id', async (req, res) => {});

module.exports = router;
