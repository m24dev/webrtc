import ready from "domready";
import OperatorApp from './OperatorApp.svelte';
import "../scss/index.scss";

ready(() => {

    const app = new OperatorApp({
        target: document.getElementById('app')
    });

});

export default app;