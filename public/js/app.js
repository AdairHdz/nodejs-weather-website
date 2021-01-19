const weatherForm = document.querySelector("form")
const searchCriteria = document.querySelector("input")
const messageOne = document.getElementById("messageOne")
const messageTwo = document.getElementById("messageTwo")

weatherForm.addEventListener("submit", event => {
    event.preventDefault()    
    fetch(`http://localhost:3000/weather?address=${searchCriteria.value}`)
    .then(response => response.json())
    .then(data => {
        if(data.error){
            messageOne.textContent = data.error
        }else{
            messageOne.textContent = data.address
            messageTwo.textContent = data.forecast            
        }
    })
})
