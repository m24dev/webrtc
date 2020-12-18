<style type="text/scss">
    .buttons {
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        .btn {
            width: 80px;
            height: 80px;
            font-size: 40px;
        }
        &_answered {
            .btn:not(.btn_selected) {
                opacity: .5;
            }
            :global(.btn_selected) {
                box-shadow: 0 0 0 10px yellow;
            }
        }
    }
</style>

<script>
    import { beforeUpdate, afterUpdate } from 'svelte';
    import { fade, fly } from 'svelte/transition';
    import Peer from 'peerjs';
    import settings from './settings';

    const query = new URLSearchParams(location.search);
    const outID = `operator${query.get('id')}`;

    const peer = new Peer(settings.callOptions);

    let isPeerReady = false;
    let isDisconnected = false;
    let isMediaReady = false;
    let isMediaStarted = false;
    let isAnswered = false;
    let dataConnection;
    let mediaConnection;
    let username;
    let inputName;
    let video;

    beforeUpdate(() => {
        
	});

    afterUpdate(() => {
        if (isPeerReady && !isMediaReady) {
            inputName.focus();
        }

        if (isMediaReady && !isMediaStarted) {
            video.srcObject = mediaConnection.localStream;
            video.onloadedmetadata = () => {
                video.play();
                isMediaStarted = true;
            };
        }
	});

    function makeConnection(e) {
        if (e.type === 'keypress' && e.keyCode != 13) return;

        navigator.mediaDevices.getUserMedia({ audio: true, video: true })
            .then(function(mediaStream) {
                dataConnection = peer.connect(outID, {
                    metadata: {
                        username: username
                    }
                });
                dataConnection.on('data', handleData);
                dataConnection.on('close', () => {
                    
                });
                dataConnection.on('error', err => {
                    console.log(err);
                });

                mediaConnection = peer.call(outID, mediaStream);
                mediaConnection.on('error', (err) => {
                    console.error(err);
                });

                isMediaReady = true;
            })
            .catch(function (err) {
                console.log(err.name + ": " + err.message);
            });
    }

    function handleAnswer(e) {
        const selectedClass = 'btn_selected';
        const $el = e.target;
        if ($el.classList.contains('btn')) {
            $el.classList.add(selectedClass);
            let data = {
                answer: $el.dataset.answer
            }
            dataConnection.send(data);
    
            isAnswered = true;
    
            setTimeout(() => {
                $el.classList.remove(selectedClass);
                isAnswered = false;
            }, 3000);
        }
    }

    function handleData(data) {
        console.log(data);
    }

    peer.on('open', function(){
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
    {#if isMediaReady}
        <div class="video" transition:fade>
            <video bind:this={video}></video>
        </div>
        <div class="buttons" class:buttons_answered={isAnswered} on:click={handleAnswer}>
            <div class="p-4 d-flex justify-content-around">
                <button type="button" class="btn btn-primary" diabled={isAnswered} data-answer="А" in:fly="{{y: 100, opacity: 0}}">A</button>
                <button type="button" class="btn btn-primary" diabled={isAnswered} data-answer="Б" in:fly="{{y: 100, opacity: 0, delay: 100}}">Б</button>
                <button type="button" class="btn btn-primary" diabled={isAnswered} data-answer="В" in:fly="{{y: 100, opacity: 0, delay: 200}}">В</button>
                <button type="button" class="btn btn-primary" diabled={isAnswered} data-answer="Г" in:fly="{{y: 100, opacity: 0, delay: 300}}">Г</button>
            </div>
        </div>
        {#if isDisconnected}
            <div class="popup p-4" transition:fade>
                <div class="alert alert-warning text-center">Соединение закрыто</div>
            </div>
        {/if}
    {:else}
        <div class="popup" transition:fade>
            <div class="input-group">
                <input type="text" class="form-control" placeholder="Ваше имя" aria-label="Ваше имя" bind:this={inputName} bind:value={username} on:keypress={makeConnection}>
                <div class="input-group-append">
                    <button type="button" class="btn btn-primary shadow-sm" on:click={makeConnection}>Начать</button>
                </div>
            </div>
        </div>
    {/if}
{:else}
    <div class="loader">
        <div class="spinner-border text-primary">
            <span class="sr-only">Loading...</span>
        </div>
    </div>
{/if}