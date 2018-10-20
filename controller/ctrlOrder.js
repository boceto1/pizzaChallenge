const Order = require('../models/order');
const clients = require('../staticModels/clients');
const sizes = require('../staticModels/sizesPizza');
const ingredents = require('../staticModels/ingredentsPizza'); 

//const _ = require('underscore');

/**
 * Guardar una pizza
 */

let confirmOrder = (req,res) =>{
    
    let body = req.body;
    let nameClient = body.name;


    let client = clients.filter(client => client.name === nameClient)
    let pizzas = {
        size : body.size,
        ingredients : body.ingredients
    }

    let price = calculatePrice(body.size,body.ingredients);

    console.log("Client Id",client[0].id);
    let order = new Order({
        idClient: client[0].id,
        date: Date.now(),
        state: 'confirmado',
        address:body.address,
        pizzas,
        price
    });
  
    
    order.save((err,orderDB)=>{

        if(err){
           return res.status(400).json({
                ok:false,
                err
            });  
        }
      
        res.status(201).json({ok:true,
            message:'Confirm Order'
        });
        
    });

}


let getOrders = (req,res)=>{
    
    Order.find({},(err,ordersBD)=>{
        
        getOrdersWithNames(ordersBD);
        res.render('orders',{
            orders:ordersBD
        })
    })
    
}

let getOrder = (req,res) =>{

    let idOrder = req.params.idOrder;

    Order.find({_id:idOrder},(err,orderBD)=>{
        
        getOrdersWithNames(orderBD);
        res.render('order',{
            order:orderBD
        })
    })



}



let calculatePrice  = (size,ingredientsE)=>{

    let price=0;

    let sizeT = sizes.filter(aSize => aSize.name === size)

    let priceIngredents = 0;
    
    ingredientsE.forEach(ingredent => {
        let price = ingredents.filter(ingredentL => ingredentL.name === ingredent);
        priceIngredents+=price[0].price;
    });

 
    return (sizeT[0].price+priceIngredents);

}

let getOrdersWithNames = (orders)=>{

    //let ordersObject = [];

    let ordersObject= orders.map(order =>{
        //let  orderCopy = {...order};  
        let client = clients.filter(client => client.id === order.idClient)
        order.name = client[0].name;
        console.log({order});
        //ordersObject.push(orderCopy)
        return order;
    })
    console.log({ordersObject});
}



module.exports ={
  confirmOrder,
  getOrders,
  getOrder
}





