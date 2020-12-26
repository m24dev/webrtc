<style type="text/scss">
    .user {
        &__video {

        }
    }
</style>
<script>
    function toggleVideo(e, user) {
        console.log(111);

        const $btn = e.currentTarget;
        const $video = $btn.parentNode.querySelector('video');

        

        if (user.mediaConnection.open) {
            console.log(222);
            user.mediaConnection.close();
        } else {
            console.log(333);
            user.mediaConnection.answer();
            playVideo($video);
        }
    }
    function playVideo(user) {
        el.srcObject = stream;
        el.onloadedmetadata = () => {
            el.play();
        };
    }

    function onConneсtionClose(e) {
        users = users.map(user => {
            if (user.peer === e.detail.peer) {
                return {...user, isDataConnectionClosed: true};
            }
            return user;
        });
    }

    peer.on('open', function(id){
        console.log('open');
        isPeerReady = true;
    });
    peer.on('connection', function (conn) {
        console.log('connection');
        users = [...users, {
            dataConnection: conn,
            peer: conn.peer
        }];
    });
    peer.on('call', function(conn) {
        console.log('call');
        users = users.map(user => {
            if (user.peer === conn.peer) {
                conn.on('stream', stream => {
                    playVideo(user);
                });
                return {...user, mediaConnection: conn};
            }
            return user;
        });
    });
    peer.on('error', function(err){
        console.error(err);
    });
    peer.on('disconnected', function(){
        console.log('disconnected');
    });
</script>

{#if isPeerReady}
    {#if users.length}
        <div class="users">
            {#each users as user}
                <div class="user card mb-3">
                    <div class="row no-gutters">
                        <div class="col-md-4">
                            <div class="user__video">
                                <video></video>
                                <button type="button" on:click={e => toggleVideo(e, user)}>Вкл./Выкл. видео</button>
                            </div>
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h5 class="card-title">{user.peer}</h5>
                                <button type="button">Добавить</button>
                                <p class="card-text">Правильных ответов: {user.points}</p>
                            </div>
                        </div>
                    </div>
                </div>
            {/each}
        </div>
    {:else}
        <div class="p-5 text-center">
            <p>Ожидание пользователей</p>
        </div>
    {/if}
{:else}
    <div class="loader">
        <div class="spinner-border text-primary">
            <span class="sr-only">Загрузка...</span>
        </div>
    </div>
{/if}