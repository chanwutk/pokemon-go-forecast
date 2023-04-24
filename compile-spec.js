import { compile } from 'vega-lite';
import { writeFileSync } from 'fs';


// TODO: use svg icon: https://erikflowers.github.io/weather-icons/
const emojiMap = {
  Windy: '🌪️',
  'Partly Cloudy': '⛅️',
  Sunny: '☀️',
  Clear: '🌙',
  Cloudy: '☁️',
  Fog: '🌫',
  Rain: '☔️',
  Snow: '⛄️',
};

const timeMap = {};
for (let i = 0; i < 24; i++) {
  timeMap['' + i] = (i % 12) + (i >= 12 ? 'PM' : 'AM');
}
timeMap['0'] = '12AM';
timeMap['12'] = '12PM';

const spec = {
  $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
  config: {
    view: { stroke: '' },
  },
  width: 1250,
  height: 500,
  data: { url: 'https://raw.githubusercontent.com/chanwutk/pokemon-go-forecast-data/main/weather.pgf.json' },
  transform: [
    { calculate: 'datum.weather !== null', as: 'valid' },
    { filter: { field: 'valid', equal: true } },
    { calculate: JSON.stringify(emojiMap) + '[datum.weather]', as: 'emoji' },
    { calculate: JSON.stringify(timeMap) + '[datum.time]', as: 'time' },
  ],
  encoding: {
    x: {
      field: 'time',
      type: 'nominal',
      axis: {
        title: '',
        labelAngle: 0,
        labelFontSize: 30,
        labelPadding: 15,
        labelBaseline: 'bottom',
        ticks: false,
        domain: false,
        orient: 'top',
      },
      sort: { field: 'order', op: 'min', order: 'ascending' },
    },
    y: {
      field: 'city',
      type: 'nominal',
      axis: {
        title: '',
        labelFontSize: 20,
        labelPadding: 15,
        ticks: false,
        domain: false,
      },
    },
  },
  layer: [
    {
      mark: { type: 'text', baseline: 'middle' },
      encoding: {
        text: { field: 'emoji', type: 'nominal' },
        size: { value: 50 },
      },
    },
    {
      mark: { type: 'text', baseline: 'middle', dy: 25 },
      encoding: {
        text: { field: 'types', type: 'nominal' },
        size: { value: 8 },
      },
    },
  ],
};


const vegaSpec = compile(spec).spec;
writeFileSync('./public/spec.js', `const spec = ${JSON.stringify(vegaSpec)};`);