import ready from "../../web_modules/domready.js";
import UserApp from './UserApp.js';
import "../scss/index.css.proxy.js";

ready(() => {

    const app = new UserApp({
        target: document.getElementById('app')
    });

});

export default app;