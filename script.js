//APIS ADDRESS
const url =
  "https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=0783dde9496332573fca5cd853c81369";

const forecast =
  "https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=0783dde9496332573fca5cd853c81369";

  function getDay(date) {
    switch (date.getDay()) {
      case 0:
        return "Sunday";
      case 1:
        return "Monday";
      case 2:
        return "Tuesday";
      case 3:
        return "Wednesday";
      case 4:
        return "Thursday";
      case 5:
        return "Friday";
      case 6:
        return "Saturday";
      default:
        return "";
    }
  }



  fetch(url)
  .then(response => response.json())
  .then(data => {
    const section = document.getElementById('section')
    const myComponent = document.createElement("weather-app");
    myComponent.setAttribute('temp', JSON.stringify(data.main.temp))
    myComponent.setAttribute('city', JSON.stringify(data.name))
    myComponent.setAttribute('weather', JSON.stringify(data.weather[0].description))

    return section.appendChild(myComponent)

  })



class WeaterApp extends HTMLElement {
    constructor() {
        super()
        this.attachShadow({mode:"open"})
    }
    connectedCallback() {
        const temp = JSON.parse(this.getAttribute('temp'));
        const city = JSON.parse(this.getAttribute('city'));
        const weather = JSON.parse(this.getAttribute('weather'));
        this.render(temp, city, weather);
       
    }
    render(temp, city, weather) {
        const roundedTemp = Math.round(temp).toString();
        this.shadowRoot.innerHTML = `
        <style>
            h3 {
                margin: 0.5rem;
                text-transform: uppercase;
            }
            p {
                margin: 0;
                color: #8e8e8e;
            }
        </style>
        <h2>${roundedTemp}</h2>
        <h3>${weather}</h3>
        <p>${city}</p>
        `
    }

}

customElements.define("weather-app", WeaterApp)




// Forecast coming 5 days temp 


  fetch(forecast)
  .then(response => response.json())
  .then(data => {
    
    const footer = document.getElementById('footer')

    let arr = []
    data.list.map(day => {
        
        if(day.dt_txt.includes("12:00:00")){
           arr.push(day)
        }
        
    })

    arr.map(day=> {
        const myComponent = document.createElement("coming-days");
        const dayName = getDay(new Date(day.dt_txt));
        myComponent.setAttribute('day', JSON.stringify(dayName))
        myComponent.setAttribute('temp', JSON.stringify(day.main.temp))

        
        return footer.appendChild(myComponent)
    })

  })





class ComingDays extends HTMLElement {
    constructor() {
        super()
        this.attachShadow({mode:"open"})
    }
    connectedCallback() {
        const day = JSON.parse(this.getAttribute('day'));
        const temp = JSON.parse(this.getAttribute('temp'));
     
        this.render(day, temp);
      
    }
    render(day, temp) {
        const roundedTemp = Math.round(temp).toString();
        this.shadowRoot.innerHTML = `
        <style>
            div h3 {
                color: #2d303b;
                margin: 5px;
            }
            div p {
                font-size:10px;
                color: #2d303b;
                text-transform: uppercase;
                margin: 0;
            }
        </style>
        <div>
            <h3>${roundedTemp}℃ </h3>
            <p>${day}</p>
        </div>
        `
    }

}

customElements.define("coming-days", ComingDays)