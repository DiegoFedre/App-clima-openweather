import React from 'react';
import Spinner from './Spinner';

const Card = ({ loadingData, showData, weather, forecast }) => {
	let today = new Date();
	let day = today.getDate();
	let month = today.getMonth() + 1;
	let year = today.getFullYear();
	let date = day + '/' + month + '/' + year;

	let url = '';
	let iconUrl = '';

	// Creo las variables que van a contener las url de los iconos
	let iconUrl9hs = '';
	let iconUrl15hs = '';
	let iconUrl21hs = '';

	// Creo las variables para almacenar la fecha y hora para luego ser formateadas para mostrarlas
	let forecastDate9hs = '';
	let forecastDate15hs = '';
	let forecastDate21hs = '';

	if (loadingData) {
		return <Spinner />;
	}

	if (showData) {
		url = 'http://openweathermap.org/img/w/';
		iconUrl = url + weather.weather[0].icon + '.png';

		// Creo las url de los iconos del tiempo a 3, 6 y 9 horas
		iconUrl9hs = url + forecast.list[2].weather[0].icon + '.png';
		iconUrl15hs = url + forecast.list[4].weather[0].icon + '.png';
		iconUrl21hs = url + forecast.list[6].weather[0].icon + '.png';

		// Formateo la fecha y hora (dd/mm/aaaa hh:mm) para luego mostarlas
		forecastDate9hs =
			forecast.list[2].dt_txt.substring(8, 10) +
			'/' +
			forecast.list[2].dt_txt.substring(5, 7) +
			'/' +
			forecast.list[2].dt_txt.substring(0, 4) +
			' ' +
			forecast.list[2].dt_txt.substring(11, 16);
		forecastDate15hs =
			forecast.list[4].dt_txt.substring(8, 10) +
			'/' +
			forecast.list[4].dt_txt.substring(5, 7) +
			'/' +
			forecast.list[4].dt_txt.substring(0, 4) +
			' ' +
			forecast.list[4].dt_txt.substring(11, 16);
		forecastDate21hs =
			forecast.list[6].dt_txt.substring(8, 10) +
			'/' +
			forecast.list[6].dt_txt.substring(5, 7) +
			'/' +
			forecast.list[6].dt_txt.substring(0, 4) +
			' ' +
			forecast.list[6].dt_txt.substring(11, 16);
	}
	return (
		<div className="mt-5">
			{showData === true ? (
				<div className="container">
					<div className="card mb-3 mx-auto bg-dark text-light">
						<div className="row g-0">
							<div className="col-md-4">
								<h3 className="card-title">{weather.name}</h3>
								<p className="card-date">{date}</p>
								{/* La temperatura me la da en grados kelvin, para pasarla a grados celcius le resto la constante kelvin que son 273.15 */}
								<h1 className="card-temp">
									{(weather.main.temp - 273.15).toFixed(1)}°C
								</h1>
								<p className="card-desc">
									<img src={iconUrl} alt="icon" className="card-desc-icon" />
									{weather.weather[0].description}
								</p>
								<img
									src="https://images.pexels.com/photos/1722183/pexels-photo-1722183.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
									className="img-fluid rounded-start"
									alt=".."
								/>
							</div>
							<div className="col-md-8">
								<div className="card-body text-start mt-2">
									<h5 className="card-text">
										{' '}
										Temperatura máxima:{' '}
										{(weather.main.temp_max - 273.15).toFixed(1)}°C{' '}
									</h5>
									<h5 className="card-text">
										{' '}
										Temperatura mínima:{' '}
										{(weather.main.temp_min - 273.15).toFixed(1)}°C{' '}
									</h5>
									<h5 className="card-text">
										{' '}
										Sensación términca:{' '}
										{(weather.main.feels_like - 273.15).toFixed(1)}°C{' '}
									</h5>

									<h5 className="card-text">
										{' '}
										Humedad: {weather.main.humidity}%{' '}
									</h5>
									<h5 className="card-text">
										{' '}
										Velocidad del viento: {weather.wind.speed}m/s{' '}
									</h5>
								</div>
								<hr />

								<div className="row mt-4">
									<div className="col">
										<p>{forecastDate9hs}hs</p>
										<p className="description">
											<img src={iconUrl9hs} alt="icon9" />
											{forecast.list[2].weather[0].description}
										</p>
										<p className="temp">
											{(forecast.list[2].main.temp - 273.15).toFixed(1)}C°
										</p>
									</div>

									<div className="col">
										<p>{forecastDate15hs}hs</p>
										<p className="description">
											<img src={iconUrl15hs} alt="icon3" />
											{forecast.list[4].weather[0].description}
										</p>
										<p className="temp">
											{(forecast.list[4].main.temp - 273.15).toFixed(1)}C°
										</p>
									</div>

									<div className="col">
										<p>{forecastDate21hs}hs</p>
										<p className="description">
											<img src={iconUrl21hs} alt="icon3" />
											{forecast.list[6].weather[0].description}
										</p>
										<p className="temp">
											{(forecast.list[6].main.temp - 273.15).toFixed(1)}C°
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			) : (
				<h2 className="text-light">Sin datos</h2>
			)}
		</div>
	);
};

export default Card;
