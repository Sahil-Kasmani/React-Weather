import { useState } from "react";


interface dataType{
  search_data:any;
  load?:any
}

const Weather = ({search_data,load}: dataType) => {
  
//   const search_data:any = {
//     "coord": {
//         "lon": 78.4744,
//         "lat": 17.3753
//     },
//     "weather": [
//         {
//             "id": 721,
//             "main": "Haze",
//             "description": "haze",
//             "icon": "50d"
//         }
//     ],
//     "base": "stations",
//     "main": {
//         "temp": 27.23,
//         "feels_like": 26.83,
//         "temp_min": 26.73,
//         "temp_max": 27.23,
//         "pressure": 1017,
//         "humidity": 36
//     },
//     "visibility": 4000,
//     "wind": {
//         "speed": 3.6,
//         "deg": 70
//     },
//     "clouds": {
//         "all": 40
//     },
//     "dt": 1703064141,
//     "sys": {
//         "type": 1,
//         "id": 9214,
//         "country": "IN",
//         "sunrise": 1703034643,
//         "sunset": 1703074562
//     },
//     "timezone": 19800,
//     "id": 1269843,
//     "name": "Hyderabad",
//     "cod": 200
// }
const [isCel, setIsCel] = useState<boolean>(true);


const celToFah = (tempreture:number)=> {
  return `${isCel ? Math.round(tempreture) + ' °C' : Math.round((tempreture * 9/5) + 32) + ' °F'}`;
}
// const celcius = ():number => search_data.main.temp;


const convert = () => {
  setIsCel((prev)=>!prev)
}




  return (
    <div>
        {search_data.cod === 200 ? (
          <div className={search_data.main.temp >= 1 && search_data.main.temp <= 15 ? ('green') : 
          search_data.main.temp >= 16 && search_data.main.temp <= 30 ? ('blue') : 
          search_data.main.temp >= 31 && search_data.main.temp <= 45 ? ('yellow') : 
          search_data.main.temp >= 46 ? ('red') : ('Weather')}>
          <p>{search_data.name} <sup>{search_data.sys.country}</sup></p>
          <h1>{celToFah(search_data.main.temp)}{' '}{'| '} 
          <sup><span onClick={()=>convert()} style={{ cursor: 'pointer'}}>
          {isCel ? '°F' : '°C'}
          </span></sup>
          </h1>
          
          <p>{search_data.weather[0].main}</p> 

          <div className="weat_speed">
            <p className='humidity'>{search_data.main.humidity} <span>humidity</span></p>
            <p className="speed">{search_data.wind.speed} <span>km/h</span></p>
          </div>
          </div>
        ) : 
        ( load === false )? (
          <div className="Weather"> Entered City is not available !!</div>
        ):(<></>)
        }
      </div>
    )
}

export default Weather