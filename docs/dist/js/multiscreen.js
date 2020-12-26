import ready from "../../web_modules/domready.js";
import MultiscreenApp from './MultiscreenApp.js';
import "../scss/index.css.proxy.js";

ready(() => {

    const app = new MultiscreenApp({
        target: document.getElementById('app')
    });

});

export default app;