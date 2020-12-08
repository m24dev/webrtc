export default {
    moderatorId: 'm24webrtc',
    callOptions: {
        host: '186528f25664.ngrok.io',
        port: 443,
        path: '/myapp',
        // debug: 3,
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
    }
};