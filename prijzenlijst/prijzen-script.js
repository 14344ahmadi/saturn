
    const priceTabs = document.querySelectorAll(".price-tab");
    const priceTables = document.querySelectorAll(".price-table");

    priceTabs.forEach(tab => {

        tab.addEventListener("click", () => {

            const target = tab.dataset.priceTab;

            // Remove active states
            priceTabs.forEach(button => {
                button.classList.remove("active");
            });

            priceTables.forEach(table => {
                table.classList.remove("active");
            });

            // Add active state
            tab.classList.add("active");

            document
                .getElementById(target)
                .classList.add("active");

        });

    });
