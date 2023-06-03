const express = require('express');
require('dotenv/config')

const topicRoute = express.Router();
const Topic = require('../model/Topic');



topicRoute.get('/', async (req,res) => {

    try{
        const getTopics = await Topic.find()
        res.json(getTopics)
    }
    catch(err){
        res.status(400).send(err)
    }

})
topicRoute.post('/', async (req, res) => {

    const topic = req.body.topic
    const catagory= req.body.catagory
       try {

        const savRes = await Topic.create({
            topic:topic,
            catagory:catagory   
        })
        res.send(savRes);
    }
    catch (err) {
        res.send(err)
    }
})

topicRoute.delete('/:id', async (req,res) => {
    try {
        const deletedTopic = await Topic.findByIdAndDelete(req.params.id)
        res.send(deletedTopic)
    }
    catch (err) {
       res.send(err)
    }
})
module.exports =topicRoute