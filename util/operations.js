const _ = require('underscore');

const Order = require('../models/order');
const clientsBD = require('../staticModels/clients');

let averageTotal = (orders) =>{

    let newOrders = orders.map( order => _.pick(order,'price'));
    let prices = newOrders.map(price => _.values(price))
    let justPrices = _.flatten(prices);
    let total = justPrices.reduce((acc, cur) =>acc + cur);
    let average = total / justPrices.length;

    return average;
}

let mostValuableCustomer = (orders) =>{

    let newOrders = orders.map( order => _.pick(order,'price','idClient'));

    let clients = orders.map( order => _.pick(order,'idClient'));
    let justClients = _.flatten(clients.map(client => _.values(client)));
    let justOnceClients = _.uniq(justClients)

    var clientesCount = {}

    justOnceClients.forEach(client => clientesCount[client]=0);

    newOrders.forEach(order => clientesCount[order.idClient]+=order.price)

    let major=0;
    let bestClientID=null;

    _.mapObject(clientesCount, (val, key)=> {
            if(val>major) {
                major=val;
                bestClientID=key;
            }
    });

    let client = clientsBD.filter(client => client.id == bestClientID)

    
    return client[0];


}

let mostPopularIngredients = (orders) =>{

    let newOrders = orders.map( order => _.pick(order,'pizzas'));
    let ingredients = Object.values(newOrders.map( newOrder => newOrder.pizzas.ingredients));
    let clearIngredientArray = _.flatten(ingredients);

    let ingredientsCount = {}

    clearIngredientArray.forEach(ingredients =>{
        if(ingredientsCount[ingredients]===undefined){
            ingredientsCount[ingredients]=1;
        }
        else{
            ingredientsCount[ingredients]+=1;
        }
    })

    let justIngredientsWithCount = Object.entries(ingredientsCount);

    for (let i = 0; i < justIngredientsWithCount.length; i++) {
        
        for (let j = i+1; j < justIngredientsWithCount.length; j++) {
            
            if(justIngredientsWithCount[i][1]<justIngredientsWithCount[j][1]){
                let aux = justIngredientsWithCount[i];
                justIngredientsWithCount[i]=justIngredientsWithCount[j];
                justIngredientsWithCount[j]=aux;
            }
        }
    }


    return justIngredientsWithCount;

}


module.exports ={
    averageTotal,
    mostValuableCustomer,
    mostPopularIngredients
}