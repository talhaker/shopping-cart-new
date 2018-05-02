// an array with all of our cart items
var cart = [];
let totalPrice = 0;

var updateCart = function() {
    // TODO: Write this function. In this function we render the page.
    // Meaning we make sure that all our cart items are displayed in the browser.
    // Remember to empty the "cart div" before you re-add all the item elements.

    let cartList = $('.cart-list');
    cartList.empty();

    // Grab the template script
    var theTemplateScript = $("#list-item-template").html();

    // Compile the template
    var listItemTemplate = Handlebars.compile(theTemplateScript);

    for (let ix = 0; ix < cart.length; ix++) {
        // Create a single item in the list
        // Pass our data to the template
        var listItemHtml = listItemTemplate(cart[ix]);

        // Add the compiled html to the page
        $(listItemHtml).appendTo(cartList);
    }

    $('.total').text(totalPrice);
}

var addItem = function(item) {
    // TODO: Write this function. Remember this function has nothing to do with display. 
    // It simply is for adding an item to the cart array, no HTML involved - honest ;-)

    // Check if item already in array
    let itemIndex = cart.findIndex(function(elem) {
        return (elem.name === item.name);
    })

    if (itemIndex === -1) {
        // Item not yet in array
        cart.push(item);
    } else {
        // Item already exists - increment count
        cart[itemIndex].count++;
    }

    totalPrice += item.price;
}

var removeItem = function(itemName) {
    // TODO: Write this function. Remember this function has nothing to do with display. 
    // It simply is for adding an item to the cart array, no HTML involved - honest ;-)

    // Check if item already in array
    let itemIndex = cart.findIndex(function(elem) {
        return (elem.name === itemName);
    })
    if (itemIndex === -1) {
        // Item yet in array - issue message
        alert('Item ' + itemName + ' not in cart!');
    } else {
        // Item exists - decrement count and update total
        totalPrice -= cart[itemIndex].price;

        cart[itemIndex].count--;
        if (cart[itemIndex].count === 0) {
            cart.splice(itemIndex, 1);
        }
    }
}

var clearCart = function() {
    // TODO: Write a function that clears the cart ;-)
    while (cart.length > 0) {
        cart.pop();
    }
    totalPrice = 0;
    updateCart();
}

$('.view-cart').on('click', function() {
    // TODO: hide/show the shopping cart!
    $('.shopping-cart').toggle();
});

$('.add-to-cart').on('click', function() {
    // TODO: get the "item" object from the page
    let itemInfo = $(this).closest('.card-item');
    let item = {
        "name": itemInfo.data().name,
        "count": 1,
        "price": itemInfo.data().price
    }

    addItem(item);
    updateCart();
});

$('.remove-from-cart').on('click', function() {
    // TODO: get the "item" object from the page
    let itemInfo = $(this).closest('.card-item');

    removeItem(itemInfo.data().name);
    updateCart();
});

$('.clear-cart').on('click', function() {
    clearCart();
});

// update the cart as soon as the page loads!
updateCart();