"use strict";

window.onload = () => {
    console.log("mwahah - hello from product_search.js >:)");

    let productSearchDDL = document.querySelector("#productsSearchDDL");
    productSearchDDL.addEventListener("change", checkOptions);

    let categorySearchDDL = document.querySelector("#categorySearchDDL");
    categorySearchDDL.addEventListener("change", checkCategoryOptions);
    // getViewAllData(); // [ this shows all the products, it works ]
};

// [ this hides my table ]
function hideTable() {
    let tableOverall = document.querySelector("#allProductTable");
    tableOverall.style.display = "none";
}
// [ this shows my table :D ]
function showTable() {
    let tableOverall = document.querySelector("#allProductTable");
    tableOverall.style.display = "table";
}

function checkOptions() {
    let value = document.querySelector("#productsSearchDDL").value;

    let categorySearchDDL = document.querySelector("#categorySearchDDL");

    if (value === "viewAll") {
        getViewAllData();
        showTable();
        categorySearchDDL.style.display = "none"; // Hide the category dropdown
        console.log("you chose the viewAll option");
    } else if (value === "category") {
        // getCategoryData(); // [ dont have this yet ]
        getCategories();
        categorySearchDDL.style.display = "block";
        console.log("you chose the category option");
    } else {
        if (value === "") {
            hideTable();
            categorySearchDDL.style.display = "none";
            console.log("you chose the Select one option");
        }
    }
}


function checkCategoryOptions() {
    let productId = document.querySelector("#categorySearchDDL").value;

    if (productId) {
        getByCategories(productId);
        showTable();
    }
}


async function getByCategories(productId) {
    try {
        let response = await fetch(`http://localhost:8081/api/products/bycategory/${productId}`)
        if (!response.ok) {
            throw new Error("failed to fetch product by id");
        }
        let data = await response.json();
        makeDataTable(data);
    } catch (error){
        console.log(`Error fetching ProductsData: ${error.message}`);
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
        makeDataTable(data); // [ this makes my data ]
    } catch (error) {
        console.error(`Error fetching ProductsData: ${error.message}`);
    }
}

async function makeDataTable(products) {
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


// [ here is where ill make my search by category ]

async function getCategories() {

    try {
        let response = await fetch('http://localhost:8081/api/categories');
        if (!response.ok) {
            throw new Error("failed to fetch all categories");
        }
        let data = await response.json();
        populateCategories(data);
    } catch (error) {
        console.error(`Error fetching CategoriesData: ${error.message}`);
    }

}

function populateCategories(categories) {
    let categorySearchDDL = document.querySelector("#categorySearchDDL");
    categorySearchDDL.innerHTML = "";

    categories.forEach(category => {
        let option = document.createElement("option");
        option.value = category.categoryId;
        option.textContent = category.name;
        categorySearchDDL.appendChild(option);
    });

}


