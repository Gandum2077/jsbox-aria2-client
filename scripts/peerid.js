const azStyleClients = {
    "A~": "Ares",
    "AG": "Ares",
    "AN": "Ares",
    "AR": "Ares",
    "AV": "Avicora",
    "AX": "BitPump",
    "AT": "Artemis",
    "AZ": "Vuze",
    "BB": "BitBuddy",
    "BC": "BitComet",
    "BE": "BitTorrent SDK",
    "BF": "BitFlu",
    "BG": "BTG",
    "bk": "BitKitten (libtorrent)",
    "BR": "BitRocket",
    "BS": "BTSlave",
    "BW": "BitWombat",
    "BX": "BittorrentX",
    "CB": "Shareaza Plus",
    "CD": "Enhanced CTorrent",
    "CT": "CTorrent",
    "DP": "Propogate Data Client",
    "DE": "Deluge",
    "EB": "EBit",
    "ES": "Electric Sheep",
    "FC": "FileCroc",
    "FG": "FlashGet",
    "FT": "FoxTorrent/RedSwoosh",
    "GR": "GetRight",
    "GS": "GSTorrent",
    "HL": "Halite",
    "HN": "Hydranode",
    "KG": "KGet",
    "KT": "KTorrent",
    "LC": "LeechCraft",
    "LH": "LH-ABC",
    "LK": "linkage",
    "LP": "Lphant",
    "LT": "libtorrent (Rasterbar)",
    "lt": "libTorrent (Rakshasa)",
    "LW": "LimeWire",
    "MO": "MonoTorrent",
    "MP": "MooPolice",
    "MR": "Miro",
    "MT": "MoonlightTorrent",
    "NE": "BT Next Evolution",
    "NX": "Net Transport",
    "OS": "OneSwarm",
    "OT": "OmegaTorrent",
    "PC": "CacheLogic",
    "PD": "Pando",
    "PE": "PeerProject",
    "pX": "pHoeniX",
    "qB": "qBittorrent",
    "QD": "qqdownload",
    "RT": "Retriever",
    "RZ": "RezTorrent",
    "S~": "Shareaza alpha/beta",
    "SB": "SwiftBit",
    "SD": "\u8FC5\u96F7\u5728\u7EBF (Xunlei)",
    "SG": "GS Torrent",
    "SN": "ShareNET",
    "SP": "BitSpirit",
    "SS": "SwarmScope",
    "ST": "SymTorrent",
    "st": "SharkTorrent",
    "SZ": "Shareaza",
    "TN": "Torrent.NET",
    "TR": "Transmission",
    "TS": "TorrentStorm",
    "TT": "TuoTu",
    "UL": "uLeecher!",
    "UT": "\u00B5Torrent",
    "UM": "\u00B5Torrent Mac",
    "WT": "Bitlet",
    "WW": "WebTorrent",
    "WY": "FireTorrent",
    "VG": "\u54c7\u560E (Vagaa)",
    "XL": "\u8FC5\u96F7\u5728\u7EBF (Xunlei)",
    "XT": "XanTorrent",
    "XX": "XTorrent",
    "XC": "XTorrent",
    "ZT": "ZipTorrent",
    "7T": "aTorrent",
    "#@": "Invalid PeerID"
}

const shadowStyleClients = {
    'A': "ABC",
    'O': "Osprey Permaseed",
    'Q': "BTQueue",
    'R': "Tribler",
    'S': "Shad0w",
    'T': "BitTornado",
    'U': "UPnP NAT"
}

const mainlineStyleClients = {
    'M': "Mainline",
    'Q': "Queen Bee"
}

