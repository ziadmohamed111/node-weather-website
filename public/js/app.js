const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    locationValue = search.value
    weatherData(locationValue);
})

const weatherData = (location) => {

    messageOne.textContent = "loading...";
    messageTwo.textContent = "";

  fetch(`/weather?address=${location}`).then(res => {
    res.json().then(res => {
      if (!!res.err) {
        return messageOne.textContent = res.err;
      }
      messageTwo.textContent = res.forecastData;
      messageOne.textContent = res.location;
    });
  });
}