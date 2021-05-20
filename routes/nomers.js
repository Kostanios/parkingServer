const { Router } = require('express');
const Nomer = require('../models/Nomer');
const router = Router();

router.get('/', async (req, res)=>{
   const nomers = await Nomer.find().lean()
   console.log(nomers)
   res.render('index',{
      title: 'номера',
      isIndex: true,
      nomers,
   });
})

router.post('/create', async (req, res)=>{
   const query = req.query
   const todo = new Nomer ({
      nomer: query.nomer,
      arrivalDate: new Date().getTime(),
   })
   await todo.save()

   res.redirect('/');
})

module.exports = router
