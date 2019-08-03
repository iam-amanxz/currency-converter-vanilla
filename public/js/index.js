const currency = document.querySelector("#currency");
const btn = document.getElementById("getCurrency");
  
function refreshPage() {
    window.location.reload();
}
  
btn.addEventListener("click", e => {
  
  let value = document.querySelector("#value")
  let fromCurrency = document.getElementById("fromCurrency");
  let toCurrency = document.getElementById("toCurrency");

  if(value.value === ""){
    value.value = 1;
  }

  value = value.value;
  fromCurrency = fromCurrency.options[fromCurrency.selectedIndex].value;
  toCurrency = toCurrency.options[toCurrency.selectedIndex].value;
  const data = {
      value:value,
      fromCurrency: fromCurrency,
      toCurrency: toCurrency
  };
  // calls the API with POST method with data in it
  fetch("http://localhost:3000/currency", {
      method: 'POST',
      mode: 'cors',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
  }).then(response => {
      response.json().then(data => {
          if (data.error) {
            console.log(data.error);
          } else {
            currency.textContent = value + fromCurrency + " = " + value*(data.body) + " " + toCurrency;
          }
      });
  });
});