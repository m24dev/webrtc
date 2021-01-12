<style type="text/scss">
</style>
<script>
    import Peer from 'peerjs';
    import settings from './settings';
    import { onMount } from 'svelte';
    import AdminUser from './AdminUser.svelte';

    const peer = new Peer('admin', settings.callOptions);

    let isPeerReady = false;
    let isQuestionActive = false;
    let users = [];
    let questions = [];
    let currentQuestion = 0;

    onMount(() => {
        // fetch('https://localhost:3000/questions')
        //     .then(response => {
        //         return response.json();
        //     })
        //     .then(data => {
        //         questions = data;
        //     })
    });

    function nextQuestion() {
        isQuestionActive = true;

        users.map(user => {
            let data = {
                action: 'startQuestion'
            }
            user.dataConnection.send(data);
        });

        setTimeout(() => {
            currentQuestion++;
            isQuestionActive = false;

            users.map(user => {
                let data = {
                    action: 'endQuestion'
                }
                user.dataConnection.send(data);
            });
        }, 7000);
    }

    function onSetUserConneсt(e) {
        users.map(user => {
            if (user.peer === e.detail.peer) {
                user.dataConnection.send({
                    action: 'call',
                    targetID: e.detail.targetID
                });
            }
        })
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
    <div class="text-center mb-3">
        <button type="button" class="btn btn-primary" disabled={isQuestionActive} on:click={nextQuestion}>Следующий вопрос</button>
    </div>
    <div class="users">
        {#if users.length}
            {#each users as user}
                <AdminUser user={user} questions={questions} currentQuestion={currentQuestion} on:setUserConnect={onSetUserConneсt} on:close={onConneсtionClose} />
            {/each}
        {:else}
            <div class="p-5 text-center">
                <p>Ожидание пользователей</p>
            </div>
        {/if}
    </div>
{:else}
    <div class="loader">
        <div class="spinner-border text-primary">
            <span class="sr-only">Загрузка...</span>
        </div>
    </div>
{/if}