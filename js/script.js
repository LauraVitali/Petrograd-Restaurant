function init() {
    fetch("https://kea-alt-del.dk/t5/api/categories").then(r => r.json()).then(
        function (data) {
            categoriesReceived(data)
        })
}
init();

function categoriesReceived(cats) {
    createNavigation(cats);
    createSections(cats);
    fetchProducts();
}

function createNavigation(categories) {
    categories.forEach(cat => {
        const a = document.createElement("a");
        a.textContent = cat;
        a.setAttribute("href", `#${cat }`);
        document.querySelector("nav").appendChild(a);
    })
}

function fetchProducts() {

}

function createSections(categories) {
    //<section id="starters">
    //<h2>Starters</h2>
    categories.forEach(category => {
        const section = document.createElement("section");
        section.setAttribute("id", category);
        const h1 = document.createElement("h1");
        h1.textContent = category;
        section.appendChild(h1);
        document.querySelector(".productlist").appendChild(section);
    })
}


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

    if (myProduct.discount) {
        myCopy.querySelector(".price").classList.add("cancelled");
        myCopy.querySelector(".discount-price").classList.remove("hide");
    }

    if (myProduct.vegetarian) {
        myCopy.querySelector(".vegetarian").classList.remove("hide");
    }

    if (myProduct.soldout) {
        const p = document.createElement("p");
        p.textContent = "SOLD OUT";
        p.classList.add("soldout");
        myCopy.querySelector("article").appendChild(p);
    }

    //fill in the template
    myCopy.querySelector(".name").textContent = myProduct.name;
    myCopy.querySelector(".short-description").textContent = myProduct.shortdescription;
    myCopy.querySelector(".price").textContent = myProduct.price;

    const parentElemen = document.querySelector("section#" + myProduct.category);
    parentElemen.appendChild(myCopy);



    //append
    const parentElem = document.querySelector(".productlist");
    parentElem.appendChild(myCopy);
}

//close the modal when clicked
const modal = document.querySelector(".modal-background");
modal.addEventListener("click", () => {
    modal.classList.add("hide");
});