const customStyleClients = [{
        "id": "-UT170-",
        "client": "µTorrent",
        "position": 0
    },
    {
        "id": "Azureus",
        "client": "Azureus",
        "position": 0
    },
    {
        "id": "Azureus",
        "client": "Azureus",
        "position": 5
    },
    {
        "id": "-aria2-",
        "client": "Aria",
        "position": 0
    },
    {
        "id": "PRC.P---",
        "client": "BitTorrent Plus!",
        "position": 0
    },
    {
        "id": "P87.P---",
        "client": "BitTorrent Plus!",
        "position": 0
    },
    {
        "id": "S587Plus",
        "client": "BitTorrent Plus!",
        "position": 0
    },
    {
        "id": "AZ2500BT",
        "client": "BitTyrant (Azureus Mod)",
        "position": 0
    },
    {
        "id": "BLZ",
        "client": "Blizzard Downloader",
        "position": 0
    },
    {
        "id": "BG",
        "client": "BTGetit",
        "position": 10
    },
    {
        "id": "btuga",
        "client": "BTugaXP",
        "position": 0
    },
    {
        "id": "BTuga",
        "client": "BTugaXP",
        "position": 5
    },
    {
        "id": "oernu",
        "client": "BTugaXP",
        "position": 0
    },
    {
        "id": "BTDWV-",
        "client": "Deadman Walking",
        "position": 0
    },
    {
        "id": "Deadman Walking-",
        "client": "Deadman",
        "position": 0
    },
    {
        "id": "Ext",
        "client": "External Webseed",
        "position": 0
    },
    {
        "id": "-G3",
        "client": "G3 Torrent",
        "position": 0
    },
    {
        "id": "271-",
        "client": "GreedBT",
        "position": 0
    },
    {
        "id": "arclight",
        "client": "Hurricane Electric",
        "position": 0
    },
    {
        "id": "-WS",
        "client": "HTTP Seed",
        "position": 0
    },
    {
        "id": "10-------",
        "client": "JVtorrent",
        "position": 0
    },
    {
        "id": "LIME",
        "client": "Limewire",
        "position": 0
    },
    {
        "id": "martini",
        "client": "Martini Man",
        "position": 0
    },
    {
        "id": "Pando",
        "client": "Pando",
        "position": 0
    },
    {
        "id": "PEERAPP",
        "client": "PeerApp",
        "position": 0
    },
    {
        "id": "btfans",
        "client": "SimpleBT",
        "position": 4
    },
    {
        "id": "a00---0",
        "client": "Swarmy",
        "position": 0
    },
    {
        "id": "a02---0",
        "client": "Swarmy",
        "position": 0
    },
    {
        "id": "T00---0",
        "client": "Teeweety",
        "position": 0
    },
    {
        "id": "346-",
        "client": "TorrentTopia",
        "position": 0
    },
    {
        "id": "DansClient",
        "client": "XanTorrent",
        "position": 0
    },
    {
        "id": "-MG1",
        "client": "MediaGet",
        "position": 0
    },
    {
        "id": "-MG21",
        "client": "MediaGet",
        "position": 0
    },
    {
        "id": "S3-",
        "client": "Amazon AWS S3",
        "position": 0
    },
    {
        "id": "DNA",
        "client": "BitTorrent DNA",
        "position": 0
    },
    {
        "id": "OP",
        "client": "Opera",
        "position": 0
    },
    {
        "id": "O",
        "client": "Opera",
        "position": 0
    },
    {
        "id": "Mbrst",
        "client": "Burst!",
        "position": 0
    },
    {
        "id": "turbobt",
        "client": "TurboBT",
        "position": 0
    },
    {
        "id": "btpd",
        "client": "BT Protocol Daemon",
        "position": 0
    },
    {
        "id": "Plus",
        "client": "Plus!",
        "position": 0
    },
    {
        "id": "XBT",
        "client": "XBT",
        "position": 0
    },
    {
        "id": "-BOW",
        "client": "BitsOnWheels",
        "position": 0
    },
    {
        "id": "eX",
        "client": "eXeem",
        "position": 0
    },
    {
        "id": "-ML",
        "client": "MLdonkey",
        "position": 0
    },
    {
        "id": "BitLet",
        "client": "Bitlet",
        "position": 0
    },
    {
        "id": "AP",
        "client": "AllPeers",
        "position": 0
    },
    {
        "id": "BTM",
        "client": "BTuga Revolution",
        "position": 0
    },
    {
        "id": "RS",
        "client": "Rufus",
        "position": 2
    },
    {
        "id": "BM",
        "client": "BitMagnet",
        "position": 2
    },
    {
        "id": "QVOD",
        "client": "QVOD",
        "position": 0
    },
    {
        "id": "TB",
        "client": "Top-BT",
        "position": 0
    },
    {
        "id": "TIX",
        "client": "Tixati",
        "position": 0
    },
    {
        "id": "-FL",
        "client": "folx",
        "position": 0
    },
    {
        "id": "-UM",
        "client": "µTorrent Mac",
        "position": 0
    },
    {
        "id": "-UT",
        "client": "µTorrent",
        "position": 0
    }
]

