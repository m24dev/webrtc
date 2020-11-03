<script>
    import Peer from 'peerjs';
    import Stream from './Stream.svelte';

    const id = 'm24webrtc';
    const callOptions = {
        host: "https://e99d0d498e2b.ngrok.io",
        port: 9000,
        path: '/myapp',
        debug: 3,
        config: {
            iceServers: [
                {
                    url: 'stun:194.67.116.195:3479',		
                    username: "test",
                    credential: "test"
                },
                {
                    url: "turn:194.67.116.195:3478",
                    username: "test",
                    credential: "test"
                }
            ]
        }
    };

    let peer = new Peer(id, callOptions);
    let connections = [];

    peer.on('call', function(call) {
        call.answer();
        connections = [...connections, call];
    });
</script>

<p>Мой id: {id}</p>
{#each connections as connection}
    <Stream connection={connection} />
{/each}