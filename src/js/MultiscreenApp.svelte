<style type="text/scss">
    .multiscreen {
        display: flex;
        flex-wrap: wrap;
    }
</style>
<script>
    import Peer from 'peerjs';
    import settings from './settings';
    import MultiscreenUser from './MultiscreenUser.svelte';

    const peer = new Peer('multiscreen', settings.callOptions);

    let isPeerReady = false;
    let users = [];

    function handleClose(e) {
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
    peer.on('call', function(conn) {
        console.log('call');
        users = [...users, {
            mediaConnection: conn,
            peer: conn.peer
        }];
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
        <div class="multiscreen">
            {#each users as user}
                {#if user.mediaConnection}
                    <MultiscreenUser user={user} onClose={handleClose} />
                {/if}
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