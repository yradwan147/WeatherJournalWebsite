/* Global Variables */
const baseUrl = "https://api.openweathermap.org/data/2.5/weather?zip="
const apiKey = "&appid=cbcccff126a188a218ba592c17937e2c&units=metric"
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + '.' + d.getDate() + '.' + d.getFullYear();

//Adding button event listener and getting field values
document.getElementById('generate').addEventListener('click', startProcess)

//Button listener function
function startProcess(){
    zip = document.getElementById('zip').value;
    feeling = document.getElementById('feelings').value;
    getAPIData(baseUrl, zip, apiKey)

    .then(function (data){
        console.log(data)
        postData('/addEntry', {temperature : data.main.temp, date : newDate, usrResp : feeling})
        
        updateUI()
    }
        )

}
//Using, baseURL, entered zipcode, and API Key, fetch temperature at given zipcode from web API
const getAPIData = async (baseUrl, zip, apiKey) => {
    const response = await fetch(baseUrl + zip + apiKey)

    try{
        const data = await response.json();
        console.log(data)
        return data
    }catch(error){
        console.log('error', error)
    }
}

//Send Entry to Server for Saving
const postData = async (url = '', data = {})=>{
    const res = await fetch(url, {
        method : 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    try {
        const newData = await res.json();
        console.log(newData)
        return newData
    }catch(error){
        console.log('error', error)
    }
}

//Get last entry and update UI elements with its values
const updateUI = async() => {
    const request = await fetch('/all')
    try{
        const allData = await request.json();
        console.log(allData)
    document.getElementById('date').innerHTML = `Date : ${allData.date}`
    document.getElementById('temp').innerHTML = `Temperature : ${allData.temperature}`
    document.getElementById('content').innerHTML = `Log : ${allData.usrResp}`
    }catch(error){
        console.log('error', error)
    }
}

