<script>
    import { onMount } from 'svelte';
    export let connection;

    console.log(connection);

    let isCallStarted = true;
    let isDisconnected = false;
    let video;

    function onCallClose() {
        isCallStarted = false;
        isDisconnected = true;
    }

    onMount(() => {
        setTimeout(() => {
            video.srcObject = connection.remoteStream;
            video.onloadedmetadata = function(e) {
                video.play();
            };
        }, 1500);
    });

    function handleCloseClick() {
        connection.peerConnection.close();
    }

    connection.on('close', function() {
        isCallStarted = false;
        isDisconnected = true;
    });

</script>

<video playsinline autoplay muted bind:this={video}></video>
{#if isCallStarted}
    <div class="form-group">
        Звонок начат...
        <button on:click={handleCloseClick}>Завершить</button>
    </div>
{/if}
{#if isDisconnected}
    <div class="form-group">
        Соединение разорвано.
    </div>
{/if}