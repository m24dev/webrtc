<script>
    import { onMount } from 'svelte';
    export let connection;

    let isCallStarted = false;
    let isDisconnected = false;
    let video;

    function onCallClose() {
        isCallStarted = false;
        isDisconnected = true;
    }

    onMount(() => {
        console.log(connection);
        video.srcObject = connection.remoteStream;
        video.onloadedmetadata = function () {
            video.play();
        };
    });
</script>

<video playsinline autoplay muted bind:this={video}></video>
{#if isCallStarted}
    <div class="form-group">
        Звонок начат...
        <button on:click={connection.peer.disconnect()}>Завершить</button>
    </div>
{/if}
{#if isDisconnected}
    <div class="form-group">
        Соединение разорвано.
    </div>
{/if}