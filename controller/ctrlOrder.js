const Order = require('../models/order');
const clients = require('../staticModels/clients');
const sizes = require('../staticModels/sizesPizza');
const ingredents = require('../staticModels/ingredentsPizza');
const operations = require('../util/operations')

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
        
        let orders = getOrdersWithNames(ordersBD);
        console.log(orders[0].client.name);
        res.render('orders',{
            orders
        })
    })
    
}

let getOrder = (req,res) =>{

    let idOrder = req.params.idOrder;

    Order.find({_id:idOrder},(err,orderBD)=>{

        let order = getOrdersWithNames(orderBD)[0];

        let header = {
            id : order._id,
            name : order.client.name,
            address : order.address,
            phone : order.client.phone,
            total: order.price
        }

        let details = {
            size: order.pizzas.size,
            ingredents : order.pizzas.ingredients
        }


        res.render('order',{
            header,
            details
        })
     
    })
        
        

}

let getStatistics = (req,res)=>{

    Order.find({},(err,ordersBD)=>{
        
        let average = operations.averageTotal(ordersBD);
        let bestClient = operations.mostValuableCustomer(ordersBD);
        let popularIngredients = operations.mostPopularIngredients(ordersBD)

        let just3Ingredients = popularIngredients .slice(0,3);

        console.log(just3Ingredients)

        
        res.render('statistics',{
            average,
            bestClient,
            just3Ingredients
        })
    })

}



/**
 * Funciones de Apoyo
 */

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


    let ordersObject= orders.map(order =>{
          
        let client = clients.filter(client => client.id === order.idClient)
        order.client = client[0];
        return order;
    })

    return ordersObject;
}





module.exports ={
  confirmOrder,
  getOrders,
  getOrder,
  getStatistics
}





