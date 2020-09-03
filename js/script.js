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

    //show images
    const img = myCopy.querySelector(".product-image");
    img.setAttribute("src", `https://kea-alt-del.dk/t5/site/imgs/medium/${myProduct.image}-md.jpg`);

    if(myProduct.discount){
        myCopy.querySelector(".price").classList.add("cancelled");
        myCopy.querySelector(".discount-price").classList.remove("hide");
    }

    if(myProduct.vegetarian){
        myCopy.querySelector(".vegetarian").classList.remove("hide");
    }

    if(myProduct.soldout){
        const p = document.createElement("p");
        p.textContent = "SOLD OUT";
        p.classList.add("soldout");
        myCopy.querySelector("article").appendChild(p);
    }

    //fill in the template
    myCopy.querySelector(".name").textContent = myProduct.name;
    myCopy.querySelector(".short-description").textContent = myProduct.shortdescription;
    myCopy.querySelector(".price").textContent = myProduct.price;

    //append
    const parentElem = document.querySelector("section#starters");
    parentElem.appendChild(myCopy);
}
