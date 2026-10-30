
/* =========================================
   PAGE NAVIGATION
========================================= */

const pageSections = [
    document.getElementById("home"),
    document.getElementById("how-it-works"),
    document.getElementById("explore"),
    document.getElementById("about"),
    document.querySelector(".ai-section"),
    document.getElementById("relive-flow"),
    document.getElementById("reuse-section"),
    document.getElementById("repair-section"),
    document.getElementById("scrap-section")
];


function showPage(section) {

    pageSections.forEach(function (page) {

        if (page) {
            page.style.display = "none";
        }

    });

    if (section) {
        section.style.display = "block";
    }

    window.scrollTo({
        top: 0,
        behavior: "instant"
    });

}


/* =========================================
   NAVBAR
========================================= */

const homeLink =
    document.querySelector('.nav-links a[href="#home"]');

const howItWorksLink =
    document.querySelector('.nav-links a[href="#how-it-works"]');

const exploreLink =
    document.querySelector('.nav-links a[href="#explore"]');

const aboutLink =
    document.querySelector('.nav-links a[href="#about"]');


if (homeLink) {
    homeLink.addEventListener("click", function (event) {

        event.preventDefault();

        document.body.classList.remove("flow-open");

        showPage(document.getElementById("home"));

    });
}


if (howItWorksLink) {
    howItWorksLink.addEventListener("click", function (event) {

        event.preventDefault();

        document.body.classList.remove("flow-open");

        showPage(document.getElementById("how-it-works"));

    });
}


if (exploreLink) {
    exploreLink.addEventListener("click", function (event) {

        event.preventDefault();

        document.body.classList.remove("flow-open");

        showPage(document.getElementById("explore"));

        loadItems();

    });
}


if (aboutLink) {
    aboutLink.addEventListener("click", function (event) {

        event.preventDefault();

        document.body.classList.remove("flow-open");

        showPage(document.getElementById("about"));

    });
}


/* =========================================
   GET STARTED
========================================= */

const getStartedBtns =
    document.querySelectorAll(".get-started-btn");

const reliveFlow =
    document.getElementById("relive-flow");

const flowBackBtn =
    document.getElementById("flow-back-btn");


getStartedBtns.forEach(function (button) {

    button.addEventListener("click", function (event) {

        event.preventDefault();

        showPage(reliveFlow);

        document.body.classList.add("flow-open");

    });

});


/* =========================================
   BACK FROM GET STARTED
========================================= */

if (flowBackBtn) {

    flowBackBtn.addEventListener("click", function () {

        document.body.classList.remove("flow-open");

        showPage(document.getElementById("home"));

    });

}


/* =========================================
   PATH SELECTION
========================================= */

const pathBtns =
    document.querySelectorAll(".path-btn");


pathBtns.forEach(function (button) {

    button.addEventListener("click", function () {

        let selectedSection = null;

        if (button.classList.contains("reuse-btn")) {

            selectedSection =
                document.getElementById("reuse-section");

        }

        if (button.classList.contains("repair-btn")) {

            selectedSection =
                document.getElementById("repair-section");

        }

        if (button.classList.contains("scrap-btn")) {

            selectedSection =
                document.getElementById("scrap-section");

        }

        if (selectedSection) {
            showPage(selectedSection);
        }

    });

});


/* =========================================
   BACK FROM PATH FORMS
========================================= */

const pathBackBtns =
    document.querySelectorAll(".path-back-btn");


pathBackBtns.forEach(function (button) {

    button.addEventListener("click", function () {

        showPage(reliveFlow);

    });

});


/* =========================================
   REUSE / SELL
========================================= */

const reuseSubmitBtn =
    document.getElementById("reuse-submit-btn");


if (reuseSubmitBtn) {

    reuseSubmitBtn.addEventListener("click", async function () {

        const itemName =
            document.getElementById("reuse-item-name").value.trim();

        const category =
            document.getElementById("reuse-category").value;

        const description =
            document.getElementById("reuse-description").value.trim();

        const price =
            document.getElementById("reuse-price").value;

        const location =
            document.getElementById("reuse-location").value.trim();


        if (
            itemName === "" ||
            category === "" ||
            description === "" ||
            price === "" ||
            location === ""
        ) {

            alert("Please fill in all the fields.");

            return;

        }


        if (Number(price) < 0) {

            alert("Price cannot be negative.");

            return;

        }


        try {

            const response = await fetch(
                "http://localhost:5000/api/items",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        name: itemName,
                        category: category,
                        description: description,
                        price: Number(price),
                        location: location
                    })
                }
            );


            const data = await response.json();


            if (response.ok) {

                alert("Item listed successfully!");

                document.getElementById("reuse-item-name").value = "";
                document.getElementById("reuse-category").value = "";
                document.getElementById("reuse-description").value = "";
                document.getElementById("reuse-price").value = "";
                document.getElementById("reuse-location").value = "";

            } else {

                alert(
                    "Failed to list item: " + data.message
                );

            }

        } catch (error) {

            console.error("Error:", error);

            alert("Could not connect to the ReLive server.");

        }

    });

}


