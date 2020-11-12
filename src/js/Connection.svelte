<style type="text/scss">
    .connection {
        position: relative;
        height: 500px;
        width: 300px;
        margin: 0 10px 20px;
        .btn-stop {
            position: absolute;
            left: 20px;
            top: 20px;
            z-index: 100;
        }
        .btn-volume {
            position: absolute;
            right: 20px;
            top: 20px;
            z-index: 100;
        }
        &__video {
            position: absolute;
            left: 0;
            top: 0;
            overflow: hidden;
            width: 100%;
            height: 100%;
            video {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }
        &__chat {
            position: absolute;
            left: 0;
            bottom: 0;
            width: 100%;
            background: linear-gradient(transparent, #000);
        }
        .chat {
            height: 300px;
            overflow-y: auto;
            &__item {
                margin: 0 0 10px;
            }
            &__message {
                max-width: 75%;
                background: #fff;
                border-radius: 5px;
                color: #000;
            }
            &__author {
                font-weight: bold;
            }
        }
    }
</style>
<script>
    import { onMount, createEventDispatcher } from 'svelte';
    import settings from './settings';

    const dispatch = createEventDispatcher();

    export let username;
    export let dataConnection;
    export let mediaConnection;

    let video;
    let isMuted = true;
    let messages = [];
    let newMessage = '';

    onMount(() => {
        setTimeout(() => {
            video.srcObject = mediaConnection.remoteStream || mediaConnection.localStream;
            video.onloadedmetadata = function() {
                video.play();
            };
        }, 1500);
    });

    function handleSend() {
        console.log(dataConnection);
        let data = {
            from: username,
            text: newMessage
        }
        newMessage = '';
        dataConnection.send(data);
        handleMessage(data);
    }

    function handleMessage(data) {
        console.log(dataConnection);
        messages = [...messages, data];
    }

    function handleVolumeToggle() {
        isMuted = !isMuted;
    }

    function handleClose() {
        dataConnection.close();
    }

    dataConnection.on('data', handleMessage);
    dataConnection.on('close', () => {
        dispatch('close');
    });
    dataConnection.on('error', err => {
        console.log(err);
    });

</script>

<div class="connection bg-dark">
    <div class="connection__video">
        <video playsinline autoplay muted={isMuted} bind:this={video}></video>
    </div>
    <button type="button" class="btn btn-icon text-light btn-stop" on:click={handleClose}>
        <svg class="bi" width="32" height="32" fill="currentColor">
            <use xlink:href="/_dist_/images/bootstrap-icons.svg#box-arrow-in-left"/>
        </svg>
    </button>
    <button type="button" class="btn btn-icon text-light btn-volume" on:click={handleVolumeToggle}>
        {#if isMuted}
            <svg class="bi" width="32" height="32" fill="currentColor">
                <use xlink:href="/_dist_/images/bootstrap-icons.svg#volume-mute-fill"/>
            </svg>
        {:else}
            <svg class="bi" width="32" height="32" fill="currentColor">
                <use xlink:href="/_dist_/images/bootstrap-icons.svg#volume-up-fill"/>
            </svg>
        {/if}
    </button>
    <div class="connection__chat p-4">
        <div class="chat">
            {#each messages as message}
                <div class="chat__item d-flex" class:justify-content-end={message.from === username}>
                    <div class="chat__message d-inline-block py-1 px-2 shadow-sm" class:bg-success={message.from === username}>
                        <div class="chat__author">{message.from}</div>
                        <div class="chat__text">{message.text}</div>
                    </div>
                </div>
            {/each}
        </div>
        <div class="input-group shadow-sm">
            <input type="text" class="form-control" placeholder="Текст сообщения" bind:value={newMessage}>
            <div class="input-group-append">
                <button type="button" class="btn btn-primary" on:click={handleSend}>
                    <svg class="bi" width="16" height="16" fill="currentColor">
                        <use xlink:href="/_dist_/images/bootstrap-icons.svg#chat-fill"/>
                    </svg>
                </button>
            </div>
        </div>
    </div>
</div>