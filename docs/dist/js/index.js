import ready from "../../web_modules/domready.js";
import ModeratorApp from './ModeratorApp.js';
import "../scss/index.css.proxy.js";

ready(() => {

    const app = new ModeratorApp({
        target: document.getElementById('app')
    });

});

export default app;