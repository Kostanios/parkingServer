const { Router } = require('express');
const Nomer = require('../models/Nomer');
const router = Router();

router.get('/', async (req, res)=>{
   const nomers = await Nomer.find().lean()
   res.render('index',{
      title: 'номера',
      isIndex: true,
      nomers: nomers.map(machine => {machine.arrivalDate = new Date(Number(machine.arrivalDate)); return machine}),
   });
})

router.post('/create', async (req, res)=>{
   const query = req.query
   const nomers = await Nomer.find().lean()
   const dbnomer = nomers.find(machine => machine.nomer ===  query.nomer)
   console.log(`${dbnomer} - ${query.nomer}`)
   if (dbnomer) {
      const del = await Nomer.remove({nomer: query.nomer})
      console.log(del.deletedCount)
   } else {
      const todo = new Nomer ({
         nomer: query.nomer,
         arrivalDate: new Date().getTime(),
      })
      await todo.save()
   }
   //Nomer.remove()
   res.redirect('/');
})

module.exports = router
