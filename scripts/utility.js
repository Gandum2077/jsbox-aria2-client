/**
 * convert size in bytes to KB, MB, GB...
 * @param {number|string} bytes
 * @param {number} decimals
 */
function formatBytes(bytes, decimals = 2) {
    bytes = parseInt(bytes)
    if (bytes === 0) return '0 B';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

function getAdjustedFormatBytes(bytes) {
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
    const formatedBytes = formatBytes(bytes)
    const [numberString, unit] = formatedBytes.split(' ')
    const number = parseFloat(numberString)
    if (number >= 999.95) {
        const num = parseFloat((number / 1024).toFixed(2))
        return num + ' ' + sizes[sizes.indexOf(unit) + 1]
    } else {
        const [int, dm] = numberString.split('.')
        if (dm && numberString.length === 6) {
            return parseFloat(number.toFixed(1)) + ' ' + unit
        } else {
            return formatedBytes
        }
    }
}


function getOptions() {
    const options = {
        host: $prefs.get('host'),
        port: $prefs.get('port'),
        secure: $prefs.get('secure'),
        secret: $prefs.get('secret'),
        path: $prefs.get('path')
    }
    return options
}

async function callRPC(method, params) {
    const options = getOptions()
    const query = {
        options: options,
        method: method,
        params: params
    }
    return new Promise((resolve, reject) => {
        $nodejs.run({
            path: "scripts/aria2.js",
            query: query,
            listener: {
                id: "eventId",
                handler: result => {
                    if (result.response) {
                        resolve(result.response)
                    } else {
                        reject(result.error)
                    }
                }
            }
        })
    })
}

async function changePrefs() {
    const a = $ui.window
    $prefs.open()
    await $wait(0.1)
    let unfinished = true
    while(unfinished) {
        const b = $ui.window
        if (a === b) {
            unfinished = false 
        }
        await $wait(0.1)
    }
    return true
}

async function getStatus() {
    try {
        const result = {
            active: [],
            waiting: [],
            stopped: []
        }
        const status = await callRPC("getGlobalStat")
        result['uploadSpeed'] = status.uploadSpeed
        result['downloadSpeed'] = status.downloadSpeed
        if (status.numActive !== "0") {
            result.active = await callRPC("tellActive")
        } 
        if (status.numWaiting !== "0") {
            result.waiting = await callRPC("tellWaiting", [0, 1000])
        }
        if (status.numStopped !== "0") {
            result.stopped = await callRPC("tellStopped", [0, 1000])
        }
        return result
    } catch(err) {
        console.info(err)
        return 
    }
}

async function getVersion() {
    try {
        const result = await callRPC("getVersion")
        return result.version
    } catch(err) {
        console.info(err)
        return ''
    }
}

module.exports = {
    getAdjustedFormatBytes: getAdjustedFormatBytes,
    callRPC: callRPC,
    changePrefs: changePrefs,
    getStatus: getStatus,
    getVersion: getVersion
}