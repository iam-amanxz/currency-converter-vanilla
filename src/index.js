var request = require("request");
const path = require("path");
const express = require("express");
const cors = require("cors");
const hbs = require("hbs");
const bodyParser = require("body-parser");

const app = express();

const port = process.env.PORT || 3000;

// setting up releative path
const pathPublic = path.join(__dirname, "../public");
// customizing view path
const pathView = path.join(__dirname, "../templates/views");
// setting up path for partials
const partialsPath = path.join(__dirname, "../templates/partials");
// setting up handlebars view engine
app.set("view engine", "hbs");
// setting up view path
app.set("views", pathView);
// setting up path for partials
hbs.registerPartials(partialsPath);
// setting root route to serve public directory
app.use(express.static(pathPublic));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get("", (req, res) => {
  res.render("home", {
    title: "Currency Converter"
  });
});

app.post("/currency", (req, res) => {
  console.log(req.body);
  const uri = "https://currency-exchange.p.rapidapi.com/exchange?",
    headers = {
      "x-rapidapi-host": "currency-exchange.p.rapidapi.com",
      "x-rapidapi-key": "b13c4f3d67msh8143a7f1298de7bp1e8586jsn4453f885a4e7"
    };
  const queryObject = {
    q: req.body.value,
    from: req.body.fromCurrency,
    to: req.body.toCurrency
  };
  console.log(queryObject);
  request(
    {
      url: uri,
      qs: queryObject,
      headers: headers
    },
    function(error, response, body) {
      if (error) {
        console.log("error:", error); // Print the error if one occurred
      } else if (response && body) {
        console.log("statusCode:", response && response.statusCode); // Print the response status code if a response was received
        res.json({ body: body }); // Print JSON response.
      }
    }
  );
});
app.listen(port, () => {
  console.log("Server is running on port " + port);
});
