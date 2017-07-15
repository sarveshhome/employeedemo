const express = require('express');
const router = express.Router();

//Employee Model
let Employee = require('../models/employee');

//add Route
router.get('/add', function(req, res) {
    res.render('add Employee', {
        fname: 'Add Employee'
    });
});