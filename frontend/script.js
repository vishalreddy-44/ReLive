/* =========================
   GET STARTED
========================= */

const getStartedBtns = document.querySelectorAll(".get-started-btn");
const reliveFlow = document.getElementById("relive-flow");

getStartedBtns.forEach(function (button) {

    button.addEventListener("click", function (event) {

        event.preventDefault();

        reliveFlow.style.display = "block";

        reliveFlow.scrollIntoView({
            behavior: "smooth"
        });

    });

});


/* =========================
   PATH SELECTION
========================= */

const pathBtns = document.querySelectorAll(".path-btn");
const pathSections = document.querySelectorAll(".path-section");

pathBtns.forEach(function (button) {

    button.addEventListener("click", function () {

        pathSections.forEach(function (section) {
            section.style.display = "none";
        });

        let selectedSection;

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

            selectedSection.style.display = "block";

            selectedSection.scrollIntoView({
                behavior: "smooth"
            });

        }

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


    /* Validate form */

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


    /* Send data to backend */

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


    /* Validate form */

    if (
        itemName === "" ||
        category === "" ||
        description === "" ||
        location === ""
    ) {

        alert("Please fill in all the fields.");

        return;

    }


    /* Send data to backend */

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

scrapSubmitBtn.addEventListener("click", function () {

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


    alert(
        "Scrap pickup request created!\n\n" +
        "Category: " + category + "\n" +
        "Quantity: " + quantity + " " + unit
    );

});