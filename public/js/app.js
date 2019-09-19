console.log('client side javascript file is loaded')

const weatherForm = document.querySelector('form') // returns a js representation of the element - 'form'

const search = document.querySelector('input') // get the value from input

const messageOne = document.querySelector('#message-1')

weatherForm.addEventListener('submit', (e) => { // e is an event object
    e.preventDefault() // without this the browser will refresh so fast that we can't see 'testing'
    const location = search.value
    const messageOne = document.querySelector('#message-1')
    const messageTwo = document.querySelector('#message-2')


    messageOne.textContent = 'Loading...'
    messageTwo.textContent = '' // empty the second message to clear value from previous search

    const url = "http://localhost:3000/weather?address=" + location

    fetch(url).then((response) => {
        response.json().then((data) => {
            if(data.error){
                return messageOne.textContent = data.error
            }
            
            messageOne.textContent = data.location
            messageTwo.textContent = data.weather
        })
    })
})



