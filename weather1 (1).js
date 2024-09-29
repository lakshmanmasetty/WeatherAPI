    function updateCurrentDate() {
        const currentDate = new Date();
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        document.getElementById('currentDate').innerText = currentDate.toLocaleDateString(undefined, options);
    }

    
    updateCurrentDate();

    async function getWeather() {
        const city = document.getElementById('city').value.trim(); 

        if (!city) {  
            alert("Please enter a city name to get the weather information.");
            return;
        }

        const apiKey = '19c780c5db083447fc158cb75ed1614d'; 
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

        try {
            const response = await fetch(apiUrl);
            const data = await response.json();

            if (data.cod !== 200) {
                alert(data.message);  
                return;
            }

            
            document.querySelector('.city').innerText = data.name;
            document.querySelector('.temp').innerText =` ${Math.round(data.main.temp)}°C`;
            document.querySelector('.humidity').innerText = `${data.main.humidity}%`;
            document.querySelector('.wind').innerText = `${data.wind.speed} km/h`;

         
            const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
            document.getElementById('weather-icon').src = iconUrl;

           
            const weatherMain = data.weather[0].main.toLowerCase();
            changeBackgroundVideo(weatherMain);

           
            getHourlyForecast(city);
        } catch (error) {
            console.error("Error fetching weather data:", error);
        }
    }

   
    async function getHourlyForecast(city) {
        const apiKey = '19c780c5db083447fc158cb75ed1614d'; 
        const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;

        try {
            const response = await fetch(apiUrl);
            const data = await response.json();

            if (data.cod !== "200") {
                alert(data.message);
                return;
            }

            const hourlyForecast = data.list.slice(0, 5).map(item => {
                return {
                    time: item.dt_txt.split(" ")[1].slice(0, 5), 
                    temp: Math.round(item.main.temp),
                    icon: `http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`
                };
            });

            const hourlyForecastContainer = document.getElementById('hourly-forecast');
            hourlyForecastContainer.innerHTML = ''; 

            hourlyForecast.forEach(hour => {
                const hourDiv = document.createElement('div');
                hourDiv.className = 'hourly';
                hourDiv.innerHTML = `
                    <img src="${hour.icon}" alt="Weather Icon" style="width: 30px; height: 30px;">
                    <div>${hour.time}</div>
                    <div>${hour.temp}°C</div>
                `;
                hourlyForecastContainer.appendChild(hourDiv);
            });

            document.querySelector('.weather').style.display = 'block';

        } catch (error) {
            console.error("Error fetching hourly forecast:", error);
        }
    }
    function changeBackgroundVideo(weather) {
        const video = document.getElementById('bg-video');
        let videoSrc;
    
        switch (weather) {
            case 'rain':
            case 'drizzle':
                videoSrc = 'https://videos.pexels.com/video-files/7681543/7681543-sd_360_640_24fps.mp4'; 
                break;
            case 'clear':
                videoSrc = 'https://videos.pexels.com/video-files/1309214/1309214-hd_1920_1080_30fps.mp4'; 
                break;
            case 'clouds':
                videoSrc = 'https://videos.pexels.com/video-files/1893623/1893623-uhd_2560_1440_25fps.mp4'; 
                break;
            case 'snow':
                videoSrc = 'https://videos.pexels.com/video-files/856381/856381-hd_1920_1080_30fps.mp4'; 
                break;
            case 'thunderstorm':
                videoSrc = 'https://videos.pexels.com/video-files/3433955/3433955-uhd_2732_1440_24fps.mp4'; 
                break;
            default:
                videoSrc = 'default-video.mp4'; 
                break;
        }
    
        
        if (videoSrc !== video.src) { 
            video.src = videoSrc;
            video.load(); 
            video.play(); 
        }
    }
    
    console.log(weatherMain);  
    changeBackgroundVideo(weatherMain);
    


    document.getElementById('searchButton').addEventListener('click', getWeather);



