<style type="text/scss">
    .user {
        position: relative;
        width: 20%;
        height: 15vh;
        video {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }
</style>
<script>
    export let user;
    let video;

    user.mediaConnection.on('stream', (stream) => {
        console.log('stream');

        video.srcObject = stream;
        video.onloadedmetadata = () => {
            video.play();
        };
    });

    user.mediaConnection.answer();
</script>

<div class="user">
    <video muted bind:this={video}></video>
</div>