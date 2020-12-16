import ready from "../../web_modules/domready.js";
import OperatorApp from './OperatorApp.js';
import "../scss/index.css.proxy.js";

ready(() => {

    const app = new OperatorApp({
        target: document.getElementById('app')
    });

});

export default app;