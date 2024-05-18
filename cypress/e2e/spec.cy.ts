describe("Add new database", () => {
    it("should add a new database", () => {
        cy.visit("http://localhost:3000/databases");
        cy.get("#root > div > header > button").click();
        cy.get('input[name="name"]').type("Test database");
        cy.get('input[name="username"]').type("test");
        cy.get('input[name="type"]').type("test");
        cy.get('input[name="url"]').type("test");
        cy.get('input[name="password"]').type("test");
        cy.get("#modal-root > dialog > div > div > button").click();
        cy.get(
            'div[data-testid="databases-list"]:last-child div:nth-child(1)'
        ).should("contain", "Test database");
        cy.get(
            'div[data-testid="databases-list"]:last-child div:nth-child(2)'
        ).should("contain", "test");
        cy.get(
            'div[data-testid="databases-list"]:last-child div:nth-child(3)'
        ).should("contain", "test");
    });

    it("should show an error message if the form is not filled out", () => {
        cy.visit("http://localhost:3000/databases");
        cy.get("#root > div > header > button").click();
        cy.get("#modal-root > dialog > div > div > button").click();
        for (let i = 0; i < 5; i++) {
            cy.get(`#modal-root > dialog > div > div > div:nth-child(${i + 1}) > small`).should(
                "contain",
                "This field is required",
            );
        }
    });
});
