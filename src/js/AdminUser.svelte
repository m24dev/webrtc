<style type="text/scss">
    .user {
        &__video {
            height: 150px;
            video {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }
    }
</style>
<script>
    import { createEventDispatcher } from 'svelte';

    export let user;

    const dispatch = createEventDispatcher();

    let remoteStream;
    let points = 0;

    function acceptMedia() {
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
            
        }
    }

    user.dataConnection.on('data', handleData);
</script>

<div class="user card mb-3">
    <div class="row no-gutters">
        {#if user.mediaConnection}
            <div class="col-md-2">
                <div class="user__video">
                    <video muted use:video={remoteStream}></video>
                </div>
            </div>
        {/if}
        <div class={user.mediaConnection ? 'col-md-8' : 'col-md-10'}>
            <div class="card-body">
                <h5 class="card-title">{user.dataConnection.metadata.name}</h5>
                {#if user.mediaConnection}
                    <div class="mb-3">
                        <button type="button" class="btn btn-secondary" on:click={acceptMedia}>Показать видео</button>
                    </div>
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