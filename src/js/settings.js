export default {
    moderatorId: 'm24webrtc',
    callOptions: {
        host: 'aedcde2c500b.ngrok.io',
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