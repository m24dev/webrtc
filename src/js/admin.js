import ready from "domready";
import AdminApp from './AdminApp.svelte';
import "../scss/index.scss";

ready(() => {

    const app = new AdminApp({
        target: document.getElementById('app')
    });

});

export default app;