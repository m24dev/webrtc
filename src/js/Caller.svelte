<style type="text/scss">
    .user :global(.connection) {
        width: 100% !important;
        height: 100% !important;
        margin: 0 !important;
    }
    .user {
        position: fixed;
        left: 0; 
        top: 0;
        width: 100%;
        height: 100%;
    }
    .btn-start {
        position: absolute;
        left: 50%;
        top: 50%;
        width: 100px;
        height: 100px;
        border-radius: 50%;
        transform: translate(-50%, -50%);
        z-index: 100;
    }
</style>

<script>
    import { fade } from 'svelte/transition';
    import Peer from 'peerjs';
    import Connection from './Connection.svelte';
    import settings from './settings';

    const peer = new Peer(settings.callOptions);

    let isPeerReady = false;
    let isDataConnectionStarted = false;
    let isMediaConnectionStarted = false;
    let dataConnection;
    let mediaConnection;
    let username = 'Вася';
    
    function makeConnection() {
        dataConnection = peer.connect(settings.moderatorId, {
            metadata: {
                username: username
            }
        });

        isDataConnectionStarted = true;

        navigator.mediaDevices.getUserMedia({ audio: true, video: true })
            .then(function(mediaStream) {
                mediaConnection = peer.call(settings.moderatorId, mediaStream);
                isMediaConnectionStarted = true;
            })
            .catch(function (err) {
                alert.log(err.name + ": " + err.message);
            });
    }

    function onConneсtionClose() {
        isDataConnectionStarted = false;
        isMediaConnectionStarted = false;
    }

    peer.on('open', function(id){
        isPeerReady = true;
    });
    peer.on('error', function(err){
        console.error(err);
    });
</script>

<div class="user bg-dark">
    {#if isPeerReady}
        {#if !(isDataConnectionStarted && isMediaConnectionStarted)}
            <button type="button" class="btn btn-primary btn-start shadow-sm" transition:fade on:click={makeConnection}>Начать</button>
        {:else}
            <Connection username={username} dataConnection={dataConnection} mediaConnection={mediaConnection} on:close={onConneсtionClose} />
        {/if}
    {/if}
</div>