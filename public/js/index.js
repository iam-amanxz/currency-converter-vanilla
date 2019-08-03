const from = document.querySelector(".from__value");
const to = document.querySelector(".to__value");
const btn = document.getElementById("getCurrency");
const equals = document.querySelector(".equals");

btn.addEventListener("click", e => {
  function refreshPage() {
    window.location.reload();
  }

  e.preventDefault();
  let value = document.querySelector("#value");
  let fromCurrency = document.getElementById("fromCurrency");
  let toCurrency = document.getElementById("toCurrency");

  if (value.value === "") {
    value.value = 1;
  }

  value = value.value;
  fromCurrency = fromCurrency.options[fromCurrency.selectedIndex].value;
  toCurrency = toCurrency.options[toCurrency.selectedIndex].value;
  const data = {
    value: value,
    fromCurrency: fromCurrency,
    toCurrency: toCurrency
  };
  // calls the API with POST method with data in it
  fetch("http://localhost:3000/currency", {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  }).then(response => {
    response.json().then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        from.textContent = value + " " + fromCurrency;
        equals.textContent = " = ";
        to.textContent =
          value * parseFloat(data.body).toFixed(2) + " " + toCurrency;
      }
    });
  });
});
