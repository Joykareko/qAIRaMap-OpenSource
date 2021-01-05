import {
	drawQhawaxMap,//ok
	drawChart,
	airQuality,//ok
	qhawaxLeaf,//ok
	zoneColorNoise,//ok
	qairito,
	uvColor,//ok
	ECAlimits,//ok
	addZero, //ok
	incaValues,
	setPannelData,
	setInfowindow
} from '../src/lib/mapAssets';
import { viewMap } from '../src/lib/HtmlComponents.js';
import { initialize } from "@googlemaps/jest-mocks";

beforeEach(() => {
    initialize();
  })


const dataAirQuality = {
	CO: 3,
	H2S: 27,
	NO2: 169,
	O3: 65,
	PM10: 20,
	PM25: 62,
	SO2: 0,
	main_inca: 600,
	qhawaxId: 1,
	qhawax_name: "qH004",
	timestamp_zone: "Mon, 04 Jan 2021 18:00:00 GMT"
};

const resultAirQuality = {
	time: "13:00",
	result:{
		CO: {color: "#009966", label: "Good"},
		H2S: {color: "#009966", label: "Good"},
		NO2: {color: "#cc0033", label: "Danger"},
		O3: {color: "#ffde33", label: "Moderate"},
		PM10: {color: "#009966", label: "Good"},
		PM25: {color: "#ffde33", label: "Moderate"},
		SO2: {color: "#009966", label: "Good"},
	}
};

const dataIndexValue = {
	CO: 20.022,
	CO_ug_m3: 23.025,
	H2S: 31.481,
	H2S_ug_m3: 43.759,
	ID: "qH008",
	NO2: 186.679,
	NO2_ug_m3: 350.957,
	O3: 38.582,
	O3_ug_m3: 75.621,
	PM1: 23.487,
	PM10: 32.728,
	PM25: 21.325,
	SO2: 0,
	SO2_ug_m3: 0,
	UV: 0,
	UVA: 0,
	UVB: 0,
	humidity: 94.7,
	lat: -12.103056,
	lon: -76.989166,
	pressure: 99655.75,
	spl: 50.4,
	temperature: 14.5,
	timestamp: "2020-07-29 23:53:19",
	zone: "Zona Residencial"
};

const resultIndexValue = {
	CO: 20,
	H2S: 31.5,
	NO2: 186.7,
	O3: 38.6,
	PM1: 23.487,
	PM10: 32.7,
	PM25: 21.3,
	SO2: 0,
	UV: 0,
	humidity: 94.7,
	lat: "-12.10306",
	lng: "-76.98917",
	pressure: 99.7,
	spl: 50.4,
	temperature: 14.5,
	time: "29 de Julio de 2020, 23:53"
};

const resultZoneColorNoise = {
	color: "#cc0033",
	zone: "Zona Residencial"
};

test('qhawaxLeaf for each state of the qhawax', () => {
	expect(qhawaxLeaf(-1)).toStrictEqual(
		'/img/leafs/leaf_out_of_service.png'
	);
	expect(qhawaxLeaf(0)).toStrictEqual(
		'/img/leafs/leaf_helmet.png'
	);
	expect(qhawaxLeaf(1)).toStrictEqual(
		'/img/leafs/leaf_helmet.png'
	);
	expect(qhawaxLeaf(50)).toStrictEqual(
		'/img/leafs/leaf_inca_good.png'
	);
	expect(qhawaxLeaf(100)).toStrictEqual(
		'/img/leafs/leaf_inca_moderate.png'
	);
	expect(qhawaxLeaf(500)).toStrictEqual(
		'/img/leafs/leaf_inca_bad.png'
	);
	expect(qhawaxLeaf(600)).toStrictEqual(
		'/img/leafs/leaf_inca_hazardous.png'
	);
	expect(qhawaxLeaf()).toStrictEqual(
		'/img/leafs/leaf_out_of_service.png'
	);
});

test('uvColor', () => {
	expect(uvColor(0)).toStrictEqual({
		color: '#009966',
		label: 'Minimum',
	});
	expect(uvColor(3)).toStrictEqual({
		color: '#ffde33',
		label: 'Low',
	});
	expect(uvColor(6)).toStrictEqual({
		color: '#ff9933',
		label: 'Moderate',
	});
	expect(uvColor(9)).toStrictEqual({
		color: '#cc0033',
		label: 'High',
	});
	expect(uvColor(14)).toStrictEqual({
		color: 'darkmagenta',
		label: 'Extreme',
	});
});

test('airQuality', () =>{
	expect(airQuality(dataAirQuality)).toStrictEqual(resultAirQuality);
});


test('zoneColorNoise', () =>{
	expect(zoneColorNoise(dataIndexValue)).toStrictEqual(resultZoneColorNoise);
});

test('ECAlimits', () =>{
	expect(ECAlimits('CO')).toStrictEqual(10000);
	expect(ECAlimits('NO2')).toStrictEqual(100);
	expect(ECAlimits('O3')).toStrictEqual(100);
	expect(ECAlimits('H2S')).toStrictEqual(150);
	expect(ECAlimits('SO2')).toStrictEqual(250);
	expect(ECAlimits('PM25')).toStrictEqual(50);
	expect(ECAlimits('PM10')).toStrictEqual(100);
});

test('addZero', () =>{
	expect(addZero(2)).toStrictEqual('02');
});

const qhawax = {
	area_name: "Residential Zone",
	comercial_name: "FaberCastell",
	eca_noise_id: 2,
	id: 4,
	lat: -12,
	lon: -77,
	main_inca: -1,
	mode: "Cliente",
	name: "qH004",
	qhawax_id: 1,
	qhawax_type: "STATIC",
	state: "OFF"
}

test('drawQhawaxMap', () => {
    google.maps.Map=jest.fn();
    google.maps.MapTypeId=jest.fn();
    google.maps.MapTypeId.ROADMAP=jest.fn();
    require('../build/js/materialize.min.js')
	document.body.innerHTML = '<header></header>' + viewMap;
	const map = new google.maps.Map(document.querySelector('#map'), {
	});
	map.addListener=jest.fn()
	map.fitBounds=jest.fn()
	map.getZoom=jest.fn()
	map.setZoom=jest.fn()
	map.markers = []
  expect(drawQhawaxMap(map,qhawax)).toBe(undefined);
  })

  test('setQhawaxInfowindow', () => {
    google.maps.Map=jest.fn();
    google.maps.MapTypeId=jest.fn();
    google.maps.MapTypeId.ROADMAP=jest.fn();
    require('../build/js/materialize.min.js')
	document.body.innerHTML = '<header></header>' + viewMap;
	const map = new google.maps.Map(document.querySelector('#map'), {
	});
	map.addListener=jest.fn()
	map.fitBounds=jest.fn()
	map.getZoom=jest.fn()
	map.setZoom=jest.fn()
	map.markers = []
  expect(setQhawaxInfowindow(map,qhawax)).toBe(undefined);
  })
  