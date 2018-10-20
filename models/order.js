const mongoose = require('mongoose');

let Schema = mongoose.Schema;

/**
 * Restricciones
 */
let stateAllow = {
    values:['guardado','confirmado'],
    message: '{VALUE} no es un rol válido'
};

/**
 * Modelos
 */

const PizzaSchema = new mongoose.Schema({
        size:{type:String},
        ingredients:[]
  })


var OrderSchema = new Schema({
    idClient: {
        type: Number,
        required: [true, 'id of Client is required'],
    },
    date: {
        type: Date,
        required: true
    },
    address: String,
    state: {
        type: String,
        enum: stateAllow,
        required: true
    },
    pizzas:PizzaSchema,
    price:{type:Number,default:0}
    
});


module.exports = mongoose.model('Order', OrderSchema);