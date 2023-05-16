import { TopLevelSpec } from 'vega-lite';


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

const iconMap = {
  Windy: 'https://basmilius.github.io/weather-icons/production/fill/all/wind.svg',
  'Partly Cloudy': 'https://basmilius.github.io/weather-icons/production/fill/all/partly-cloudy-day.svg',
  Sunny: 'https://basmilius.github.io/weather-icons/production/fill/all/clear-day.svg',
  Clear: 'https://basmilius.github.io/weather-icons/production/fill/all/starry-night.svg',
  Fog: 'https://basmilius.github.io/weather-icons/production/fill/all/fog.svg',
  Rain: 'https://basmilius.github.io/weather-icons/production/fill/all/rain.svg',
  Snow: 'https://basmilius.github.io/weather-icons/production/fill/all/snow.svg',
} as const;

const timeMap = new Array<string>(24);
for (let i = 0; i < 24; i++) {
  timeMap[i] = (i % 12) + (i >= 12 ? 'PM' : 'AM');
}
timeMap[0] = '12AM';
timeMap[12] = '12PM';


export const vlSpec: TopLevelSpec = {
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
    { calculate: JSON.stringify(iconMap) + '[datum.weather]', as: 'icon' },
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
    // {
    //   mark: { type: 'text', baseline: 'middle' },
    //   encoding: {
    //     text: { field: 'emoji', type: 'nominal' },
    //     size: { value: 50 },
    //   },
    // },
    {
      mark: { type: 'image', baseline: 'middle', width: 30, height: 30 },
      encoding: {
        url: { field: 'icon', type: 'nominal' },
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