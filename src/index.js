"use strict";

import ready from "domready";
import Peer from 'peerjs';
import "./index.scss";

ready(() => {
    const startButton = document.getElementById('startButton');
    const answerButton = document.getElementById('answerButton');
    // const cancelButton = document.getElementById('cancelButton');
    // const closeButton = document.getElementById('closeButton');
    const customPeerIdControl = document.getElementById('peerId');
    const otherPeerIdControl = document.getElementById('otherPeerId');
    const videoLocal = document.getElementById('video-local');
    const videoRemote = document.getElementById('video-remote');
    const incomming = document.getElementById('incomming');
    const close = document.getElementById('close');

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
        const id = customPeerIdControl.value;
        const otherId = otherPeerIdControl.value;

        peer = new Peer(id, { config: callOptions });

        peer.on("open", function (peerID) {
            document.getElementById("myId").innerHTML = peerID;
            callToNode(otherId);
        });
        peer.on("call", function (call) {
            // Answer the call, providing our mediaStream
            peercall = call;
            incomming.classList.remove('hidden');
        });

    });

    answerButton.addEventListener('click', () => {
        callAnswer();
    });

    function callToNode(peerId) {
        navigator.mediaDevices.getUserMedia({ audio: true, video: true })
            .then(function (mediaStream) {
                incomming.classList.remove('hidden');

                peercall = peer.call(peerId, mediaStream);
                alert(peercall);
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

    function callAnswer() {
        navigator.mediaDevices
            .getUserMedia({ audio: true, video: true })
            .then(function (mediaStream) {
                peercall.answer(mediaStream); // отвечаем на звонок и передаем свой медиапоток собеседнику
                //peercall.on ('close', onCallClose); //можно обработать закрытие-обрыв звонка
                videoLocal.srcObject = mediaStream; //помещаем собственный медиапоток в объект видео (чтоб видеть себя)
                close.classList.remove('hidden'); //информируем, что звонок начат, и выводим кнопку Завершить
                video.onloadedmetadata = function (e) {
                    //запускаем воспроизведение, когда объект загружен
                    video.play();
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
