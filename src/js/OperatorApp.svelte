<style type="text/scss">
    .message {
        position: absolute;
        left: 0;
        top: 50%;
        width: 100%;
        transform: translateY(-50%);
        text-align: center;
    }
</style>
<script>
    import Peer from 'peerjs';
    import Connection from './Connection.svelte';
    import settings from './settings';

    const query = new URLSearchParams(location.search);
    const id = query.get('id');

    const peer = new Peer(`operator${id}`, settings.callOptions);

    let isPeerReady = false;
    let curConnection = {};
    let username = `Оператор`;

    function onConneсtionClose(event) {
        if (curConnection.peer === event.detail.peer) {
            curConnection = {...curConnection, isClosed: true};
        }
    }

    peer.on('connection', function (dataConnection) {
        console.log('connection');
        curConnection = {...curConnection, 
            dataConnection: dataConnection,
            peer: dataConnection.peer
        };
    });

    peer.on('call', function(mediaConnection) {
        console.log('call');
        if (curConnection.peer === mediaConnection.peer) {
            curConnection = {...curConnection, mediaConnection: mediaConnection};
        }
    });

    peer.on('open', function(id){
        console.log('open');
        isPeerReady = true;
    });
    peer.on('error', function(err){
        console.error(err);
    });
</script>

{#if isPeerReady}
    {#if curConnection.dataConnection && curConnection.mediaConnection}
        <Connection username={username} dataConnection={curConnection.dataConnection} mediaConnection={curConnection.mediaConnection} closed={curConnection.isClosed} on:close={onConneсtionClose} />
    {:else}
        <div class="message">
            <p>Ожидание соединения</p>
        </div>
    {/if}
{:else}
    <div class="loader">
        <div class="spinner-border text-primary">
            <span class="sr-only">Loading...</span>
        </div>
    </div>
{/if}