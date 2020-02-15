const Aria2 = require('./aria2/Aria2')

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

/**
 * convert time in seconds to hh:mm:ss
 * @param {number|string} seconds 
 */
function formatTime(seconds) {
    var sec_num = parseInt(seconds, 10); // don't forget the second param
    var hours   = Math.floor(sec_num / 3600);
    if (hours >= 24){
        return "1d";
    }
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    return hours + ':' + minutes + ':' + seconds;
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

function bitfield(text) {
    const graphic = "░▒▓█"
    const len = text.length
    let result = ""
    for (let i = 0; i < len; i++) {
        result += graphic[Math.floor(parseInt(text[i], 16) / 4)] + '\u200B'
    }
    return result
}


function bitfieldToPercent(text) {
    const len = text.length - 1
    let p, one = 0
    for (let i = 0; i < len; i++) {
        p = parseInt(text[i], 16)
        for (let j = 0; j < 4; j++) {
            one += (p & 1)
            p >>= 1
        }
    }
    return Math.floor(one / (4 * len) * 100).toString()
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
    params = params || []
    const options = getOptions()
    const aria2 = new Aria2(options)
    const result = await aria2.call(method, ...params)
    return result.result
}

async function multicallRPC(multicall) {
    const options = getOptions()
    const aria2 = new Aria2(options)
    const results = await aria2.multicall(multicall)
    console.info(results)
}

async function changePrefs() {
    return new Promise((resolve, reject) => {
        $prefs.open(() =>resolve())
      })
}

async function getGlobalOptionFromServer() {
    const result = await callRPC("getGlobalOption")
    return result
}

function setGlobalOptionToPrefs(result) {
    $prefs.set("dir", result["dir"] || "/tmp")
    $prefs.set("max-overall-download-limit", parseInt(result["max-overall-download-limit"]) || 0)
    $prefs.set("max-overall-upload-limit", parseInt(result["max-overall-upload-limit"]) || 0)
    $prefs.set("max-concurrent-downloads", parseInt(result["max-concurrent-downloads"]) || 5)
    $prefs.set("user-agent", result["user-agent"] || "")
}

async function changeGlobalOptionForServer() {
    const result = {
        "dir": $prefs.get("dir"),
        "max-overall-download-limit": $prefs.get("max-overall-download-limit").toString(),
        "max-overall-upload-limit": $prefs.get("max-overall-upload-limit").toString(),
        "max-concurrent-downloads": $prefs.get("max-concurrent-downloads").toString(),
        "user-agent": $prefs.get("user-agent")
    }
    await callRPC("changeGlobalOption", [result])
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

function convertInvalidChrOfPeerId(s) {
    const slices = []
    while (s) {
        if (s[0] === "%") {
            slices.push(s.substring(0,3))
            s = s.slice(3)
        } else {
            slices.push(s[0])
            s = s.slice(1)
        }
    }
    for (let idx in slices) {
        const value = slices[idx]
        if (value.length === 3) {
            const index = parseInt(value.substring(1, 3), 16)
            if (index < 20 || index > 126) {
                slices[idx] = "%30"
            }
        }
    }
    return slices.join('')
}

module.exports = {
    getAdjustedFormatBytes: getAdjustedFormatBytes,
    formatTime: formatTime,
    bitfield: bitfield,
    bitfieldToPercent: bitfieldToPercent,
    getOptions: getOptions,
    callRPC: callRPC,
    multicallRPC: multicallRPC,
    changePrefs: changePrefs,
    getGlobalOptionFromServer: getGlobalOptionFromServer,
    setGlobalOptionToPrefs: setGlobalOptionToPrefs,
    changeGlobalOptionForServer: changeGlobalOptionForServer,
    getStatus: getStatus,
    getVersion: getVersion,
    convertInvalidChrOfPeerId: convertInvalidChrOfPeerId
}