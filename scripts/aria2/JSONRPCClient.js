const JSONRPCError = require("./JSONRPCError");

class JSONRPCClient {
    constructor(options) {
        this.deferreds = Object.create(null);
        this.lastId = 0;
        Object.assign(this, this.constructor.defaultOptions, options);
    }

    id() {
        return this.lastId++;
    }
    
    url() {
        return (
            'http' +
            (this.secure ? "s" : "") +
            "://" +
            this.host +
            ":" +
            this.port +
            this.path
        );
    }

    async http(message) {
        const resp = await $http.post({
            url: this.url(),
            body: message,
            timeout: 5,
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            }
        })
        if (!resp.data || resp.response.statusCode !== 200) {
            throw new JSONRPCError({
                message:'JSONRPCError',
                code: (resp.response) ? resp.response.statusCode : 0,
                data: resp.data
            })
        }
        const data = resp.data

        return data
    }

    async call(method, parameters) {
        const message = this._buildMessage(method, parameters);
        const data = await this.http(message);
        return data
    }

    _buildMessage(method, params) {
        if (typeof method !== "string") {
            throw new TypeError(method + " is not a string");
        }
    
        const message = {
            method,
            "jsonrpc": "2.0",
            id: this.id()
        };
    
        if (params) Object.assign(message, { params });
        return message;
    }

}


JSONRPCClient.defaultOptions = {
    secure: false,
    host: "localhost",
    port: 80,
    secret: "",
    path: "/jsonrpc"
};

module.exports = JSONRPCClient;
