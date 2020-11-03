<script>
    import Peer from 'peerjs';
    const remoteId = 'm24webrtc';
    const callOptions = {
        host: '670b4dac6fd8.ngrok.io',
        port: 443,
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

    let isCallStarted = false;
    let isDisconnected = false;
    let video;
    let peercall;
    
    const peer = new Peer(callOptions);

    peer.on('error', (err) => {
        console.log(err);
    });

    function makeCall() {
        navigator.mediaDevices.getUserMedia({ audio: true, video: true })
            .then(function(mediaStream) {
                peercall = peer.call(remoteId, mediaStream);
                
                isCallStarted = true;
                isDisconnected = false;

                peercall.on('close', onCallClose);

                video.onloadedmetadata = function(e) {
                    video.play();
                };
                video.srcObject = mediaStream;
            })
            .catch(function (err) {
                alert(err);
                console.log(err.name + ": " + err.message);
            });
    }

    function onCallClose() {
        isCallStarted = false;
        isDisconnected = true;
    }
    function handleCloseClick() {
        peercall.close();
    }
</script>

<video playsinline autoplay muted bind:this={video}></video>
{#if isCallStarted}
    <div class="form-group">
        Звонок начат...
        <button on:click={handleCloseClick}>Завершить</button>
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