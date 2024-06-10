"use strict"

window.onload = () => {

    console.log("mwahah - hello from product_details.js >:)")

    const urlParams = new URLSearchParams(location.search);

    console.log(urlParams.get("productId"))

    if(urlParams.has("productId")) {
        displayProductDetails(urlParams.get("productId"));

    }else {
        alert("no valid product Id");
        window.location.href = "./index.html";
    }
}

async function displayProductDetails(productId) {

    let productDetails = await getProductDetails(productId);

    console.log(productDetails);

    let productDetailsDiv = document.querySelector("#productDetails");

    productDetailsDiv.innerHTML = `
        <div> Product ID: ${productDetails.productId} </div>
        <div> Product Name: ${productDetails.productName} </div>
        <div> Unit Price: ${productDetails.unitPrice} </div>
        <div> Units In Stock: ${productDetails.unitsInStock} </div>
        <div> Category ID: ${productDetails.categoryId} </div>
        <div> Supplier: ${productDetails.supplier} </div>
        <div> Discontinued?: ${productDetails.discontinued} </div>







    `

}

async function getProductDetails(productId) {

    try {
        let response = await fetch("http://localhost:8081/api/products/" + productId);

        let data = response.json();

        return data;
    }catch(error){
        console.log(error);
        throw new Error(error);
    }

}