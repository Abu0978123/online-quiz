const express = require('express')
const scoreRoute = express.Router();
const Score = require('../model/Score')
const auth = require('./authToken')

scoreRoute.get('/',  async (req, res) => {


    try {
        const getScore = await Score.find();
        res.json(getScore)
    }
    catch (err) {
        res.send(err.message)
    }


})

// scoreRoute.post('/', async (req, res) => {
//  try{
//     const s = await Score.create({
//         email:req.body.email,
//         score:req.body.score
//     })
//     res.send(s)
//  }
//  catch(err){
//      res.send(err)
//  }
// })


scoreRoute.post('/', async (req, res) => {

  
    
        const duplicate = await Score.findOne({ email: req.body.email })
      
        if (duplicate === null) {
          try{
            Score.create({
             
                email: req.body.email,
                score:req.body.score
               
            })
          }
          catch(err){
              res.send(err)
          }
            res.send(`${req.body.email} has been submitted thier result successfully.`)
        }
        else {
            res.send(`${req.body.email} has already submitted their result.`)
        }

    }
)


module.exports = scoreRoute