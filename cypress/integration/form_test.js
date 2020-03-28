










describe('Test our inputs and submit our form', function () {
    beforeEach(function () {
        cy.visit('http://localhost:3000/pizza');
    });
    it('add text to inputs and submit form', function () {
        cy.get('input[name="name"]')
            .type('Phil')
            .should("have.value", "Phil");
        cy.get("#size")
            .select("Large")
            .should("have.value", "Large");
        cy.get('input[name="toppings"]')
            .check()
            .should('be.checked');
        cy.get("textarea")
            .type("I want extra hot peppers and ranch please!")
        cy.get("button").click().should('be.clicked');

    });
});