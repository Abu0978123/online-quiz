const express = require('express');
const jwt = require('jsonwebtoken')
require('dotenv/config')
const auth = require('./authToken')


const articleRoute = express.Router();

const Article = require('../model/Article');


articleRoute.get('/',auth,async (req, res) => {
    
    try{

        jwt.verify(req.headers.token,process.env.SECRET)
        
        const getArticle = await Article.find();
        res.json(getArticle)
    }
    catch(err){
        res.send(err.message)
    }
    

})
articleRoute.post('/',auth, async (req, res) => {

    const title = req.body.title;
    const author = req.body.author;
    const details = req.body.details;
   
 try{
     
    const savRes = await Article.create({
        title:title,
        author:author,
        details:details
    })
    res.send(savRes);
 }
catch(err){
    res.send(err.message)
}
   


})
articleRoute.patch('/:id',auth, async (req, res) => {

   
    
try{
    const updatedArticle = await Article.updateOne(
        {_id:req.params.id},
        {$set:{title:req.body.title}}
    )
    res.send(updatedArticle)
   }
   catch(err){
       res.send(err.message)
   }

})
articleRoute.delete('/:id',async (req, res) => {
   
try{
    const deletedArticle = await Article.findByIdAndDelete(req.params.id)
res.send(deletedArticle)
}
catch(err){
    console.log(err)
}


})
module.exports = articleRoute;