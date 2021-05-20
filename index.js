const express = require('express');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');
const nomersRoutes = require('./routes/nomers');
const PORT = process.env.PORT || 3000;

const config = require('./mongo.config.json')

const app = express();
const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(express.urlencoded({extended: true}))
app.use(nomersRoutes)


async function start () {
    try{
      await mongoose.connect(`mongodb+srv://kostanios:${config.password}@cluster0.ondmp.mongodb.net/nomera`, {
        useNewUrlParser : true,
        useFindAndModify: false,
        useUnifiedTopology: true
      })
      app.listen(PORT, ()=>{
        console.log('server started at PORT ' + PORT)
      })
    } catch (e) {
        console.log(e)
    }
}

start()