import ready from "domready";
import MultiscreenApp from './MultiscreenApp.svelte';
import "../scss/index.scss";

ready(() => {

    const app = new MultiscreenApp({
        target: document.getElementById('app')
    });

});

export default app;