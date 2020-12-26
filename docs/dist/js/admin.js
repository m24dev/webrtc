import ready from "../../web_modules/domready.js";
import AdminApp from './AdminApp.js';
import "../scss/index.css.proxy.js";

ready(() => {

    const app = new AdminApp({
        target: document.getElementById('app')
    });

});

export default app;