if (typeof String.prototype.endsWith !== 'function') {
    String.prototype.endsWith = function (str) {
        return this.slice(-str.length) === str
    }
}

if (typeof String.prototype.startsWith !== 'function') {
    String.prototype.startsWith = function (str, index) {
        index = index || 0
        return this.slice(index, index + str.length) === str
    }
}

function isDigit(s) {
    var code = s.charCodeAt(0)
    return code >= '0'.charCodeAt(0) && code <= '9'.charCodeAt(0)
}

function isLetter(s) {
    var code = s.toLowerCase().charCodeAt(0)
    return code >= 'a'.charCodeAt(0) && code <= 'z'.charCodeAt(0)
}

function isAlphaNumeric(s) {
    return isDigit(s) || isLetter(s) || s === '.'
}

function isPossibleSpoofClient(peerId) {
    return peerId.endsWith('UDP0') || peerId.endsWith('HTTPBT')
}

function isAzStyle(peerId) {
    if (peerId.charAt(0) !== '-') return false
    if (peerId.charAt(7) === '-') return true

    /**
     * Hack for FlashGet - it doesn't use the trailing dash.
     * Also, LH-ABC has strayed into "forgetting about the delimiter" territory.
     *
     * In fact, the code to generate a peer ID for LH-ABC is based on BitTornado's,
     * yet tries to give an Az style peer ID... oh dear.
     *
     * BT Next Evolution seems to be in the same boat as well.
     *
     * KTorrent 3 appears to use a dash rather than a final character.
     */
    if (peerId.substring(1, 3) === "FG") return true
    if (peerId.substring(1, 3) === "LH") return true
    if (peerId.substring(1, 3) === "NE") return true
    if (peerId.substring(1, 3) === "KT") return true
    if (peerId.substring(1, 3) === "SP") return true

    return false
}

/**
 * Checking whether a peer ID is Shadow style or not is a bit tricky.
 *
 * The BitTornado peer ID convention code is explained here:
 *   http://forums.degreez.net/viewtopic.php?t=7070
 *
 * The main thing we are interested in is the first six characters.
 * Although the other characters are base64 characters, there's no
 * guarantee that other clients which follow that style will follow
 * that convention (though the fact that some of these clients use
 * BitTornado in the core does blur the lines a bit between what is
 * "style" and what is just common across clients).
 *
 * So if we base it on the version number information, there's another
 * problem - there isn't the use of absolute delimiters (no fixed dash
 * character, for example).
 *
 * There are various things we can do to determine how likely the peer
 * ID is to be of that style, but for now, I'll keep it to a relatively
 * simple check.
 *
 * We'll assume that no client uses the fifth version digit, so we'll
 * expect a dash. We'll also assume that no client has reached version 10
 * yet, so we expect the first two characters to be "letter,digit".
 *
 * We've seen some clients which don't appear to contain any version
 * information, so we need to allow for that.
 */
function isShadowStyle(peerId) {
    if (peerId.charAt(5) !== '-') return false
    if (!isLetter(peerId.charAt(0))) return false
    if (!(isDigit(peerId.charAt(1)) || peerId.charAt(1) === '-')) return false

    // Find where the version number string ends.
    var lastVersionNumberIndex = 4
    for (; lastVersionNumberIndex > 0; lastVersionNumberIndex--) {
        if (peerId.charAt(lastVersionNumberIndex) !== '-') break
    }

    // For each digit in the version string, check if it is a valid version identifier.
    for (var i = 1; i <= lastVersionNumberIndex; i++) {
        var c = peerId.charAt(i)
        if (c === '-') return false
        if (isAlphaNumeric(c) === null) return false
    }
    return true
}

