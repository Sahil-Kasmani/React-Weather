import { useState, useEffect } from 'react'
import Weather from './Weather';



interface titleType {
  title?:string
}

const Location = ({ title }: titleType) => {

  // const searchLocation = () => {
  //   console.log(value);
  // }
  
  // usestate Hooks
  const [value, setValue] = useState("");
  const [search_data,setSearchData] = useState([]);
  const [load,setLoad] = useState<boolean>(true);


  // URL and UseEffect
  const search_func = async () =>{
    const apikey:string="aa5baa63051313878b61092c4dfdb553";
    const apiurl:string=`https://api.openweathermap.org/data/2.5/weather?q=${value === "" ? ("hyderabad") : (value)}&appid=${apikey}&units=metric`;

    const data = await fetch(apiurl)
    const res = await data.json();
      setSearchData(res);
      setLoad(false);
      // console.log(res);
    }

  useEffect(() => {
    search_func();
  },[]);


  return (
    <div className='Location'>
      <input type="text" name="search_term" id="seach_term" placeholder='Search Location...' value={value} onChange={(e) => {setValue(e.target.value)}} />
      <button id='btn' onClick={()=>{search_func()}}>Search</button>
      {title &&<p>{title}</p>}
      {load && <h1 className='Weather'>Loadding...</h1>}
      <Weather search_data={search_data} load={load}/>
    </div>
  )
}

export default Location