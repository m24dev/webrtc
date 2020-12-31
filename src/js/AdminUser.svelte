<style type="text/scss">
    .user {
        overflow: hidden;
        &__video {
            position: relative;
            height: 150px;
            video {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
            .btn-answer {
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
            }
        }
    }
</style>
<script>
    import { createEventDispatcher } from 'svelte';
    import { fly } from 'svelte/transition';

    export let user;
    export let questions;
    export let currentQuestion;

    const dispatch = createEventDispatcher();

    let isMediaConnectionClosed = false;
    let remoteStream;
    let points = 0;

    function toggleMedia() {
        if (remoteStream) {
            user.mediaConnection.close();
            isMediaConnectionClosed = true;
            remoteStream = null;
        } else {
            user.mediaConnection.on('stream', (stream) => {
                if (remoteStream) return false;
                console.log('stream');
                remoteStream = stream;
            });
            user.mediaConnection.on('error', (err) => {
                console.error(err);
            });
    
            user.mediaConnection.answer();
        }
    }

    function video(node, remoteStream) {
        return {
            update(remoteStream) {
                play(node);
            }
        }
    }

    function play(el) {
        el.srcObject = remoteStream;
        el.onloadedmetadata = () => {
            el.play();
        };
    }

    function connectToScreen(n) {
        dispatch('setUserConnect',
        {
            peer: user.peer,
			targetID: n
		});
    }

    function handleData(data) {
        if (data.action === 'answer') {
            if (data.answer == questions[currentQuestion].answer) {
                points++;
            }
        }
    }

    user.dataConnection.on('data', handleData);
</script>

<div class="user card bg-light shadow-sm mb-3" in:fly="{{ y: 30, duration: 300 }}">
    <div class="row no-gutters">
        {#if user.mediaConnection}
            <div class="col-md-2">
                <div class="user__video bg-dark text-light">
                    <video muted use:video={remoteStream}></video>
                    {#if !isMediaConnectionClosed}
                        <button type="button" class="btn btn-icon btn-answer" on:click={toggleMedia}>
                            {#if user.mediaConnection.open}
                                <svg class="bi text-danger" width="32" height="32" fill="currentColor">
                                    <use xlink:href="/dist/images/bootstrap-icons.svg#camera-video-off"/>
                                </svg>
                            {:else}
                                <svg class="bi text-success" width="32" height="32" fill="currentColor">
                                    <use xlink:href="/dist/images/bootstrap-icons.svg#camera-video"/>
                                </svg>
                            {/if}
                        </button>
                    {/if}
                </div>
            </div>
        {/if}
        <div class={user.mediaConnection ? 'col-md-8' : 'col-md-10'}>
            <div class="card-body">
                <h5 class="card-title">{user.dataConnection.metadata.name}</h5>
                {#if user.mediaConnection}
                    <div class="btn-toolbar" role="toolbar">
                        <div class="btn-group mr-2">
                            <button type="button" class="btn btn-secondary" on:click={() => connectToScreen(1)}>1</button>
                            <button type="button" class="btn btn-secondary" on:click={() => connectToScreen(2)}>2</button>
                            <button type="button" class="btn btn-secondary" on:click={() => connectToScreen(3)}>3</button>
                            <button type="button" class="btn btn-secondary" on:click={() => connectToScreen(4)}>4</button>
                            <button type="button" class="btn btn-secondary" on:click={() => connectToScreen(5)}>5</button>
                            <button type="button" class="btn btn-secondary" on:click={() => connectToScreen(6)}>6</button>
                        </div>
                        <div class="btn-group btn-group-toggle" data-toggle="buttons">
                            <button type="button" class="btn btn-secondary" on:click={() => connectToScreen(7)}>Мультиэкран</button>
                        </div>
                    </div>
                {/if}
            </div>
        </div>
        <div class='col-md-2'>
            <div class="card-body">
                <h5 class="card-title">Ответы</h5>
                <p class="card-text">{points}</p>
            </div>
        </div>
    </div>
</div>