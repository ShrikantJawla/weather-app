/** @format */

function getValue(x) {
	return document.getElementById(x);
}
function createEl(x) {
	return document.createElement(x);
}

let id = "37f5a5d9f91b889ab0138447d19d66ff";
let lat, lon;

function success(pos) {
	const crd = pos.coords;
	lat = crd.latitude;
	lon = crd.longitude;
	onLoadLocation();
}

let coord = navigator.geolocation.getCurrentPosition(success);
let tempData;

async function onLoadLocation() {
	try {
		let data = await fetch(
			`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${id}&units=metric`
		);
		tempData = await data.json();
		display(tempData, tempData.name);
		console.log(tempData);
	} catch (e) {
		console.log(e);
	}
}

let res;
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
	showTime();
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
	datediv.innerText = d + "/" + m + "/" + y;
	setTimeout(showTime, 1000);
}
