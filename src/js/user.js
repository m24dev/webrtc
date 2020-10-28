import ready from "domready";
import Caller from './Caller.svelte';
import "../scss/index.scss";

ready(() => {

    const app = new Caller({
        target: document.getElementById('app')
    });

});

export default app;