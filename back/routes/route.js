const express = require('express');
const { getURL, addURL } = require('../controllers/reqLogic');

const Router = express.Router();

Router.get('/:urlID' , getURL)
Router.post('/' , addURL)
Router.all('*', (req,res) => {
    res.status(404).send("Error 404")
})


module.exports = Router