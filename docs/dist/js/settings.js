export default {
    callOptions: {
        host: '186528f25664.ngrok.io',
        port: 443,
        path: '/myapp',
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
    },
    adminID: 'admin',
    multiscreenID: 'multiscreen'
};