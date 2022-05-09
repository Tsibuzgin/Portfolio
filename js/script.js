// weather report block for the city by name

function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    };
    rawFile.send(null);
}

// calling above function
readTextFile('../js/city.list.json', function(text){
    var data = JSON.parse(text); //parse JSON
    document.querySelector('.btn-search').addEventListener("click", () =>
    {
        let val_cn = document.querySelector('#elastic').value.trim(); //country abbreviation
    let country_answer;
    for(let k = 0; k <= data.length-1; k++) {
        if (data[k].country === val_cn) {
            country_answer = 'There is such a country. Now enter the town.';
            document.querySelector('.search-notifications-text').textContent = country_answer;
            document.querySelector('#elastic').placeholder = 'Enter town here and press search';
            break;
        } else {
            country_answer = 'There is no such country.';
            document.querySelector('.search-notifications-text').textContent = country_answer;
        }
    }
    if (country_answer === 'There is no such country.') {
    } else {
        document.querySelector('#elastic').value = '';
        document.querySelector('.btn-search').addEventListener("click", () =>
        {
            let val_tn = document.querySelector('#elastic').value.trim(); //town abbreviation
        if (val_tn !== '') {
            let town_answer;

    for(let k = 0; k <= data.length-1; k++) {
        if (data[k].country === val_cn) {
            if (data[k].name === val_tn) {
                town_answer = 'There is such a town.';
                document.querySelector('.search-notifications-text').textContent = town_answer;
                let town_id = data[k].id;
                displayW (town_id);
                break;
            } else {
                town_answer = 'There is no such town.';
                document.querySelector('.search-notifications-text').textContent = town_answer;
            }
        }
}
        }
        });
}
}
);
});

//weather report block for New York, London,
//Dubai and Paris

function displayWeatherNY () {
    let town_id = "5128581";
    displayW (town_id);
}

function displayWeatherLon () {
    let town_id = "2643743";
    displayW (town_id);
}

function displayWeatherDub () {
    let town_id = "292223";
    displayW (town_id);
}

function displayWeatherPar () {
    let town_id = "2968815";
    displayW (town_id);
}

function displayW (town_id) {
    fetch('https://api.openweathermap.org/data/2.5/weather?id=' + town_id + '&APPID=b2e7fcb2e260d70d546a04a548df52fa')
    .then(function (resp) { return resp.json() })
    .then(function (data) {
        console.log(data);
        document.querySelector('.city').textContent = data.name + [', '] + data.sys['country'];
        document.querySelector('.temperature').innerHTML = Math.round(data.main.temp - 273) + '&deg;' + 'C';
        document.querySelector('.precipitation').textContent = data.weather[0]['description'];
        document.querySelector('.weather-icon').innerHTML = `<img src="https://openweathermap.org/img/wn/${data.weather[0]['icon']}@2x.png">`;
        let date = data.dt;
        var a = new Date(date * 1000);
        var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
        var year = a.getFullYear();
        var month = months[a.getMonth()];
        var date1 = a.getDate();
        var time = date1 + ' ' + month + ' ' + year;
        document.querySelector('.date').textContent = time;
        document.querySelector('.min-temp').innerHTML = Math.round(data.main.temp_min - 273.0) + '&deg;' + 'C';
        document.querySelector('.max-temp').innerHTML = Math.round(data.main.temp_max - 273.0) + '&deg;' + 'C';
    })
    .catch(function() {
        // catch any errors
    });
}

// accordion block FAQ

const button = document.querySelectorAll(".arrow-btn");
const arrow = document.querySelectorAll(".arrow-img");
const question = document.querySelectorAll(".accordion-collapse");
button.forEach((value, index) => {
    button[index].addEventListener("click", () => 
{
    if (arrow[index].classList.contains("up")) {
            arrow[index].classList.remove("up");
            question[index].classList.remove("open");
        } else {
            arrow[index].classList.add("up");
            question[index].classList.add("open");
        }
});
})