import { useState, useEffect } from 'react'
import Weather from './Weather';


const Location = () => {

  // const searchLocation = () => {
  //   console.log(inputValue);
  // }

  // usestate Hooks
  const [inputValue, setInputValue] = useState("");
  const [search_data, setSearchData] = useState([]);
  const [load, setLoad] = useState<boolean>(true);

  // live location use state 
  const [latitude, setLatitude] = useState<number>();
  const [longitude, setLongitude] = useState<number>();
  const [live_value, setLive_value] = useState<any>({});



  // live location 
  navigator.geolocation.getCurrentPosition((pos) => {
    setLatitude(pos.coords.latitude);
    setLongitude(pos.coords.longitude);
  })


  // search api URL 
  const search_func = async () => {
    const apikey: string = "aa5baa63051313878b61092c4dfdb553";
    const apiurl: string = `https://api.openweathermap.org/data/2.5/weather?q=${inputValue === "" ? (live_value) : (inputValue)}&appid=${apikey}&units=metric`;

    const data = await fetch(apiurl)
    const res = await data.json();
    setSearchData(res);
    setLoad(false);
  }

  // live location 
  const show = async () => {
    if (latitude !== undefined && longitude !== undefined) {
      const apikey: string = "aa5baa63051313878b61092c4dfdb553";
      const url: string = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apikey}&units=metric`

      fetch(url)
        .then((res) => {
          return res.json()
        })
        .then((data) => {
          // console.log(data)
          setSearchData(data)
          setLive_value(data.name)
          setLoad(false);
        })
        .catch((err) => {
          console.log("something is wrong with it" + err)
        })
    }
  }

  useEffect(() => {

    const fetchData = async () => {
      await show();
      // await search_func();
    }

    fetchData();

  }, [latitude, longitude])

  // useEffect(() => {
  //   search_func();
  // }, []);


  // const live = async () => {
  //   // await show();
  //   const apikey: string = "aa5baa63051313878b61092c4dfdb553";
  //   const apiurl: string = `https://api.openweathermap.org/data/2.5/weather?q=${inputValue === "" ? (live_value) : (inputValue)}&appid=${apikey}&units=metric`;


  //   const data = await fetch(apiurl)
  //   const res = await data.json();
  //   setSearchData(res);

  // }

  // fetch(apiurl)
  //   .then((res) => {
  //     return res.json()

  //   })
  //   .then((data: any) => {
  //     setSearchData(data)
  //     setInputValue(data.address.city);

  //   })

  // search_func();

  return (
    <div className='Location'>
      <div className='center'>
        {/* <p>{live_value}</p> */}
        <input type="text" name="search_term" id="seach_term" placeholder='Search Location...' value={inputValue} onChange={(e) => { setInputValue(e.target.value) }} />
        <button id='btn' onClick={() => { search_func() }}>Search</button>
        {/* <button id='btn' onClick={() => { live() }}>Live location</button> */}
      </div>
      {load && <h1 className='Weather center'>Loadding...</h1>}
      <Weather search_data={search_data} load={load} />
    </div>
  )
}

export default Location