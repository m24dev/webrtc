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
    import { fade, fly } from 'svelte/transition';
    import Peer from 'peerjs';
    import settings from './settings';

    const query = new URLSearchParams(location.search);
    const adminID = 'admin';
    const multiscreenID = 'multiscreen';

    let peer;

    let isLoading = false;
    let isPeerReady = false;
    let isDisconnected = false;
    let isLocalStreamReady = false;
    let isAnswered = false;
    let isQuestionActive = false;
    let adminDataConnection;
    let adminMediaConnection;
    let operatorDataConnection;
    let operatorMediaConnection;
    let multiscreenMediaConnection;
    let localStream;

    function makeConnection() {
        isLoading = true;

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
            height: { max: 576 }
        }})
            .then(function(mediaStream) {
                localStream = mediaStream;

                adminDataConnection = peer.connect(adminID, {
                    metadata: {
                        name: `Пользователь ${query.get('id')}`
                    }
                });
                setDataConnectionCallbacks(adminDataConnection);

                adminMediaConnection = peer.call(adminID, localStream);
                setMediaConnectionCallbacks(adminMediaConnection);

                isLocalStreamReady = true;
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

    function connectToOperator(operatorID) {
        if (operatorDataConnection) {
            operatorDataConnection.close();
        }
        operatorDataConnection = peer.connect(operatorID, );
        setDataConnectionCallbacks(operatorDataConnection);

        if (operatorMediaConnection) {
            operatorMediaConnection.close();
        }
        operatorMediaConnection = peer.call(operatorID, localStream);
        setMediaConnectionCallbacks(operatorMediaConnection);
    }

    function connectToMultiscreen() {
        multiscreenMediaConnection = peer.call(multiscreenID, localStream);
        setMediaConnectionCallbacks(multiscreenMediaConnection);
    }

    function handleAnswer(e) {
        const selectedClass = 'btn_selected';
        const $el = e.target;
        if ($el.classList.contains('btn') && !isAnswered) {
            $el.classList.add(selectedClass);
            let data = {
                action: 'answer',
                answer: $el.dataset.answer
            }
            adminDataConnection.send(data);

            if (operatorDataConnection) {
                operatorDataConnection.send(data);
            }
    
            isAnswered = true;
        }
    }

    function handleData(data) {
        if (data.action === 'call') {
            if (data.targetID == 7) {
                connectToMultiscreen();
            } else {
                connectToOperator(`operator${data.targetID}`);
            }
        } else if (data.action === 'startQuestion') {
            isQuestionActive = true;
        } else if (data.action === 'endQuestion') {
            isQuestionActive = false;
        }
    }

    function video(node, localStream) {
        play(node);
        return {
            update(localStream) {
                play(node);
            }
        }
    }

    function play(el) {
        el.srcObject = localStream;
        el.onloadedmetadata = () => {
            el.play();
        };
    }

    function answerButtons(node) {
        return {
            destroy() {
                const selectedClass = 'btn_selected';
                let $selected = node.querySelector(`.${selectedClass}`);
                if ($selected) {
                    $selected.classList.remove(selectedClass);
                }

                isAnswered = false;
            }
        }
    }
</script>

{#if isPeerReady}
    {#if isLocalStreamReady}
        <div class="video">
            <video muted use:video={localStream}></video>
        </div>
        {#if isQuestionActive}
            <div class="buttons" class:buttons_answered={isAnswered} on:click={handleAnswer} use:answerButtons>
                <div class="p-4 d-flex justify-content-around">
                    <button type="button" class="btn btn-primary" data-answer="1" transition:fly="{{y: 100, opacity: 0}}">A</button>
                    <button type="button" class="btn btn-primary" data-answer="2" transition:fly="{{y: 100, opacity: 0, delay: 100}}">Б</button>
                    <button type="button" class="btn btn-primary" data-answer="3" transition:fly="{{y: 100, opacity: 0, delay: 200}}">В</button>
                    <button type="button" class="btn btn-primary" data-answer="4" transition:fly="{{y: 100, opacity: 0, delay: 300}}">Г</button>
                </div>
            </div>
        {/if}
    {/if}
    {#if isDisconnected}
        <div class="popup p-4" transition:fade>
            <div class="alert alert-warning text-center">Соединение закрыто</div>
        </div>
    {/if}
{:else}
    <div class="popup">
        <button type="button" class="btn btn-primary shadow-sm" disabled={isLoading} on:click={makeConnection}>
            {#if isLoading}
                <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            {/if}
            Начать
        </button>
    </div>
{/if}