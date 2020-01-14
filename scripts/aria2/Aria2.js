const JSONRPCClient = require("./JSONRPCClient");

function prefix(str) {
    if (!str.startsWith("system.") && !str.startsWith("aria2.")) {
        str = "aria2." + str;
    }
    return str;
}
  
function unprefix(str) {
    const suffix = str.split("aria2.")[1];
    return suffix || str;
}

class Aria2 extends JSONRPCClient {
    addSecret(parameters) {
        let params = this.secret ? ["token:" + this.secret] : [];
        if (Array.isArray(parameters)) {
            params = params.concat(parameters);
        }
        return params;
    }

    async call(method, ...params) {
        return super.call(prefix(method), this.addSecret(params));
    }

    async multicall(calls) {
        const multi = [
            calls.map(([method, ...params]) => {
                return { methodName: prefix(method), params: this.addSecret(params) };
            })
        ];
        return super.call("system.multicall", multi);
    }
}

Object.assign(Aria2, { prefix, unprefix });

Aria2.defaultOptions = Object.assign({}, JSONRPCClient.defaultOptions, {
  secure: false,
  host: "localhost",
  port: 6800,
  secret: "",
  path: "/jsonrpc"
});

module.exports = Aria2;