/* =========================================
   REPAIR & SELL
========================================= */

const repairSubmitBtn =
    document.getElementById("repair-submit-btn");


if (repairSubmitBtn) {

    repairSubmitBtn.addEventListener("click", async function () {

        const itemName =
            document.getElementById("repair-item-name").value.trim();

        const category =
            document.getElementById("repair-category").value;

        const description =
            document.getElementById("repair-description").value.trim();

        const location =
            document.getElementById("repair-location").value.trim();


        if (
            itemName === "" ||
            category === "" ||
            description === "" ||
            location === ""
        ) {

            alert("Please fill in all the fields.");

            return;

        }


        try {

            const response = await fetch(
                "http://localhost:5000/api/repairs",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        itemName: itemName,
                        category: category,
                        description: description,
                        location: location
                    })
                }
            );


            const data = await response.json();


            if (response.ok) {

                alert("Repair request submitted successfully!");

                document.getElementById("repair-item-name").value = "";
                document.getElementById("repair-category").value = "";
                document.getElementById("repair-description").value = "";
                document.getElementById("repair-location").value = "";

            } else {

                alert(
                    "Failed to submit repair request: " + data.message
                );

            }

        } catch (error) {

            console.error("Error:", error);

            alert("Could not connect to the ReLive server.");

        }

    });

}


/* =========================================
   SCRAP
========================================= */

const scrapSubmitBtn =
    document.getElementById("scrap-submit-btn");


if (scrapSubmitBtn) {

    scrapSubmitBtn.addEventListener("click", async function () {

        const category =
            document.getElementById("scrap-category").value;

        const quantity =
            document.getElementById("scrap-quantity").value;

        const unit =
            document.getElementById("scrap-unit").value;

        const location =
            document.getElementById("scrap-location").value.trim();


        if (
            category === "" ||
            quantity === "" ||
            location === ""
        ) {

            alert("Please fill in all the fields.");

            return;

        }


        if (Number(quantity) <= 0) {

            alert("Quantity must be greater than zero.");

            return;

        }


        try {

            const response = await fetch(
                "http://localhost:5000/api/scrap",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        category: category,
                        quantity: Number(quantity),
                        unit: unit,
                        location: location
                    })
                }
            );


            const data = await response.json();


            if (response.ok) {

                alert("Scrap pickup request submitted successfully!");

                document.getElementById("scrap-category").value = "";
                document.getElementById("scrap-quantity").value = "";
                document.getElementById("scrap-unit").value = "kg";
                document.getElementById("scrap-location").value = "";

            } else {

                alert(
                    "Failed to submit scrap request: " + data.message
                );

            }

        } catch (error) {

            console.error("Error:", error);

            alert("Could not connect to the ReLive server.");

        }

    });

}


/* =========================================
   MARKETPLACE ELEMENTS
========================================= */

const itemsContainer =
    document.getElementById("items-container");

const searchInput =
    document.getElementById("search-input");

const categoryFilter =
    document.getElementById("category-filter");

const sortFilter =
    document.getElementById("sort-filter");

const itemModal =
    document.getElementById("item-modal");

const closeModalBtn =
    document.getElementById("close-modal");

const modalItemDetails =
    document.getElementById("modal-item-details");


let allItems = [];


/* =========================================
   CATEGORY ICONS
========================================= */

const categoryIcons = {
    books: "📚",
    furniture: "🪑",
    electronics: "📱",
    bicycles: "🚲",
    bicycle: "🚲",
    other: "📦"
};


/* =========================================
   FETCH ITEMS FROM MONGODB
========================================= */

async function loadItems() {

    if (!itemsContainer) {
        return;
    }

    itemsContainer.textContent = "Loading items...";

    try {

        const response = await fetch(
            "http://localhost:5000/api/items"
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Unable to fetch items");
        }

        allItems = Array.isArray(data.items) ? data.items : [];

        renderItems();

    } catch (error) {

        console.error("Error loading items:", error);

        itemsContainer.textContent =
            "Unable to load items. Please try again.";

    }

}


/* =========================================
   SEARCH, FILTER AND SORT
========================================= */

function getFilteredItems() {

    let filteredItems = [...allItems];


    // SEARCH BY ITEM NAME

    const searchText =
        searchInput ? searchInput.value.trim().toLowerCase() : "";

    if (searchText !== "") {

        filteredItems = filteredItems.filter(function (item) {

            return item.name.toLowerCase().includes(searchText);

        });

    }


    // FILTER BY CATEGORY

    const selectedCategory =
        categoryFilter ? categoryFilter.value : "all";

    if (selectedCategory !== "all") {

        filteredItems = filteredItems.filter(function (item) {

            return item.category.toLowerCase() === selectedCategory;

        });

    }


    // SORT ITEMS

    const selectedSort =
        sortFilter ? sortFilter.value : "newest";

    if (selectedSort === "low-high") {

        filteredItems.sort(function (a, b) {
            return Number(a.price) - Number(b.price);
        });

    } else if (selectedSort === "high-low") {

        filteredItems.sort(function (a, b) {
            return Number(b.price) - Number(a.price);
        });

    } else {

        filteredItems.sort(function (a, b) {

            return new Date(b.createdAt) - new Date(a.createdAt);

        });

    }

    return filteredItems;

}


