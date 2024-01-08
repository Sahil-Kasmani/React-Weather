import { useState, useEffect } from 'react'
import Weather from './Weather';


const Location = () => {

  // usestate Hooks
  const [inputValue, setInputValue] = useState("");
  const [search_data, setSearchData] = useState([]);
  const [load, setLoad] = useState<boolean>(true);

  // live location use state 
  const [live_Location, setLive_Location] = useState<boolean>(false);

  // search_func api  
  const search_func = async () => {
    const apikey: string = "aa5baa63051313878b61092c4dfdb553";
    const apiurl: string = `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=${apikey}&units=metric`;

    try {
      const data = await fetch(apiurl);
      const res = await data.json();
      setSearchData(res);
      setLoad(false);
      setLive_Location(false);

    } catch (error) {
      console.log("Error occured here:", error);
    }
  }

  //Get weather with live location 
  const show = () => {
    navigator.geolocation.getCurrentPosition((pos) => {
      const latitude: any = pos.coords.latitude;
      const longitude: number = pos.coords.longitude;

      if (latitude !== undefined && longitude !== undefined) {
        const apikey: string = "aa5baa63051313878b61092c4dfdb553";
        const url: string = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apikey}&units=metric`

        fetch(url)
          .then((res) => res.json())
          .then((data) => {
            setSearchData(data);
            setLoad(false);
            setLive_Location(true);
          })
          .catch((error) => {
            console.log("Error occurred:", error);
          });
      }
    })
  }

  useEffect(() => {
    show();
  }, [])

  return (
    <div className='Location'>
      <div className='center'>
        <input type="text" name="search_term" id="seach_term" placeholder='Search Location...' value={inputValue} onChange={(e) => { setInputValue(e.target.value) }} />
        <button id='btn' onClick={() => { search_func() }}>Search</button>
      </div>
      {load && <h1 className='Weather center'>Loadding...</h1>}
      <Weather search_data={search_data} load={load} live_Location={live_Location} />
    </div>
  )
}

export default Location
