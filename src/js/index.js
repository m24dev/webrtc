import ready from "domready";
import ModeratorApp from './ModeratorApp.svelte';
import "../scss/index.scss";

ready(() => {

    const app = new ModeratorApp({
        target: document.getElementById('app')
    });

});

export default app;