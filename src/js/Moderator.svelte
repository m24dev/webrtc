<script>
    import Peer from 'peerjs';
    import Stream from './Stream.svelte';

    const id = 'm24webrtc';
    const callOptions = {
        host: "192.168.1.113",
        port: 9000,
        path: '/peerjs',
        debug: 3,
        secure: true,
        config: {
            'iceServers': [
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

    peer.on('open', () => {
        console.log('Connection opened');
    });

    peer.on('call', function (call) {
        console.log(111);
        console.log(call);
        call.answer();
        connections = [...connections, call];
    });
</script>

{#each connections as connection}
    <Stream connection={connection} />
{/each}