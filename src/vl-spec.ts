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
  Windy: 'wind.svg',
  'Partly Cloudy': 'partly-cloudy-day.svg',
  Sunny: 'clear-day.svg',
  Clear: 'starry-night.svg',
  Cloudy: 'cloudy.svg',
  Fog: 'fog.svg',
  Rain: 'rain.svg',
  Snow: 'snow.svg',
} as const;

const timeMap = new Array<string>(24);
for (let i = 0; i < 24; i++) {
  timeMap[i] = (i % 12) + (i >= 12 ? ' PM' : ' AM');
}
timeMap[0] = '12 AM';
timeMap[12] = '12 PM';


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
    // { calculate: '\"./icons/\" + ' + JSON.stringify(iconMap) + '[datum.weather]', as: 'icon' },
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
        labelFont: 'Inter',
      },
      sort: { field: 'order', op: 'min', order: 'ascending' },
    },
    y: {
      field: 'city',
      type: 'nominal',
      axis: {
        title: '',
        labelFontSize: 20,
        labelPadding: 10,
        ticks: false,
        domain: false,
        labelFont: 'Noto Sans Thai',
        offset: -15,
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
    // {
    //   mark: { type: 'image', baseline: 'middle', width: 75, height: 75, align: 'center' },
    //   encoding: {
    //     url: { field: 'icon', type: 'nominal' },
    //   },
    // },
    {
      mark: { type: 'text', baseline: 'middle', dy: 35, font: 'Inter' },
      encoding: {
        text: { field: 'types', type: 'nominal' },
        size: { value: 8 },
      },
    },
  ],
};
