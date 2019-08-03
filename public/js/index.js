const currency = document.querySelector("#currency");
const text1= document.querySelector(".text1");
const text2= document.querySelector(".text2");
const text3= document.querySelector(".text3");
const Form = document.querySelector("form");

function refreshPage() {
  window.location.reload();
}
Form.addEventListener("submit", e => {
    e.preventDefault();
    
  
    fetch("http://localhost:3000/currency").then(response => {
      response.json().then(data => {
        if (data.error) {
          console.log(data.error);
        } else {
          currency.textContent = data.body;
        }
      });
    });
  });