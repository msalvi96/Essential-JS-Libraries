const template = document.createElement('template');
template.innerHTML = `
    <style>
        .card {
            background: #f4f4f4;
            width: 250px;
            display: grid;
            grid-gap: 10px;
            margin-bottom: 15px;
            padding: 15px;
        }
        .container {
            padding: 2px 16px;
        }
        #toggle-info {
            cursor: pointer;
            background: darkred;
            color: #fff;
            border: 0;
            border-radius: 5px;
            padding: 5px 10px;
        }
    </style>
    <div class="grid-child card">
        <div class="card-header"><h2></h2></div>
        <div>
            <h4 class="card-title"></h4>
            <div class="temp"></div>
            <h2 class="temp"><span class="degree"></span></h2>
        </div>

        <div class="more-info"></div>
        <button id="toggle-info">Hide Info</button>
    </div>
`

class Weather extends HTMLElement {
    
    constructor() {
        super();
        this.showInfo = true;
        this.info = {};
        this.location = this.getAttribute('location');
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        fetch(`https://community-open-weather-map.p.rapidapi.com/weather?q=${this.location}&units=imperial`, {
                "method": "GET",
                "headers": {
                    "x-rapidapi-key": "026637f033msh5b5e3f97cabe4ccp1b213ejsn8a44f3ec1d8f",
                    "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com"
                }
            })
            .then(response => {
                return response.json();
            })
            .then(data => {
                this.info["temp"] = data["main"]["temp"];
                this.info["maxTemp"] = data["main"]["temp_max"];
                this.info["minTemp"] = data["main"]["temp_min"];
                this.info["feelsLike"] = data["main"]["feels_like"];
                this.info["weather"] = data["weather"][0];
                this.info["windSpeed"] = data["wind"]["speed"];
                console.log(data);
                console.log(this.info);
                return this.info
            })
            .then(info => {
                this.shadowRoot.querySelector('.card-header h2').innerText = this.location;
                this.shadowRoot.querySelector('.card-title').innerText = info["weather"]["main"];
                this.shadowRoot.querySelector('.temp').innerHTML = `<h2>${info.temp}<span>&#176;</span> F</h2>`;
                this.shadowRoot.querySelector('.more-info').innerHTML = `
                    <p>Maximum Temp: ${info.maxTemp} <span>&#176;</span> F</p>
                    <p>Minimum Temp: ${info.minTemp} <span>&#176;</span> F</p>
                    <p>Feels Like: ${info.feelsLike} <span>&#176;</span> F</p>
                    <p>Wind Speed: ${info.windSpeed} MPH</p>
                `;
            })
            .catch(err => {
                console.error(err);
            });
    }

    toggleInfo() {
        this.showInfo = !this.showInfo;
        const moreInfo = this.shadowRoot.querySelector('.more-info');
        const toggleBtn = this.shadowRoot.querySelector('#toggle-info');

        if (this.showInfo) {
            moreInfo.style.display = 'block';
            toggleBtn.innerText = 'Hide Info';
        } else {
            moreInfo.style.display = 'none';
            toggleBtn.innerText = 'More Info';
        }
    }

    connectedCallback() {
        this.shadowRoot.querySelector('#toggle-info').addEventListener('click', () => {
            this.toggleInfo();
        });
    }

    disconnectedCallback() {
        this.shadowRoot.querySelector('#toggle-info').removeEventListener();
    }
}

window.customElements.define('weather-comp', Weather);