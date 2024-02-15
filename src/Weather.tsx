import { useState } from "react";


interface dataType {
  search_data: any;
  LocalStorage: any;
  addCity: any;
  onDelete: any;

}

const Weather = ({ search_data, LocalStorage, addCity, onDelete }: dataType) => {

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


  const celToFah = (tempreture: number) => {
    return `${isCel ? Math.round(tempreture) + ' °C' : Math.round((tempreture * 9 / 5) + 32) + ' °F'}`;
  }

  const convert = () => {
    setIsCel((prev) => !prev)
  }


  const d = new Date();
  const date = d.toDateString();
  const localC = Object.values(localStorage);


  const hAdd = () => {
    addCity(search_data.city);
  }

  const hDlt = () => {
    onDelete(search_data.city);
  }


  return (
    <div className="main">
      <div className={Math.round(search_data.temp) >= 1 && Math.round(search_data.temp) <= 15 ? ('green') :
        Math.round(search_data.temp) >= 16 && Math.round(search_data.temp) <= 30 ? ('blue') :
          Math.round(search_data.temp) >= 31 && Math.round(search_data.temp) <= 45 ? ('yellow') :
            Math.round(search_data.temp) >= 46 ? ('red') : ('Weather')}>


        <div className="Container">

          <div className="container1">
            {search_data.isLive ? (
              <p className="abs"><img src="/img/red_circle.gif" alt="Red_Circle" height="12px" /> Live</p>
            ) : ""}
            <p className="forFlex">{search_data.city} <sup>{search_data.country}</sup></p>
            <h1 className="forFlex">{celToFah(search_data.temp)}{' '}{'| '}
              <sup><span onClick={() => convert()} style={{ cursor: 'pointer' }}>
                {isCel ? '°F' : '°C'}
              </span></sup>
            </h1>
            <p className="forFlex">{search_data.type}</p>
          </div>
          <div className="container2">
            {(search_data.isLive) ? (" ") : (localC.includes(search_data.city)) ? <button className="DltBtn" onClick={() => { hDlt() }}>Delete</button> : <button className="AddBtn" onClick={() => hAdd()}>+ Add</button>}
            <p>{date}</p>
            <div className="container3">
              <p><img src="/img/up-arrow.png" alt="Arrow up" height="12px" />  <span>{search_data.max_temp}</span></p>
              <p> <img src="/img/arrow-down.png" alt="Arrow Down" width="15px" />  <span>{search_data.min_temp}</span> </p>
            </div>
            <p className='humidity'>{search_data.humidity} <span>humidity</span></p>
            <p className="speed">{search_data.speed} <span>km/h</span></p>
          </div>

        </div>
      </div>

    </div>
  )
}

export default Weather