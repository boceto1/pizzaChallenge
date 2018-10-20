const bodyParser= require('body-parser');
const express= require('express');
const morgan= require('morgan');


const app= express()


app.use(express.static(__dirname+'/public'))
app.set('view engine', 'ejs');


//middlewares
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(morgan('dev'));



// Configuracion global de rutas
app.use(require('./routes/index'))


//test
app.get('/',(req,res)=>{
    console.log("Servicio levantado")
    res.status(200).send({message:"Up Service"})
})

module.exports = app