function isMainlineStyle(peerId) {
    /**
     * One of the following styles will be used:
     *   Mx-y-z--
     *   Mx-yy-z-
     */
    return peerId.charAt(2) === '-' && peerId.charAt(7) === '-' &&
        (peerId.charAt(4) === '-' || peerId.charAt(5) === '-')
}

function decodeBitSpiritClient(peerId) {
    if (peerId.substring(2, 4) !== 'BS') return null
    return {
        client: "BitSpirit"
    }
}

function decodeBitCometClient(peerId) {
    var modName = ""
    if (peerId.startsWith("exbc")) modName = ""
    else if (peerId.startsWith("FUTB")) modName = "(Solidox Mod)"
    else if (peerId.startsWith("xUTB")) modName = "(Mod 2)"
    else return null

    var isBitlord = (peerId.substring(6, 10) === "LORD")

    // Older versions of BitLord are of the form x.yy, whereas new versions (1 and onwards),
    // are of the form x.y. BitComet is of the form x.yy
    var clientName = (isBitlord) ? "BitLord" : "BitComet"

    return {
        client: clientName + (modName ? " " + modName : "")
    }
}

function getAzStyleClientName(peerId) {
    return azStyleClients[peerId.substring(1, 3)]
}

function getShadowStyleClientName(peerId) {
    return shadowStyleClients[peerId.substring(0, 1)]
}

function getMainlineStyleClientName(peerId) {
    return mainlineStyleClients[peerId.substring(0, 1)]
}

function getSimpleClient(peerId) {
    for (let client of customStyleClients) {
        if (peerId.startsWith(client.id, client.position)) {
            return client
        }
    }
    return null
}

function parseClient(peerId) {
    if (peerId.length !== 20) {
        throw new Error('Invalid peerId length (hex buffer must be 20 bytes): ' + peerId)
    }
    var UNKNOWN = 'unknown'
    var FAKE = 'fake'
    var client = null
    var data

    // If the client reuses parts of the peer ID of other peers, then try to determine this
    // first (before we misidentify the client).
    if (isPossibleSpoofClient(peerId)) {
        if ((client = decodeBitSpiritClient(peerId))) return client
        if ((client = decodeBitCometClient(peerId))) return client
        return {
            client: "BitSpirit?"
        }
    }

    // See if the client uses Az style identification
    if (isAzStyle(peerId)) {
        if ((client = getAzStyleClientName(peerId))) {

            // Hack for fake ZipTorrent clients - there seems to be some clients
            // which use the same identifier, but they aren't valid ZipTorrent clients
            if (client.startsWith("ZipTorrent") && peerId.startsWith("bLAde", 8)) {
                return {
                    client: UNKNOWN + " [" + FAKE + ": " + name + "]",
                }
            }

            // BitTorrent 6.0 Beta currently misidentifies itself
            if ("\u00B5Torrent" === client) {
                return {
                    client: "Mainline"
                }
            }

            // If it's the rakshasa libtorrent, then it's probably rTorrent
            if (client.startsWith("libTorrent (Rakshasa)")) {
                return {
                    client: client + " / rTorrent*"
                }
            }

            return {
                client: client
            }
        }
    }

    // See if the client uses Shadow style identification
    if (isShadowStyle(peerId)) {
        if ((client = getShadowStyleClientName(peerId))) {
            // TODO: handle shadow style client version numbers
            return {
                client: client
            }
        }
    }

    // See if the client uses Mainline style identification
    if (isMainlineStyle(peerId)) {
        if ((client = getMainlineStyleClientName(peerId))) {
            // TODO: handle mainline style client version numbers
            return {
                client: client
            }
        }
    }

    // Check for BitSpirit / BitComet disregarding from spoof mode
    if ((client = decodeBitSpiritClient(peerId))) return client
    if ((client = decodeBitCometClient(peerId))) return client

    // See if the client identifies itself using a particular substring
    if ((data = getSimpleClient(peerId))) {
        client = data.client

        // TODO: handle simple client version numbers
        return {
            client: client
        }
    }

    // TODO: handle unknown az-formatted and shadow-formatted clients
    return {
        client: "unknown"
    }
}

module.exports = {
    parseClient: parseClient
}