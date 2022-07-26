import { useContext, useState } from "react";
import { AuthContext } from "../context/authContext";
import { gql, useQuery, useLazyQuery } from "@apollo/client";
import { useForm } from "../utility/hook";
import { TextField, Button, Container, Stack, Alert } from "@mui/material";
import "../App.css";
import { grid } from "@mui/system";
import { TiWeatherPartlySunny } from "react-icons/ti";
import { FaTemperatureLow } from "react-icons/fa";
import { TbGauge } from "react-icons/tb";
import { WiHumidity } from "react-icons/wi";
import { MdVisibility } from "react-icons/md";
import { TbWind } from "react-icons/tb";

const GET_WEATHER = gql`
  query Weather($name: String) {
    getWeather(name: $name) {
      coord {
        lon
        lat
      }
      weather {
        id
        main
        description
        icon
      }
      base
      main {
        temp
        feelsLike
        tempMin
        tempMax
        pressure
        humidity
      }
      visibility
      wind {
        speed
        deg
        gust
      }
      clouds {
        all
      }
      dt
      sys {
        type
        id
        country
        sunrise
        sunset
      }
      timezone
      id
      name
      cod
    }
  }
`;

function Weather(props) {

  function getWeatherCallback() {
    getWeatherData();
  }

  const { onChange, onSubmit, values } = useForm(getWeatherCallback, {
    name: "",
  });

  const [getWeatherData, { loading, error, data }] = useLazyQuery(GET_WEATHER);

  if (loading) return "Loading...";
  if (error) {
    console.log(error);
  }

  return (
    <Container spacing={2} maxWidth="sm">
      <h3>Check Weather</h3>
      <p>Enter The city name to get the Current weather.</p>
      <Stack spacing={2} paddingBottom={2}>
        <TextField label="City Name" name="name" onChange={onChange} />
      </Stack>
      <Button
        style={{ marginTop: 10, marginBottom: 10 }}
        variant="contained"
        onClick={() => getWeatherData({variables: {name: values.name}})}
      >
        Search
      </Button>
      {data && data.getWeather.base != null ? (
        <div className="weatherBody">
          <div style={{ textAlign: "center" }}>
            <h1>{data.getWeather.name}</h1>
          </div>
          <div className="grid-container">
            <div className="child">
              <h2>Temperature</h2>
              <FaTemperatureLow style={{ display: "inline-flex" }} size={30} />
              <h3>{Math.round(data.getWeather.main.temp - 273.15)} C</h3>
            </div>

            <div className="child">
              <h2>Pressure</h2>
              <TbGauge style={{ display: "inline-flex" }} size={30} />
              <h3>{Math.round(data.getWeather.main.pressure)} hPa</h3>
            </div>
            <div className="child">
              <h2>Humidity</h2>
              <WiHumidity style={{ display: "inline-flex" }} size={30} />
              <h3>{Math.round(data.getWeather.main.humidity)}%</h3>
            </div>
            <div className="child">
              <h2>Visibility</h2>
              <MdVisibility style={{ display: "inline-flex" }} size={30} />
              <h3>{Math.round(data.getWeather.visibility / 1000)}km</h3>
            </div>
            <div className="child">
              <h2>Weather</h2>
              <TiWeatherPartlySunny
                style={{ display: "inline-flex" }}
                size={30}
              />
              <h3>{data.getWeather.weather[0].main}</h3>
            </div>
            <div className="child">
              <h2>Wind</h2>
              <TbWind style={{ display: "inline-flex" }} size={30} />
              <h3>{data.getWeather.wind.speed}m/s</h3>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </Container>
  );
}

export default Weather;
