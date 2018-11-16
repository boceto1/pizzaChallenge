const express = require('express');
const ctrlOrder = require('../controller/ctrlOrder');
const app = express();


/**
 * Gets
 */
app.get('/',(req,res)=>{

    res.render('index')
    
})



app.get('/orders',ctrlOrder.getOrders);

app.get('/order/:idOrder',ctrlOrder.getOrder);

app.get('/statistics',ctrlOrder.getStatistics);

/**
 * Post
 */

app.post('/confirmOrder',ctrlOrder.confirmOrder)

app.put('/saveOrder',(req,res)=>{
    res.json({ok:true,
        message:'Save order'});
})





app.get('/testOrder',(req,res)=>{
    res.json({ok:true,
        message:'El servicio de ordenar pizza esta levantado'});
})

module.exports = app;