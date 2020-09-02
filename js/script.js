//fetch data
fetch("https://kea-alt-del.dk/t5/api/productlist")
    .then(function (res) {
        console.log(res);
        return res.json();
    })
    .then(function (data) {
        console.log(data);
        dataReceived(data)
    })

function dataReceived(products) {
    //loop through products
    products.forEach(showProduct)

}

//executed once for each product
function showProduct(myProduct) {
    //find template
    const temp = document.querySelector("#product-template").content;

    //clone template
    const myCopy = temp.cloneNode(true);

    //fill in the template
    myCopy.querySelector(".name").textContent = myProduct.name;

    //append
    const parentElem = document.querySelector("section#starters");
    parentElem.appendChild(myCopy);
}
