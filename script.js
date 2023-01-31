
// .val() => get if no pareameter padded e.g val()
//... => set if 1 parameter passed e.g. val('input')
const history = JSON.parse(localStorage.getItem('history')) || [];

const apiKey = '407805bd4935fca24b3bc6924a34a677';

$('#search-form').on('submit', function(event) {
    event.preventDefault();

    const userInput = $('#search-input').val();

    const queryURL = 'http://api.openweathermap.org/geo/1.0/direct?q=' + userInput + '&limit=5&appid=' + apiKey;
    // put the search value on the history list
    // TODO: prepend the value to the list conatiner

    // add the history to local storage
    history.push(userInput);
    localStorage.setItem('history', JSON.stringify(history));

    // call geocoding API when search form is submitted to find city lat and long value
    $.ajax({url: queryURL})
     .then(function(response) {

        const lat = response[0].lat;
        const lon = response[0].lon;


        const weatherQueryURL = 'http://api.openweathermap.org/data/2.5/forecast?units=metric&lat=' + lat + '&lon=' + lon + '&appid=' + apiKey;
        
        $.ajax({url: weatherQueryURL})
         .then(function(weatherResponse) {
            // icon => iconcode api
            // put the response in the HTL page

            const weatherList = weatherResponse.list;

            const today = weatherList[0];

            const todayTimestamp = today.dt;
           
            // 86400

            // 5 day forcast
            for (let i = 0; i < weatherList.length; i += 8) {
                // get the 00:00:00 of each day
                const weather = weatherList[i];
                console.log(weather);
                // put 5 day forecast weather in container for forcast

            }
            
            let date = weatherResponse.dt_txt;
            console.log(date);
            // let icon = ;
            let temperature = weatherResponse.main.feels_like;
            console.log(temperature);

            let wind = weatherResponse.wind[0];
            console.log(wind);

            let humidity = weatherResponse.main[0];
            console.log(humidity);

            // now forcast

            // 5 days forecast
        })
     })

    

})

