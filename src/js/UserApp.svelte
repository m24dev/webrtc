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
    .input-start {
        position: absolute;
        left: 50%;
        top: 50%;
        width: 300px;
        transform: translate(-50%, -50%);
        z-index: 100;
    }
    .loader {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }
</style>

<script>
    import { afterUpdate } from 'svelte';
    import { fade } from 'svelte/transition';
    import Peer from 'peerjs';
    import Connection from './Connection.svelte';
    import settings from './settings';

    afterUpdate(() => {
        if (isPeerReady && !isDataConnectionStarted) {
            inputName.focus();
        }
	});

    const peer = new Peer(settings.callOptions);

    let inputName;
    let isPeerReady = false;
    let isClosed = false;
    let username;
    let isDataConnectionStarted = false;
    let isMediaConnectionStarted = false;
    let dataConnection;
    let mediaConnection;

    function makeConnection(e) {
        if (e.type === 'keypress' && e.keyCode != 13) return;

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
        isClosed = true;
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
            <div class="input-start input-group" transition:fade>
                <input type="text" class="form-control" placeholder="Ваше имя" aria-label="Ваше имя" bind:this={inputName} bind:value={username} on:keypress={makeConnection}>
                <div class="input-group-append">
                    <button type="button" class="btn btn-primary shadow-sm" on:click={makeConnection}>Начать</button>
                </div>
            </div>
        {:else}
            <Connection username={username} dataConnection={dataConnection} mediaConnection={mediaConnection} closed={isClosed} on:close={onConneсtionClose} />
        {/if}
    {:else}
        <div class="loader">
            <div class="spinner-border text-primary">
                <span class="sr-only">Loading...</span>
            </div>
        </div>
    {/if}
</div>