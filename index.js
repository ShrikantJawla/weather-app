/** @format */

function getValue(x) {
	return document.getElementById(x);
}
function createEl(x) {
	return document.createElement(x);
}

let res;
let id = "37f5a5d9f91b889ab0138447d19d66ff";
async function getdata() {
	let name = document.getElementById("name").value;
	try {
		let data = await fetch(
			`https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${id}&units=metric`
		);
		res = await data.json();
		display(res, name);
		console.log(res);
	} catch (e) {
		console.log(e);
	}
}

function getWeather() {
	getdata();
}

function display(res, name) {
	let map = document.getElementById("gmap_canvas");
	let con = document.getElementById("text");
	con.innerHTML = null;
	map.src = `https://maps.google.com/maps?q=${name}&t=&z=13&ie=UTF8&iwloc=&output=embed`;

	let divTim = createEl("div");
	let timediv = createEl("div");
	timediv.setAttribute("id", "myClockDisplay");
	let time2div = createEl("div");
	time2div.setAttribute("id", "myDateDisplay");
	divTim.append(timediv, time2div);

	let divN = createEl("div");
	let names = createEl("p");
	names.innerText = `${res.name}, ${res.sys.country}`;
	divN.append(names);

	let divT = createEl("div");
	let temp = createEl("p");
	let cl = createEl("i");
	cl.setAttribute("class", "fa-solid fa-cloud-sun");
	temp.innerText = res.main.temp + " C";
	divT.append(cl, temp);

	let divT2 = createEl("div");
	let temp2 = createEl("p");
	temp2.innerText = "Feels like " + res.main.feels_like;

	let temp3 = createEl("p");
	temp3.innerText = "Overcast " + res.weather[0].main;
	divT2.append(temp2, temp3);

	let divT3 = createEl("div");
	let hum = createEl("p");
	hum.innerText = `Humidity ${res.main.humidity}%`;

	vis = createEl("p");
	vis.innerText = `visibility ${Math.floor(res.visibility / 1000)}.0 K/m`;

	let dis = createEl("p");
	dis.innerText = ` ${res.weather[0].description}`;

	let max = createEl("p");
	max.innerText = `max-temp ${res.main.temp_max} C`;

	let windS = createEl("p");
	windS.innerText = `Wind-Speed ${res.wind.speed} m/s`;

	divT3.append(hum, vis, dis, max, windS);

	con.append(divTim, divN, divT, divT2, divT3);
}

function showTime() {
	var timediv = document.getElementById("myClockDisplay");
	var datediv = document.getElementById("myDateDisplay");
	var dt = new Date();
	var d = dt.getDate();
	var m = dt.getMonth() + 1; // getMonth() returns the month "index" starting with 0 for Jan
	var y = dt.getFullYear();
	var hh = dt.getHours();
	var mm = dt.getMinutes();
	var ss = dt.getSeconds();
	var session = "AM";
	if (hh == 0) {
		hh = 12;
	}

	if (hh > 12) {
		hh = hh - 12;
		session = "PM";
	}

	d = d < 10 ? "0" + d : d;
	m = m < 10 ? "0" + m : m;
	hh = hh < 10 ? "0" + hh : hh;
	mm = mm < 10 ? "0" + mm : mm;
	ss = ss < 10 ? "0" + ss : ss;
	timediv.innerText = hh + ":" + mm + ":" + ss + " " + session;
	datediv.innerText = m + "/" + d + "/" + y;
	setTimeout(showTime, 1000);
}

showTime();

// {
//     "coord": {
//         "lon": 77.6833,
//         "lat": 29.4667
//     },
//     "weather": [
//         {
//             "id": 804,
//             "main": "Clouds",
//             "description": "overcast clouds",
//             "icon": "04n"
//         }
//     ],
//     "base": "stations",
//     "main": {
//         "temp": 27.02,
//         "feels_like": 30.27,
//         "temp_min": 27.02,
//         "temp_max": 27.02,
//         "pressure": 1002,
//         "humidity": 85,
//         "sea_level": 1002,
//         "grnd_level": 975
//     },
//     "visibility": 10000,
//     "wind": {
//         "speed": 2.74,
//         "deg": 99,
//         "gust": 4.48
//     },
//     "clouds": {
//         "all": 99
//     },
//     "dt": 1659625300,
//     "sys": {
//         "country": "IN",
//         "sunrise": 1659571844,
//         "sunset": 1659620400
//     },
//     "timezone": 19800,
//     "id": 1262332,
//     "name": "Muzaffarnagar",
//     "cod": 200
// }
