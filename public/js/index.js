const currency = document.querySelector("#currency");
const text1= document.querySelector(".text1");
const text2= document.querySelector(".text2");

weatherForm.addEventListener("submit", e => {
    e.preventDefault();
  
    const toValue = text1.value;
    const fromValue = text2.value;  
  
    fetch("/currency?from=" + fromValue+"to="+toValue).then(response => {
      response.json().then(data => {
        if (data.error) {
          currency.textContent = data.error;
        } else {
          currency.textContent = data.location;
        }
      });
    });
  });