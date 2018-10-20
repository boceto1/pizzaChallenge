require('./config/config')

const mongoose = require('mongoose')
const app = require('./app')

mongoose.connect(process.env.URLDB,(err,res)=>{
    if (err) throw err

    console.log('Conexion establecida...')

    app.listen(process.env.PORT, ()=>{
        console.log(`Corriendo en el puerto: ${process.env.PORT}`)
    })
})