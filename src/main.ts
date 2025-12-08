import {bootstrapApplication} from '@angular/platform-browser';
import {appConfig} from './app/app.config';
import {App} from './app/app';
import 'highlight.js/styles/atom-one-dark.css';

bootstrapApplication(App, appConfig).catch((err) => console.error(err));
