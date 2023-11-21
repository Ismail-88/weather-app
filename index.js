const container = document.querySelector('.container')
const search = document.querySelector('.search-box button')
const weatherBox = document.querySelector('.weather-box')
const weatherDetails = document.querySelector('.weather-details')
const error404 = document.querySelector('.not-found')

image_array = [
    'hazy.webp',
    'rainy.jpg',
    'snow.png',
    'sun.jpg',
    'winter.jpg'
]




search.addEventListener('click', () => {
    const APIkey = '49eeae3f3538ff394307be6b9a0b15c8';
    const city = document.querySelector('.search-box input').value;

    if (city == '')
        return;
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIkey}`).then(response => response.json()).then(json => {

        if(json.cod == '404'){
            container.style.height = '400px';
            weatherBox.classList.remove('active');
            weatherDetails.classList.remove('active');
            error404.classList.add('active');
            return;
        }

        container.style.height = '555px';
        weatherBox.classList.add('active');
        weatherDetails.classList.add('active');
        error404.classList.remove('active');
        

        const image = document.querySelector('.weather-box img');
        const temperature = document.querySelector('.weather-box .temperature');
        const description = document.querySelector('.weather-box .description');
        const humidity = document.querySelector('.weather-details .humidity span');
        const wind = document.querySelector('.weather-details .wind span');
        // print ()
         console.log(json.weather[0].main)
        switch (json.weather[0].main) {
            case 'Clear':
                image.src = 'images/clear.png';
                break;

            case 'Rain':
                image.src = 'images/rain.png';
                break;

            case 'Snow':
                image.src = 'images/snow.png';
                break;

            case 'Clouds':
                image.src = 'images/cloud.png';
                break;

            case 'Mist':
                image.src = 'images/mist.png';
                break;

            case 'Haze':
                image.src = 'images/haze.png';
                break;
            default:
                image.src = 'images/cloud.png'
        }
        temperature.innerHTML = `${parseInt(json.main.temp)}<span>&#8451;</span>`;
        description.innerHTML = `${json.weather[0].description}`;
        humidity.innerHTML = `${json.main.humidity}%`;
        wind.innerHTML = `${parseInt(json.wind.speed)}km/h`;
    })
    function get_random_image(){
        random_index = Math.floor(Math.random()* image_array.length)
        selected_image = image_array[random_index]
        document.body.src = `/images/${selected_image}`
    }
    get_random_image();
    // console.log(selected_image);
})
