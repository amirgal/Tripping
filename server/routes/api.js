const express = require('express')
const router = express.Router()
const request = require('axios')   
const Trip = require('../models/LocationModel') 
const Location = require('../models/TripModel') 


module.exports = router