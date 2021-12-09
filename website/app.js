/* Global Variables */
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1 + '.' + d.getDate() + '.' + d.getFullYear();

// Personal API Key for OpenWeatherMap API
const apiKey = "2bc7678332ff43cf91afd0e1686d7c21";
// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', generateAction);

/* Function called by event listener */
function generateAction(){
    const clientZip = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;
    if(!clientZip || !feelings){
        alert('Enter A value in zip an feelings')
        return
    }
    const baseUrl = `https://api.openweathermap.org/data/2.5/weather?zip=${clientZip}&appid=${apiKey}`;
    getFromOpenWeatherMap(baseUrl)
    .then((data)=>{
        postDataToServer('/addData',{temperature:data.main.temp, date:newDate, userResponse:feelings})
    })
    .then(
        getDataToServer('/getData')        
        .then(function (serverData) {
                updateUI(serverData);
            })
        )
    
}

/* Function to GET Web API Data*/
const getFromOpenWeatherMap = async (url='') => {
    const res = await fetch(url)
    try {
        const data = await res.json();
        return data

    } catch (error) {
        console.log("error", error.message);
    }
}
/* Function to POST data */
const postDataToServer = async (url = '', data = {}) => {

    try {
        const response = await fetch(url, {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
    } catch (error) {
        console.log("error", error.message);
    }
};

/* Function to GET Project Data */
const getDataToServer = async (url = '') => {
    const request = await fetch(url);
    try {
        // Transform into JSON
        const allData = await request.json()
        return allData
    } catch (error) {
        console.log("error", error.message);
    }
}

/* Function to Update UI */
const updateUI = (finalData) => {
    try {
        document.getElementById('date').innerHTML = finalData.date;
        document.getElementById('temp').innerHTML = finalData.temperature;
        document.getElementById('content').innerHTML = finalData.userResponse;

    } catch (error) {
        console.log("error", error.message);
    }
}