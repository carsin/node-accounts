module.exports = (app, passport) => {
    // HOME
    app.get("/", (req, res) => {
        res.render("index.ejs");
    });

    app.get("/signup", (req, res) => {
        res.render("signup.ejs");
    });
}
