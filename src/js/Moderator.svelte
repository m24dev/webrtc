<style type="text/scss">
    .connections {
        display: flex;
        justify-content: center;
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

    function onConneсtionClose() {
        
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
        mediaConnection.answer();
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

{#if isPeerReady}
    <div class="connections">
        {#each connections as connection}
            {#if connection.dataConnection && connection.mediaConnection}
                <Connection username={username} dataConnection={connection.dataConnection} mediaConnection={connection.mediaConnection} on:close={onConneсtionClose} />
            {/if}
        {/each}
    </div>
{/if}