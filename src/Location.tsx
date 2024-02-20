import { useState, useEffect } from 'react'
import Weather from './Weather';

interface WeatherData {
    city: string;
    country: string;
    temp: number;
    max_temp: number;
    min_temp: number;
    type: string;
    humidity: number;
    speed: number;
    cod: number;
    isLive: boolean | null;
}


const Location = () => {

    // usestate Hooks
    const [inputValue, setInputValue] = useState("");
    const [load, setLoad] = useState<boolean>(true);
    const [obj_Data, setObj_Data] = useState<WeatherData[]>([]);
    const [errMsg, setErrMsg] = useState("");
    const [localData, setLocalData] = useState<WeatherData[]>();
    const [load2, setLoad2] = useState<boolean>(true);
    const [showLiveCalled, setShowLiveCalled] = useState<boolean>(true); // ShowLive Data
    const [btnErrMsg, setBtnErrMsg] = useState<string>("")



    const apikey: string = "aa5baa63051313878b61092c4dfdb553";

    // URL Fetching :-
    const fetchData = async (apiurl: string, isLive: boolean) => {
        try {
            setLoad(true)
            const res = await fetch(apiurl);
            const data: any = await res.json();
            if (data.cod === 200) {
                setErrMsg("");
                const isExist = obj_Data.map((item) => item.city).includes(data.name);

                if (!isExist) {
                    setObj_Data(preData => [...preData,
                    {
                        city: data.name,
                        country: data.sys.country,
                        temp: data.main.temp,
                        max_temp: data.main.temp_max,
                        min_temp: data.main.temp_min,
                        type: data.weather[0].main,
                        humidity: data.main.humidity,
                        speed: data.wind.speed,
                        cod: data.cod,
                        isLive: isLive
                    },
                    ]);
                }
                else {
                    setErrMsg("Already Exist");
                }
            } else {
                setErrMsg(data.message);
            }
        } catch (error) {
            console.log("Error occured here:", error);
        } finally {
            setLoad(false);
        }
    }


    // search_func api :-
    const search_func = async (city: string) => {
        const url: string = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`;
        fetchData(url, false);
    }

    //Get weather with live location :-
    const showLiveData = () => {
        navigator.geolocation.getCurrentPosition((pos) => {
            const latitude: any = pos.coords.latitude;
            const longitude: number = pos.coords.longitude;

            if (latitude !== undefined && longitude !== undefined) {
                const url: string = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apikey}&units=metric`;
                fetchData(url, true)
            }
        })
    }


    // Local storage Functionality :-

    const localCity = Object.values(localStorage);

    const addCity = (cityName: string) => {
        localStorage.setItem(cityName, cityName);
        const Exist = (localData?.some((item) => item.city === cityName));

        if (!Exist) {
            const cityDetails = obj_Data.find((data) => data.city === cityName)
            if (cityDetails) {
                setLocalData(prev => [...prev || [], cityDetails])
            }
        } else {
            setBtnErrMsg("City is already added")
        }
    }

    const onDelete = (city: string) => {
        localStorage.removeItem(city);
        const updateLocalData = localData?.filter((item) => item.city !== city);
        setLocalData(updateLocalData);
    }


    const lStorageData = async () => {
        const fetchD = async () => {
            const newValue: WeatherData[] = [];
            for (const value of localCity) {
                const apiurl: string = `https://api.openweathermap.org/data/2.5/weather?q=${value}&appid=${apikey}&units=metric`;

                try {
                    const res = await fetch(apiurl);
                    const data: any = await res.json();

                    newValue.push({
                        city: data.name,
                        country: data.sys.country,
                        temp: data.main.temp,
                        max_temp: data.main.temp_max,
                        min_temp: data.main.temp_min,
                        type: data.weather[0].main,
                        humidity: data.main.humidity,
                        speed: data.wind.speed,
                        cod: data.cod,
                        isLive: null
                    });

                } catch (error) {
                    console.log(error);
                }
            };
            setLoad2(false);
            setLocalData(newValue);
        };
        fetchD();
    };


    useEffect(() => {
        if (showLiveCalled) {
            showLiveData();
            setShowLiveCalled(false);
        }
    }, [showLiveCalled]);

    useEffect(() => {
        lStorageData();
    }, [])



    return (
        <div className='Location'>
            <div className='center search'>
                <input type="text" name="search_term" id="seach_term" placeholder='Search Location...' value={inputValue} onChange={(e) => { setInputValue(e.target.value) }} />
                <button className='btn' onClick={() => { search_func(inputValue) }}><img src="/img/search_1.png" alt="button" height="30px" /></button>
            </div>
            {load && <h1 className=' center'><img src="/img/load.gif" alt="Loading" height="50px" /></h1>}
            {errMsg && <div className="Weather center">{errMsg}</div>}
            {obj_Data.length > 0 && (
                <div className='mainCon'>
                    {obj_Data.map((result, id) => (
                        <Weather key={id} search_data={result} onDelete={onDelete} addCity={addCity} />
                    ))}
                </div>
            )}
            <hr style={{ border: "2px dashed #dc2e2e" }} />
            <div>
                <h2 className='center'>Your Fav :</h2>
                {load2 && <p className=' center'><img src="/img/load.gif" alt="Loading" height="50px" /></p>}
                {!localCity || localCity.length === 0 && <p className='center Weather'>No fav city is available</p>}
                {btnErrMsg && <p className='center Weather'>{btnErrMsg}</p>}
                {localData && localData.length > 0 && (
                    <div className="mainCon">
                        {localData.map((res, id) => (
                            <Weather key={id} search_data={res} onDelete={onDelete} addCity={addCity} />
                        ))}
                    </div>
                )}

            </div>
        </div>
    )
}

export default Location
