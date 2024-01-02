document.addEventListener('DOMContentLoaded', () => {
    const search = document.querySelector('.search-box button');
    const weatherBox = document.querySelector('.weather-box');
    const weatherDetails = document.querySelector('.weather-details');
    const weatherIcon = document.querySelector('.weather-box .weather-icon');

    search.addEventListener('click', () => {
        const APIKey = 'be30fce8ee100cfc179217243289f5bc';//API KEY
        const cityInput = document.querySelector('.search-box input');
        const city = cityInput.value;

        if (city === '') {
            // Utilisation de SweetAlert pour afficher une alerte d'erreur
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Veuillez saisir une ville!',
            });
            return;
        }

        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
            .then(response => response.json())
            .then(json => {
                const temperature = document.querySelector('.weather-box .temperature');
                const description = document.querySelector('.weather-box .description');
                const humidity = document.querySelector('.weather-details .humidity span');
                const wind = document.querySelector('.weather-details .wind span');

                temperature.textContent = `${json.main.temp} °C`;
                description.textContent = json.weather[0].description;
                humidity.textContent = `${json.main.humidity}%`;
                wind.textContent = `${json.wind.speed} Km/h`;

                switch (json.weather[0].main) {
                    case 'Clear':
                        weatherIcon.src = 'images/clear.png';
                        break;
                    case 'Rain':
                        weatherIcon.src = 'images/rain.jpeg';
                        break;
                    case 'Snow':
                        weatherIcon.src = 'images/snow.png';
                        break;
                    case 'Clouds':
                        weatherIcon.src = 'images/cloud (2).png';
                        break;
                    case 'Mist':
                    case 'Haze':
                        weatherIcon.src = 'images/mist.png';
                        break;
                    default:
                        weatherIcon.src = 'images/cloud (2).png';
                }

                weatherBox.classList.add('visible');
                weatherDetails.classList.add('visible');
            })
            .catch(error => {
                console.error('Error fetching weather data:', error);
                // Utilisation de SweetAlert pour afficher une alerte d'erreur
                Swal.fire({
                    icon: 'error',
                    title: 'ERROR!!',
                    text: '!City not found!',
                });
            });
    });
});
