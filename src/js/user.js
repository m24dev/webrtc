import ready from "domready";
import UserApp from './UserApp.svelte';
import "../scss/index.scss";

ready(() => {

    const app = new UserApp({
        target: document.getElementById('app')
    });

});

export default app;