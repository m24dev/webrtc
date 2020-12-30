<style type="text/scss">
    .answer {
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        &__inner {
            width: 500px;
            height: 300px;
            font-size: 100px;
            font-weight: bold;
        }
    }
</style>

<script>
    import { fly } from 'svelte/transition';
    import Peer from 'peerjs';
    import settings from './settings';

    const query = new URLSearchParams(location.search);
    const id = query.get('id');

    let peer;

    let isLoading = false;
    let isPeerReady = false;
    let isRemoteStreamReady = false;
    let isAnswered = false;
    let dataConnection;
    let mediaConnection;
    let remoteStream;
    let answer = '';

    function makeConnection() {
        isLoading = true;

        peer = new Peer(`operator${id}`, settings.callOptions);

        peer.on('open', function(){
            console.log('open');
            isPeerReady = true;
        });
        peer.on('connection', function (conn) {
            console.log('connection');
            if (dataConnection) {
                dataConnection.close();
            }
            dataConnection = conn;

            dataConnection.on('data', handleData);
            dataConnection.on('close', () => {
                
            });
            dataConnection.on('error', err => {
                console.log(err);
            });
        });
        peer.on('call', function(conn) {
            console.log('call');
            if (mediaConnection && mediaConnection.open) {
                mediaConnection.close();
            }
            mediaConnection = conn;
            mediaConnection.on('stream', (stream) => {
                if (remoteStream) return false;
                console.log('stream');
                remoteStream = stream;
                isRemoteStreamReady = true;
            });
            mediaConnection.on('error', (err) => {
                console.error(err);
            });

            mediaConnection.answer();
        });
        peer.on('error', err => {
            console.error(err);
        });
        peer.on('disconnected', function(){
            console.log('disconnected');
        });
    }

    function video(node, remoteStream) {
        play(node);
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

    function handleData(data) {
        answer = data.answer;
        isAnswered = true;

        setTimeout(() => {
            isAnswered = false;
        }, 3000);
    }
</script>

{#if isPeerReady}
    {#if isRemoteStreamReady}
        <div class="video">
            <video muted use:video={remoteStream}></video>
        </div>
        {#if isAnswered}
            <div class="answer" transition:fly={{y: 100, opacity: 0}}>
                <div class="p-4 d-flex justify-content-center">
                    <div class="answer__inner rounded bg-primary d-flex justify-content-center align-items-center">{answer}</div>
                </div>
            </div>
        {/if}
    {:else}
        <div class="popup">
            <p>Ожидание соединения</p>
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