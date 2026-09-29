/* =========================
   PAGE NAVIGATION
========================= */

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


/* =========================
   NAVBAR
========================= */

const homeLink =
    document.querySelector('.nav-links a[href="#home"]');

const howItWorksLink =
    document.querySelector('.nav-links a[href="#how-it-works"]');

const exploreLink =
    document.querySelector('.nav-links a[href="#explore"]');

const aboutLink =
    document.querySelector('.nav-links a[href="#about"]');


homeLink.addEventListener("click", function (event) {

    event.preventDefault();

    showPage(document.getElementById("home"));

});


howItWorksLink.addEventListener("click", function (event) {

    event.preventDefault();

    showPage(document.getElementById("how-it-works"));

});


exploreLink.addEventListener("click", function (event) {

    event.preventDefault();

    showPage(document.getElementById("explore"));

});


aboutLink.addEventListener("click", function (event) {

    event.preventDefault();

    showPage(document.getElementById("about"));

});


/* =========================
   GET STARTED
========================= */

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


/* =========================
   BACK FROM GET STARTED
========================= */

if (flowBackBtn) {

    flowBackBtn.addEventListener("click", function () {

        document.body.classList.remove("flow-open");

        showPage(document.getElementById("home"));

    });

}


/* =========================
   PATH SELECTION
========================= */

const pathBtns =
    document.querySelectorAll(".path-btn");

const pathSections =
    document.querySelectorAll(".path-section");


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


/* =========================
   BACK FROM PATH FORMS
========================= */

const pathBackBtns =
    document.querySelectorAll(".path-back-btn");


pathBackBtns.forEach(function (button) {

    button.addEventListener("click", function () {

        showPage(reliveFlow);

    });

});


/* =========================
   REUSE / SELL
========================= */

const reuseSubmitBtn =
    document.getElementById("reuse-submit-btn");


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
                "Failed to list item: " +
                data.message
            );

        }

    } catch (error) {

        console.error("Error:", error);

        alert(
            "Could not connect to the ReLive server."
        );

    }

});


/* =========================
   REPAIR & SELL
========================= */

const repairSubmitBtn =
    document.getElementById("repair-submit-btn");


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
                "Failed to submit repair request: " +
                data.message
            );

        }

    } catch (error) {

        console.error("Error:", error);

        alert(
            "Could not connect to the ReLive server."
        );

    }

});


/* =========================
   SCRAP
========================= */

const scrapSubmitBtn =
    document.getElementById("scrap-submit-btn");


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

            alert(
                "Scrap pickup request submitted successfully!"
            );


            document.getElementById("scrap-category").value = "";
            document.getElementById("scrap-quantity").value = "";
            document.getElementById("scrap-unit").value = "kg";
            document.getElementById("scrap-location").value = "";

        } else {

            alert(
                "Failed to submit scrap request: " +
                data.message
            );

        }

    } catch (error) {

        console.error("Error:", error);

        alert(
            "Could not connect to the ReLive server."
        );

    }

});


/* =========================
   INITIAL PAGE
========================= */

showPage(document.getElementById("home"));