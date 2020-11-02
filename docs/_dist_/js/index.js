import ready from "../../web_modules/domready.js";
import Moderator from './Moderator.js';
import "../scss/index.css.proxy.js";

ready(() => {

    const app = new Moderator({
        target: document.getElementById('app')
    });

});

export default app;