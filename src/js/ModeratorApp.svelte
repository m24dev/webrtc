<style type="text/scss">
    .moderator {
        min-height: 100vh;
    }
    .connections {
        display: flex;
        justify-content: center;
    }
    .loader {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }
</style>
<script>
    import Peer from 'peerjs';
    import Connection from './Connection.svelte';
    import settings from './settings';

    const peer = new Peer(settings.moderatorId, settings.callOptions);

    let isPeerReady = false;
    let connections = [];
    let username = 'Босс';

    function onConneсtionClose(event) {
        connections = connections.map(connection => {
            if (connection.peer === event.detail.peer) {
                return {...connection, isClosed: true};
            }
            return connection;
        });
    }

    peer.on('connection', function (connection) {
        console.log('connection');
        connections = [...connections, {
            dataConnection: connection,
            peer: connection.peer
        }];
    });

    peer.on('call', function(mediaConnection) {
        console.log('call');
        connections = connections.map(connection => {
            if (connection.peer === mediaConnection.peer) {
                return {...connection, mediaConnection: mediaConnection};
            }
            return connection;
        });
    });

    peer.on('open', function(id){
        console.log('open');
        isPeerReady = true;
    });
    peer.on('error', function(err){
        console.error(err);
    });
</script>

<div class="moderator">
    {#if isPeerReady}
        {#if connections.length}
            <div class="connections">
                {#each connections as connection}
                    {#if connection.dataConnection && connection.mediaConnection}
                        <Connection username={username} dataConnection={connection.dataConnection} mediaConnection={connection.mediaConnection} closed={connection.isClosed} on:close={onConneсtionClose} />
                    {/if}
                {/each}
            </div>
        {:else}
            <div class="p-5 text-center">
                <p>Ожидание соединений</p>
            </div>
        {/if}
    {:else}
        <div class="loader">
            <div class="spinner-border text-primary">
                <span class="sr-only">Loading...</span>
            </div>
        </div>
    {/if}
</div>