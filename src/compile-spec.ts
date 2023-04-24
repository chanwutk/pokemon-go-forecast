import { compile } from 'vega-lite';
import { writeFileSync } from 'fs';
import {vlSpec} from './vl-spec';


const vegaSpec = compile(vlSpec).spec;
writeFileSync('./public/spec.js', `const spec = ${JSON.stringify(vegaSpec)};`);