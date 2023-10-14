import React, { useState } from 'react';
import Form from './Form';
import Card from './Card';

const WeatherPanel = () => {
	let urlWeather =
		'https://api.openweathermap.org/data/2.5/weather?appid=7827e49f806969d5ebe0896f4d5c598a&lang=es';

	let cityUrl = '&q=';

	let urlForecast =
		'https://api.openweathermap.org/data/2.5/forecast?appid=7827e49f806969d5ebe0896f4d5c598a&lang=es';

	//Voy a almacenar la respuesta del tiempo actual
	const [weather, setWeather] = useState([]);
	//Voy a almacenar la prediccion de las siguientes horas
	const [forecast, setForecast] = useState([]);
	//Controlo a traves del estado que se pueda visualizar el Spinner
	const [loading, setLoading] = useState(false);
	//Controlo a traves del estado la visualizacion de la tarjeta con informacion
	const [show, setShow] = useState(false);
	//Esta variable de estado la creo para poder comunicarse con el formulario
	const [location, setLocation] = useState('');

	//Funcion que hara la llamada a la API y recogera la localizacion
	const getLocation = async (loc) => {
		setLoading(true); //Hago que se vea el spinner
		setLocation(loc); // Guardo en location la ciudad

		//Primero completo la url con lo que busca el usuario
		urlWeather = urlWeather + cityUrl + loc;

		//Realizo la llamada a la API para obtener el tiempo actual
		await fetch(urlWeather)
			.then((response) => {
				if (!response.ok) {
					setLoading(false);
					setShow(false);
					return Promise.reject({ response });
				}
				return response.json();
			})
			.then((weatherData) => {
				console.log(weatherData);
				setWeather(weatherData);
			})
			.catch((error) => {
				console.log(error);
				setLoading(false);
				setShow(false);

				return Promise.reject(error);
			});

		//Voy a llamar a la API para traer el tiempo de las siguientes horas
		//Primero completo la url con lo que la persona busca
		urlForecast = urlForecast + cityUrl + loc;

		//Realizo la llamada
		await fetch(urlForecast)
			.then((response) => {
				if (!response.ok) {
					setLoading(false);
					setShow(false);
					return Promise.reject({ response });
				}
				return response.json();
			})
			.then((forecastData) => {
				console.log(forecastData);
				setForecast(forecastData);

				setLoading(false);
				setShow(true);
			})
			.catch((error) => {
				console.log(error);
				setLoading(false);
				setShow(false);
				return Promise.reject(error);
			});
	};

	return (
		<React.Fragment>
			<Form
				newLocation={getLocation} //Le paso este prop para obtener la localizacion (loc)
			/>

			<Card
				showData={show}
				loadingData={loading}
				weather={weather}
				forecast={forecast}
			/>
		</React.Fragment>
	);
};

export default WeatherPanel;
