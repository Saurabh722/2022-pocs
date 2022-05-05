let purchasableItem;
let availableColors;
let availableSize;
let productDescription;
let crossSell;
let availableColorsList = [];
let availableSizeList = [];

function getColorObj (availableColors) {
    availableColors.forEach(element => {
        let color = {};
        color.element = element.parentElement;
        color.value = element.alt.slice(0, -5);
        availableColorsList.push(color);
    });
}

function getSizeObj (availableSize) {
    availableSize.forEach(element => {
        let size = {};
        size.element = element;
        size.value = element.dataset.value;
        availableSizeList.push(size);
    });
}

function getAvailableColors() {
    availableColors = purchasableItem[0].querySelectorAll(".fabric-purchasable-product-component-box-selectors-group-option > img")
    getColorObj(availableColors);
}

function getAvailableSize() {
    availableSize = purchasableItem[1].querySelectorAll(".fabric-purchasable-product-component-box-selectors-group-option")
    getSizeObj(availableSize);
}

function getProductDescription() {
    productDescription = document.querySelector(".fabric-purchasable-product-component .fabric-purchasable-product-component-description").textContent;
}

function productEventList() {
    purchasableItem = document.querySelectorAll(".fabric-purchasable-product-component .fabric-purchasable-product-component-box-selectors-group-options");
    crossSell = document.querySelectorAll(".fabric-cross-sell-purchasable-product-component");
    getAvailableColors();
    getAvailableSize();
    getProductDescription();
    console.log("Color !", availableColorsList);
    console.log("Size !", availableSizeList);
    console.log("description !", productDescription);
}

module.exports = productEventList;
