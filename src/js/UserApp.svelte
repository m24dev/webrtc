<style type="text/scss">
    .input-start {
        position: absolute;
        left: 50%;
        top: 50%;
        width: 300px;
        transform: translate(-50%, -50%);
        z-index: 100;
    }
</style>

<script>
    import { afterUpdate } from 'svelte';
    import { fade } from 'svelte/transition';
    import Peer from 'peerjs';
    import Connection from './Connection.svelte';
    import settings from './settings';

    const query = new URLSearchParams(location.search);
    const outID = `operator${query.get('id')}`;

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

    // Older browsers might not implement mediaDevices at all, so we set an empty object first
    if (navigator.mediaDevices === undefined) {
        navigator.mediaDevices = {};
    }

    // Some browsers partially implement mediaDevices. We can't just assign an object
    // with getUserMedia as it would overwrite existing properties.
    // Here, we will just add the getUserMedia property if it's missing.
    if (navigator.mediaDevices.getUserMedia === undefined) {
        navigator.mediaDevices.getUserMedia = function(constraints) {

            // First get ahold of the legacy getUserMedia, if present
            var getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

            // Some browsers just don't implement it - return a rejected promise with an error
            // to keep a consistent interface
            if (!getUserMedia) {
            return Promise.reject(new Error('getUserMedia is not implemented in this browser'));
            }

            // Otherwise, wrap the call to the old navigator.getUserMedia with a Promise
            return new Promise(function(resolve, reject) {
            getUserMedia.call(navigator, constraints, resolve, reject);
            });
        }
    }

    function makeConnection(e) {
        if (e.type === 'keypress' && e.keyCode != 13) return;

        navigator.mediaDevices.getUserMedia({ audio: true, video: true })
            .then(function(mediaStream) {
                dataConnection = peer.connect(outID, {
                    metadata: {
                        username: username
                    }
                });
                if (dataConnection) {
                    isDataConnectionStarted = true;
                }
                
                mediaConnection = peer.call(outID, mediaStream);
                if (mediaConnection) {
                    isMediaConnectionStarted = true;
                }
            })
            .catch(function (err) {
                alert.log(err.name + ": " + err.message);
            });
    }

    function onConneсtionClose() {
        isClosed = true;
    }

    peer.on('open', function(id){
        console.log('open');
        isPeerReady = true;
    });
    peer.on('error', function(err){
        console.error(err);
    });
    peer.on('close', function(){
        console.log('close');
    });
    peer.on('disconnected', function(){
        console.log('disconnected');
    });
</script>

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