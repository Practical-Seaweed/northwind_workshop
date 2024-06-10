"use strict";

window.onload = () => {
    console.log("mwahah - hello from product_search.js >:)");

    let productSearchDDL = document.querySelector("#productsSearchDDL");
    productSearchDDL.addEventListener("change", checkOptions);

    // getViewAllData(); // [ this shows all the products, it works ]
};

// [ this hides my table ]
function hideTable() {
    let tableOverall = document.querySelector("#allProductTable");
    tableOverall.style.display = "none";
}
// [ this shows my table :D ]
function showTable(){
    let tableOverall = document.querySelector("#allProductTable");
    tableOverall.style.display = "table";
}

function checkOptions() {
    let value = document.querySelector("#productsSearchDDL").value;

    if (value === "viewAll") {
        getViewAllData()
        showTable()
        console.log("you chose the viewAll option"); 
    } else if (value === "category"){
        // getCategoryData(); // [ dont have this yet ]
        console.log("you chose the category option")
    } else {
        if(value === ""){
            hideTable()
            console.log("you chose the Select one option");
        }
    }
}

// [ this gets my viewAll data(all the products)  ]
async function getViewAllData() {
    try {
        let response = await fetch('http://localhost:8081/api/products/');
        if (!response.ok) {
            throw new Error("Failed to fetch allProductsData");
        }
        let data = await response.json();
        // [ I want to make it so if the viewAll option from the select is chosen to show data ]
        makeViewAllDataTable(data); // [ this makes my data ]
    } catch (error) {
        console.error(`Error fetching ProductsData: ${error.message}`);
    }
}

async function makeViewAllDataTable(products) {
    try {
        let tbodyTable = document.querySelector("#tbodyTable");
        // Clear existing table rows
        tbodyTable.innerHTML = "";

        products.forEach(product => {
            let row = document.createElement("tr");
            row.innerHTML = `
                <td>${product.productName}</td>
                <td>${product.unitPrice}</td>
                <td>${product.unitsInStock}</td>
                <td>${product.categoryId}</td>
                <td>${product.supplier}</td>
                <td>${product.discounted ? 'Yes' : 'No'}</td>
            `;
            tbodyTable.appendChild(row);
        });
    } catch (error) {
        console.error(`Error making data table: ${error.message}`);
    }
}
