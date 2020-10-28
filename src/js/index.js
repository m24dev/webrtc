import ready from "domready";
import Moderator from './Moderator.svelte';
import "../scss/index.scss";

ready(() => {

    const app = new Moderator({
        target: document.getElementById('app')
    });

});

export default app;