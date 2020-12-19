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
    import { afterUpdate } from 'svelte';
    import { fly } from 'svelte/transition';
    import Peer from 'peerjs';
    import settings from './settings';

    const query = new URLSearchParams(location.search);
    const id = query.get('id');

    let peer;

    let isStarted = false;
    let isPeerReady = false;
    let isDisconnected = false;
    let isMediaReady = false;
    let isMediaStarted = false;
    let isAnswered = false;
    let dataConnection;
    let mediaConnection;
    let remotePeer;
    let video;
    let remoteStream;
    let answer = '';

    afterUpdate(() => {
        if (isMediaReady && !isMediaStarted) {
            video.srcObject = remoteStream;
            video.onloadedmetadata = () => {
                video.play();
                isMediaStarted = true;
            };
        }
    });
    
    function makeConnection() {
        isStarted = true;

        peer = new Peer(`operator${id}`, settings.callOptions);

        peer.on('open', function(){
            console.log('open');
            isPeerReady = true;
        });
        peer.on('connection', function (conn) {
            console.log('connection');
            dataConnection = conn;
            remotePeer = conn.peer;

            dataConnection.on('data', handleData);
            dataConnection.on('close', () => {
                
            });
            dataConnection.on('error', err => {
                console.log(err);
            });
        });
        peer.on('call', function(conn) {
            console.log('call');
            if (remotePeer === conn.peer) {
                mediaConnection = conn;
                mediaConnection.on('stream', (stream) => {
                    if (remoteStream) return false;
                    console.log('stream');
                    remoteStream = stream;
                    isMediaReady = true;
                });
                mediaConnection.on('error', (err) => {
                    console.error(err);
                });

                mediaConnection.answer();
            }
        });
        peer.on('error', err => {
            console.error(err);
        });
        peer.on('disconnected', function(){
            console.log('disconnected');
        });
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
    {#if isMediaReady}
        <div class="video">
            <video bind:this={video}></video>
        </div>
        {#if isAnswered}
            <div class="answer" transition:fly={{y: 100, opacity: 0}}>
                <div class="p-4 d-flex justify-content-center">
                    <div class="answer__inner rounded bg-primary d-flex justify-content-center align-items-center">{answer}</div>
                </div>
            </div>
        {/if}
        {#if isDisconnected}
            <div class="popup p-4">
                <div class="alert alert-warning text-center">Соединение закрыто</div>
            </div>
        {/if}
    {:else}
        <div class="popup">
            <p>Ожидание соединения</p>
        </div>
    {/if}
{:else}
    {#if isStarted}
        <div class="loader">
            <div class="spinner-border text-primary">
                <span class="sr-only">Loading...</span>
            </div>
        </div>
    {:else}
        <div class="popup">
            <button type="button" class="btn btn-lg btn-primary shadow-sm" on:click={makeConnection}>Начать</button>
        </div>
    {/if}
{/if}