<style type="text/scss">
    .buttons {
        position: absolute;
        left: 0;
        bottom: 40px;
        width: 100%;
        .btn {
            width: 70px;
            height: 70px;
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
    import { afterUpdate } from 'svelte';
    import { fade, fly } from 'svelte/transition';
    import Peer from 'peerjs';
    import settings from './settings';

    const query = new URLSearchParams(location.search);
    const adminID = 'admin';
    const multiscreenID = 'multiscreen';
    const operatorID = `operator${query.get('id')}`;

    let peer;

    let isStarted = false;
    let isPeerReady = false;
    let isDisconnected = false;
    let isMediaReady = false;
    let isMediaStarted = false;
    let isAnswered = false;
    let adminDataConnection;
    let adminMediaConnection;
    let operatorDataConnection;
    let operatorMediaConnection;
    let multiscreenMediaConnection;
    let video;
    let stream;

    afterUpdate(() => {
        if (isMediaReady && !isMediaStarted) {
            video.srcObject = stream;
            video.onloadedmetadata = () => {
                video.play();
                isMediaStarted = true;
            };
        }
	});

    function makeConnection() {
        isStarted = true;

        peer = new Peer(settings.callOptions);

        peer.on('open', function(){
            console.log('open');
            isPeerReady = true;

            getMedia();
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
    }

    function getMedia() {
        navigator.mediaDevices.getUserMedia({ audio: true, video: {
            width: { max: 720 },
            height: { max: 576 },
            frameRate: { ideal: 10 }
        }})
            .then(function(mediaStream) {
                stream = mediaStream;

                // adminDataConnection = peer.connect(adminID);
                // setDataConnectionCallbacks(adminDataConnection);

                // adminMediaConnection = peer.call(adminID, stream);
                // setMediaConnectionCallbacks(adminMediaConnection);

                connectToOperator();
                connectToMultiscreen();

                isMediaReady = true;
            })
            .catch(function (err) {
                console.log(err.name + ": " + err.message);
            });
    }

    function setDataConnectionCallbacks(conn) {
        conn.on('data', handleData);
        conn.on('close', () => {
            
        });
        conn.on('error', err => {
            console.log(err);
        });
    }

    function setMediaConnectionCallbacks(conn) {
        conn.on('error', err => {
            console.log(err);
        });
    }

    function connectToOperator() {
        operatorDataConnection = peer.connect(operatorID);
        setDataConnectionCallbacks(operatorDataConnection);

        operatorMediaConnection = peer.call(operatorID, stream);
        setMediaConnectionCallbacks(operatorMediaConnection);
    }

    function connectToMultiscreen() {
        multiscreenMediaConnection = peer.call(multiscreenID, stream);
        setMediaConnectionCallbacks(multiscreenMediaConnection);
    }

    function handleAnswer(e) {
        const selectedClass = 'btn_selected';
        const $el = e.target;
        if ($el.classList.contains('btn') && !isAnswered) {
            $el.classList.add(selectedClass);
            let data = {
                answer: $el.dataset.answer
            }
            operatorDataConnection.send(data);
    
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
</script>

{#if isPeerReady}
    <div class="video" transition:fade>
        <video muted bind:this={video}></video>
    </div>
    {#if isMediaReady}
        <div class="buttons" class:buttons_answered={isAnswered} on:click={handleAnswer}>
            <div class="p-4 d-flex justify-content-around">
                <button type="button" class="btn btn-primary" data-answer="А" in:fly="{{y: 100, opacity: 0}}">A</button>
                <button type="button" class="btn btn-primary" data-answer="Б" in:fly="{{y: 100, opacity: 0, delay: 100}}">Б</button>
                <button type="button" class="btn btn-primary" data-answer="В" in:fly="{{y: 100, opacity: 0, delay: 200}}">В</button>
                <button type="button" class="btn btn-primary" data-answer="Г" in:fly="{{y: 100, opacity: 0, delay: 300}}">Г</button>
            </div>
        </div>
    {/if}
    {#if isDisconnected}
        <div class="popup p-4" transition:fade>
            <div class="alert alert-warning text-center">Соединение закрыто</div>
        </div>
    {/if}
{:else}
    {#if isStarted}
        <div class="loader">
            <div class="spinner-border text-primary">
                <span class="sr-only">Загрузка...</span>
            </div>
        </div>
    {:else}
        <div class="popup">
            <button type="button" class="btn btn-lg btn-primary shadow-sm" on:click={makeConnection}>Начать</button>
        </div>
    {/if}
{/if}