/* Global Variables */
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

// Personal API Key for OpenWeatherMap API
const apiKey = "2bc7678332ff43cf91afd0e1686d7c21";
// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', generateAction);

/* Function called by event listener */
function generateAction(){
    const feelings = document.getElementById('feelings').value;
    console.log(feelings)
    const clientZip = document.getElementById('zip').value;
    const baseUrl = `https://api.openweathermap.org/data/2.5/weather?zip=${clientZip}&appid=${apiKey}`;
    getFromOpenWeatherMap(baseUrl)
    .then((data)=>{
        postDataToServer('/addData',{temperature:data.main.temp, date:newDate, userResponse:feelings})
    })

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

    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    try {
        const newData = await response.json();
        return newData;
    } catch (error) {
        console.log("error", error.message);
    }
};
