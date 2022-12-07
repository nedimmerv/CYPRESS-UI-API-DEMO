describe("Token Creation ", () => {
  let access_token = "";
  let session_id = "";

  beforeEach("Generate token", () => {
    cy.create_token().then((response) => {
      cy.log(JSON.stringify(response));
      cy.log(response.body.access_token);
      access_token = response.body.access_token;

      cy.request({
        method: "GET",
        url: "/api/Sessions",
        headers: {
          Authorization: "Bearer " + access_token,
        },
        // To verify the session details
      }).then((response) => {
        session_id = response.body[0].id;
        cy.log("Session id :" + session_id);
      });
    });
  });
  it("Get the access token test", () => {
    cy.request({
      method: "GET",
      url: "/api/Sessions",
      headers: {
        Authorization: "Bearer " + access_token,
      },
    }).then((response) => {
      expect(response.body[0].id).to.eq(session_id);
      expect(response.body[0].participants[0].firstName).to.eq("QA");
      expect(response.body[0].participants[0].lastName).to.eq("Admin");
      expect(response.body[0].participants[0].email).to.eq(
        "qa.admin@hitachivantara.com"
      );
      expect(response.status).to.eq(200);
    });
  });
});
