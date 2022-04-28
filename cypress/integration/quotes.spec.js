// write tests here
describe('Quotes App', () => {
  beforeEach(() => {
    //This runs before every test in our testing suite
    //Start each test with fresh state
    cy.visit('http://localhost:1234') //Make sure this is the port that's runnning!
  })
  //GETTERS
  const textInput = () => cy.get('input[name=text]')
  const authorInput = () => cy.get('input[name=author]')
  const foobarInput = () => cy.get('input[name=foobar')
  const submitBtn = () => cy.get(`button[id="submitBtn"]`)
  const cancelBtn = () => cy.get(`button[id="cancelBtn"]`)

  it('sanity check to make sure tests work', () => {
    //"it" is a test
    //"expect" is an assertion
    //There can be multiple assertions per test,
    //but all the assertions have to deal with
    //the ONE THING that we're testing.
    expect(1 + 2).to.equal(3)
    expect(2 + 2).not.to.equal(5)
    expect({}).not.to.equal({}) //passing test! {} === {} -> false
    expect({}).to.eql({}) // ==
  })

  it('the proper elements are showing', () => {
    textInput().should('exist')
    foobarInput().should('not.exist')
    authorInput().should('exist')
    submitBtn().should('exist')
    cancelBtn().should('exist')

    cy.contains('Submit Quote').should('exist') // more specific
    cy.contains(/submit quote/i).should('exist') //case insensitive, laid back
  })

  describe('Filling out the inputs and canceling', () => {
    it('can navigate to the site', () => {
      cy.url().should('include', 'localhost')
    })
    it('submit button starts out disabled', () => {
      submitBtn().should('be.disabled')
    })
    it('can type in the inputs', () => {
      textInput()
        .should('have.value', '')
        .type('lorem ipsum')
        .should('have.value', 'lorem ipsum')
      authorInput()
        .should('have.value', '')
        .type('CASEY')
        .should('have.value', 'CASEY')
    })
    it('the submit button enables when both inputs are filled out', () => {
      authorInput().type('casey')
      textInput().type('FUN')
      submitBtn().should('not.be.disabled')
    })
    it('the cancel button can reset the inputs and disable the submit button', () => {
      authorInput().type('casey')
      textInput().type('lorem')
      cancelBtn().click()
      textInput().should('have.value', '')
      authorInput().should('have.value', '')
      submitBtn().should('be.disabled')
    })
  })
  describe('Adding a new quote', () => {
    it('can submit and delete a new quote', () => {
      textInput().type('Web54 Rocks!')
      authorInput().type('CRHarding')
      submitBtn().click()

      cy.contains('Web54 Rocks!').siblings('button:nth-of-type(2)').click()
      cy.contains('Web54 Rocks!').should('not.exist')
    })

    it('variation of can submit a new quote', () => {
      textInput().type('Woohoo!')
      authorInput().type('CRHarding')
      submitBtn().click()
      cy.contains('Woohoo!').should('exist')
      cy.contains('Woohoo!').next().next().click()
      cy.contains('Woohoo!').should('not.exist')
    })
  })
})
