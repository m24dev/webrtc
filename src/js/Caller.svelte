<script>
    import Peer from 'peerjs';
    const remoteId = 'm24webrtc';
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

    let isCallStarted = false;
    let isDisconnected = false;
    let video;
    
    let peer = new Peer(callOptions);

    peer.on('open', () => {
        alert('Connection opened');
    });

    peer.on('close', () => {
        alert('Connection closed');
    });

    peer.on('disconnected', () => {
        alert('Disconnected');
    });

    peer.on('error', (err) => {
        alert(err);
    });

    function makeCall() {
        navigator.mediaDevices.getUserMedia({ audio: true, video: true })
            .then(function (mediaStream) {
                let peercall = peer.call(remoteId, mediaStream);
                
                isCallStarted = true;

                peercall.on('close', onCallClose);

                video.srcObject = mediaStream;
                video.onloadedmetadata = function () {
                    video.play();
                };
            })
            .catch(function (err) {
                alert(err);
                console.log(err.name + ": " + err.message);
            });
    }

    function onCallClose() {
        alert(555);
        peer.destroy();
        isCallStarted = false;
        isDisconnected = true;
    }
</script>

<video playsinline autoplay muted bind:this={video}></video>
{#if isCallStarted}
    <div class="form-group">
        Звонок начат...
        <button on:click={peer.disconnect()}>Завершить</button>
    </div>
{:else}
    <div class="form-group">
        <button on:click={makeCall}>Позвонить</button>
    </div>
{/if}
{#if isDisconnected}
    <div class="form-group">
        Соединение разорвано.
    </div>
{/if}