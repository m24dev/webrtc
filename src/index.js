"use strict";

import ready from "domready";
import Peer from 'peerjs';
import "./index.scss";

ready(() => {
    const startButton = document.getElementById('startButton');
    const callButton = document.getElementById('callButton');
    const answerButton = document.getElementById('answerButton');
    const closeButton = document.getElementById('closeButton');
    const customPeerIdControl = document.getElementById('peerId');
    const otherPeerIdControl = document.getElementById('otherPeerId');
    const videoLocal = document.getElementById('video-local');
    const videoRemote = document.getElementById('video-remote');
    const incomming = document.getElementById('incomming');
    const close = document.getElementById('close');

    callButton.disabled = true;

    let peer;
    let peercall;

    const callOptions = {
        iceServers: [
            {
                url: "stun:194.67.116.195:3479",
                username: "test",
                credential: "test",
            },
            {
                url: "turn:194.67.116.195:3478",
                username: "test",
                credential: "test",
            },
        ],
    };

    startButton.addEventListener('click', () => {
        startButton.disabled = true;
        callButton.disabled = false;

        const id = customPeerIdControl.value;

        peer = new Peer(id, { config: callOptions });
        console.log(peer);

        peer.on("call", function (call) {
            console.log('calling');
            console.log(call);
            // Answer the call, providing our mediaStream
            peercall = call;
            incomming.classList.remove('hidden');
        });
    });

    callButton.addEventListener('click', () => {
        const otherId = otherPeerIdControl.value;
        makeCall(otherId);
    });

    answerButton.addEventListener('click', () => {
        makeAnswer();
    });

    closeButton.addEventListener('click', () => {
        peer.destroy();
        close.classList.add('hidden');
    });

    function makeCall(peerId) {
        navigator.mediaDevices.getUserMedia({ audio: true, video: true })
            .then(function (mediaStream) {
                peercall = peer.call(peerId, mediaStream);
                peercall.on("stream", function (stream) {
                    //нам ответили, получим стрим
                    setTimeout(function () {
                        videoRemote.srcObject = peercall.remoteStream;
                        videoRemote.onloadedmetadata = function (e) {
                            videoRemote.play();
                        };
                    }, 1500);
                });
                //  peercall.on('close', onCallClose);
                videoLocal.srcObject = mediaStream;
                videoLocal.onloadedmetadata = function (e) {
                    videoLocal.play();
                };
            })
            .catch(function (err) {
                alert(err);
                console.log(err.name + ": " + err.message);
            });
    }

    function makeAnswer() {
        navigator.mediaDevices
            .getUserMedia({ audio: true, video: true })
            .then(function (mediaStream) {
                peercall.answer(mediaStream); // отвечаем на звонок и передаем свой медиапоток собеседнику
                //peercall.on ('close', onCallClose); //можно обработать закрытие-обрыв звонка
                incomming.classList.add('hidden');
                close.classList.remove('hidden'); //информируем, что звонок начат, и выводим кнопку Завершить
                videoLocal.srcObject = mediaStream; //помещаем собственный медиапоток в объект видео (чтоб видеть себя)
                videoLocal.onloadedmetadata = function (e) {
                    //запускаем воспроизведение, когда объект загружен
                    videoLocal.play();
                };
                setTimeout(function () {
                    //входящий стрим помещаем в объект видео для отображения
                    videoRemote.srcObject = peercall.remoteStream;
                    videoRemote.onloadedmetadata = function (e) {
                        // и запускаем воспроизведение когда объект загружен
                        videoRemote.play();
                    };
                }, 1500);
            })
            .catch(function (err) {
                console.log(err.name + ": " + err.message);
            });
    }
});
