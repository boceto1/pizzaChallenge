/**
 * POST the order on /pizza
 * @param order 
 * 
 * ****************************
 * Please change '/pizza' with
 * your service endpoint below
 * ****************************
 */
function postOrder(order) {
    fetch('/confirmOrder', {
        method: 'POST',
        body: JSON.stringify(order),
        headers: {
            "Content-Type": "application/json; charset=utf-8",
        },
    })
        .then(res => res.json())
        .then(res => showNotification());
}

/**
 * Get the form and submit it with fetch API
 */
let orderForm = $("#order-form");
orderForm.submit((event) => {

    let order = getOrderData();
    postOrder(order);

    event.preventDefault();
    event.currentTarget.reset();
});

/**
 * Gets the order data with JQuery
 */
function getOrderData() {
    let ingredients = [];
    $.each($("input[name='ingredients']:checked"), function (el) {
        ingredients.push($(this).val());
    });

    return {
        name: $("input[name='name']").val(),
        address: $("input[name='address']").val(),
        phone: $("input[name='phone']").val(),
        size: $("input[name='size']:checked").val(),
        ingredients
    }
}

/**
 * Shows a notification when the order is accepted
 */
function showNotification() {
    let orderAlert = $("#order-alert");
    orderAlert.toggle()
    setTimeout(() => orderAlert.toggle(), 5000);
}
