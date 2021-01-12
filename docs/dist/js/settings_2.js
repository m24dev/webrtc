export default {
    callOptions: {
        host: 'cross.m24.ru',
        port: 443,
        path: '/webrc/peerjs',
        debug: 3,
        config: {
            iceServers: [
                {
                    urls: 'stun:194.67.116.195:3479',		
                    username: "test",
                    credential: "test"
                },
                {
                    urls: "turn:194.67.116.195:3478",
                    username: "test",
                    credential: "test"
                }
            ]
        }
    }
};