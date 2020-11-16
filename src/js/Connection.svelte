<style type="text/scss">
    @import "../scss/variables.scss";
    .btn-stop {
        position: absolute;
        left: 10px;
        top: 10px;
        z-index: 100;
    }
    .btn-volume {
        position: absolute;
        right: 10px;
        top: 10px;
        z-index: 100;
    }
    .btn-answer {
        position: absolute;
        left: 50%;
        top: 10px;
        transform: translateX(-50%);
        z-index: 100;
    }
    .connection {
        position: relative;
        height: 600px;
        width: 400px;
        margin: 0 10px 20px;
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
    }
    .chat {
        max-height: 300px;
        overflow-y: auto;
        flex-wrap: wrap;
        line-height: 1;
        &__item {
            width: 100%;
        }
        &__item_alt {
            justify-content: flex-end;
        }
        &__message {
            position: relative;
            max-width: 75%;
            background: #fff;
            border-radius: 5px;
            font-size: 90%;
            color: #000;
            &:after {
                content: '';
                position: absolute;
                right: 0;
                bottom: 0;
                border-bottom: 7px solid #fff;
                border-left: 5px solid transparent;
                border-right: 5px solid transparent;
                transform: translateX(50%);
            }
        }
        &__item_alt &__message {
            background: map-get($colors, 'success');
            &:after {
                right: auto;
                left: 0;
                border-bottom-color: map-get($colors, 'success');
                transform: translateX(-50%);
            }
        }
        &__item_alt &__author {
            text-align: right;
        }
    }
    .popup {
        position: absolute;
        left: 0;
        top: 50px;
        width: 100%;
    }
</style>
<script>
    import { fade } from 'svelte/transition';
    import { onMount, afterUpdate, createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    export let username;
    export let dataConnection;
    export let mediaConnection;
    export let closed;
    export let chat;
    export let inputMessage;

    let video;
    let isAccepted = (username === dataConnection.metadata.username);
    let isVideoHidden = true;
    let isMuted = true;
    let messages = [];
    let newMessage = '';

    mediaConnection.on('stream', (stream) => {
        console.log('stream');
        video.srcObject = stream;
        video.onloadedmetadata = () => {
            video.play();
        };
    });

    onMount(() => {
        if (username === dataConnection.metadata.username) {
            video.srcObject = mediaConnection.localStream;
            video.onloadedmetadata = () => {
                video.play();
            };
        }

        inputMessage.focus();
    });

    afterUpdate(() => {
        chat.scrollTop = chat.scrollHeight;
    });

    function handleSend(e) {
        if (e.type === 'keypress' && e.keyCode != 13) return;

        let data = {
            from: username,
            text: newMessage
        }
        dataConnection.send(data);
        handleMessage(data);
        newMessage = '';
    }

    function handleMessage(data) {
        messages = [...messages, data];
    }

    function handleVideoToggle() {
        if (!isAccepted) {
            mediaConnection.answer();
            isAccepted = true;
        }
        isVideoHidden = !isVideoHidden;
    }

    function handleVolumeToggle() {
        isMuted = !isMuted;
    }

    function handleClose() {
        dataConnection.close();
        mediaConnection.close();
    }

    dataConnection.on('data', handleMessage);
    dataConnection.on('close', () => {
        dispatch('close', {
            peer: dataConnection.peer
        });
    });
    dataConnection.on('error', err => {
        console.log(err);
    });

</script>

<div class="connection bg-dark">
    <div class="connection__video" class:invisible={isVideoHidden} transition:fade>
        <video playsinline autoplay muted={isMuted} bind:this={video}></video>
    </div>
    <button type="button" class="btn btn-icon text-light btn-stop" on:click={handleClose}>
        <svg class="bi" width="32" height="32" fill="currentColor">
            <use xlink:href="dist/images/bootstrap-icons.svg#box-arrow-in-left"/>
        </svg>
    </button>
    <button type="button" class="btn btn-icon btn-answer text-light" transition:fade on:click={handleVideoToggle}>
        {#if isVideoHidden}
            <svg class="bi" width="32" height="32" fill="currentColor">
                <use xlink:href="dist/images/bootstrap-icons.svg#camera-video-off"/>
            </svg>
        {:else}
            <svg class="bi" width="32" height="32" fill="currentColor">
                <use xlink:href="dist/images/bootstrap-icons.svg#camera-video"/>
            </svg>
        {/if}
    </button>
    <button type="button" class="btn btn-icon text-light btn-volume" on:click={handleVolumeToggle}>
        {#if isMuted}
            <svg class="bi" width="32" height="32" fill="currentColor">
                <use xlink:href="dist/images/bootstrap-icons.svg#volume-mute-fill"/>
            </svg>
        {:else}
            <svg class="bi" width="32" height="32" fill="currentColor">
                <use xlink:href="dist/images/bootstrap-icons.svg#volume-up-fill"/>
            </svg>
        {/if}
    </button>
    {#if closed}
        <div class="popup p-4" transition:fade>
            <div class="alert alert-warning text-center">Соединение закрыто</div>
        </div>
    {/if}
    <div class="connection__chat">
        <div class="chat d-flex align-items-end p-4" bind:this={chat}>
            {#each messages as message}
                <div class="chat__item d-flex mb-2" class:chat__item_alt={message.from === username} transition:fade>
                    <div class="chat__message d-inline-block p-2 shadow-sm">
                        <div class="chat__author font-weight-bold">{message.from}</div>
                        <div class="chat__text">{message.text}</div>
                    </div>
                </div>
            {/each}
        </div>
        <div class="p-4">
            <div class="input-group shadow-sm">
                <input type="text" class="form-control" placeholder="Текст сообщения" bind:this={inputMessage} bind:value={newMessage} on:keypress={handleSend}>
                <div class="input-group-append">
                    <button type="button" class="btn btn-primary" on:click={handleSend}>
                        <svg class="bi" width="16" height="16" fill="currentColor">
                            <use xlink:href="dist/images/bootstrap-icons.svg#chat-fill"/>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>