import ready from "../../web_modules/domready.js";
import Caller from './Caller.js';
import "../scss/index.css.proxy.js";

ready(() => {

    const app = new Caller({
        target: document.getElementById('app')
    });

});

export default app;