/* =========================================
   DISPLAY MARKETPLACE ITEMS
========================================= */

function renderItems() {

    if (!itemsContainer) {
        return;
    }

    const filteredItems = getFilteredItems();

    itemsContainer.innerHTML = "";


    if (filteredItems.length === 0) {

        const emptyMessage = document.createElement("p");

        emptyMessage.className = "marketplace-empty";

        emptyMessage.textContent =
            allItems.length === 0
                ? "No items listed yet. Be the first to list an item!"
                : "No items match your search or filters.";

        itemsContainer.appendChild(emptyMessage);

        return;

    }


    filteredItems.forEach(function (item) {

        const itemCard = document.createElement("article");

        itemCard.className = "marketplace-card";


        const itemIcon = document.createElement("div");

        itemIcon.className = "marketplace-item-icon";

        itemIcon.textContent =
            categoryIcons[item.category.toLowerCase()] || "📦";


        const itemDetails = document.createElement("div");

        itemDetails.className = "marketplace-item-details";


        const name = document.createElement("h3");

        name.textContent = item.name;


        const category = document.createElement("span");

        category.className = "item-category";

        category.textContent = item.category;


        const description = document.createElement("p");

        description.textContent = item.description;


        const price = document.createElement("strong");

        price.textContent = "₹" + Number(item.price).toLocaleString("en-IN");


        const location = document.createElement("small");

        location.textContent = "📍 " + item.location;


        const detailsButton = document.createElement("button");

        detailsButton.className = "view-details-btn";

        detailsButton.type = "button";

        detailsButton.textContent = "View Details";

        detailsButton.addEventListener("click", function () {

            openItemDetails(item);

        });


        itemDetails.append(
            name,
            category,
            description,
            price,
            location,
            detailsButton
        );


        itemCard.append(
            itemIcon,
            itemDetails
        );


        itemsContainer.appendChild(itemCard);

    });

}


/* =========================================
   ITEM DETAILS POPUP
========================================= */

function openItemDetails(item) {

    if (!itemModal || !modalItemDetails) {
        return;
    }

    modalItemDetails.innerHTML = "";


    const icon = document.createElement("div");

    icon.className = "modal-item-icon";

    icon.textContent =
        categoryIcons[item.category.toLowerCase()] || "📦";


    const name = document.createElement("h2");

    name.id = "modal-item-title";

    name.textContent = item.name;


    const category = document.createElement("span");

    category.className = "item-category";

    category.textContent = item.category;


    const description = document.createElement("p");

    description.textContent = item.description;


    const price = document.createElement("strong");

    price.textContent =
        "₹" + Number(item.price).toLocaleString("en-IN");


    const location = document.createElement("small");

    location.textContent = "📍 " + item.location;


    modalItemDetails.append(
        icon,
        name,
        category,
        description,
        price,
        location
    );


    itemModal.classList.add("active");

    itemModal.setAttribute("aria-hidden", "false");

}


function closeItemDetails() {

    if (!itemModal) {
        return;
    }

    itemModal.classList.remove("active");

    itemModal.setAttribute("aria-hidden", "true");

}


if (closeModalBtn) {

    closeModalBtn.addEventListener("click", closeItemDetails);

}


if (itemModal) {

    itemModal.addEventListener("click", function (event) {

        if (event.target === itemModal) {
            closeItemDetails();
        }

    });

}


document.addEventListener("keydown", function (event) {

    if (event.key === "Escape") {
        closeItemDetails();
    }

});


/* =========================================
   SEARCH AND FILTER EVENTS
========================================= */

if (searchInput) {

    searchInput.addEventListener("input", renderItems);

}


if (categoryFilter) {

    categoryFilter.addEventListener("change", renderItems);

}


if (sortFilter) {

    sortFilter.addEventListener("change", renderItems);

}


/* =========================================
   CATEGORY CARD SHORTCUTS
========================================= */

const categoryCards =
    document.querySelectorAll(".category-card");


categoryCards.forEach(function (card) {

    card.addEventListener("click", function (event) {

        event.preventDefault();

        const heading = card.querySelector("h3");

        if (heading && categoryFilter) {

            const selectedCategory =
                heading.textContent.trim().toLowerCase();

            categoryFilter.value = selectedCategory;

            renderItems();

            document.querySelector(".marketplace").scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }

    });

});


/* =========================================
   INITIAL PAGE
========================================= */

showPage(document.getElementById("home"));
