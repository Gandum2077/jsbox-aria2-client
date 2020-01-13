const utility = require('./utility')
const peerid = require('./peerid')

let GID

function getDataForStatusInfoView(statusInfo) {
    let type
    let title = ''
    if (statusInfo.bittorrent && statusInfo.bittorrent.info && statusInfo.bittorrent.info.name) {
        title = statusInfo.bittorrent.info.name
        type = 'bittorrent'
    } else if (statusInfo.files.length === 1 && statusInfo.files[0].path) {
        title = statusInfo.files[0].path.split('/').pop()
        type = 'url'
    }
    const status = statusInfo.status
    const dir = statusInfo.dir
    const speed = `⇣${utility.getAdjustedFormatBytes(statusInfo.downloadSpeed)}/s ⇡${utility.getAdjustedFormatBytes(statusInfo.uploadSpeed)}/s`
    const size = `${utility.getAdjustedFormatBytes(statusInfo.totalLength)}(${statusInfo.numPieces} @ ${utility.getAdjustedFormatBytes(statusInfo.pieceLength)})`
    const download = utility.getAdjustedFormatBytes(statusInfo.completedLength)
    const upload = utility.getAdjustedFormatBytes(statusInfo.uploadLength)
    const uriTitle = (type === 'bittorrent') ? 'infohash' : 'url'
    const uri = (type === 'bittorrent') ? statusInfo.infoHash : statusInfo.files[0].uris[0].uri
    const connections = statusInfo.connections
    const numSeeders = statusInfo.numSeeders
    const bitfield = utility.bitfield(statusInfo.bitfield)
    const data = [
        {
            title: {
                text: "title"
            },
            content: {
                text: title
            }
        },
        {
            title: {
                text: "status"
            },
            content: {
                text: status
            }
        },
        {
            title: {
                text: "dir"
            },
            content: {
                text: dir
            }
        },
        {
            title: {
                text: "speed"
            },
            content: {
                text: speed
            }
        },
        {
            title: {
                text: "size"
            },
            content: {
                text: size
            }
        },
        {
            title: {
                text: "download"
            },
            content: {
                text: download
            }
        },
        {
            title: {
                text: "upload"
            },
            content: {
                text: upload
            }
        },
        {
            title: {
                text: uriTitle
            },
            content: {
                text: uri
            }
        },
        {
            title: {
                text: "connections"
            },
            content: {
                text: connections
            }
        },
        {
            title: {
                text: "numSeeders"
            },
            content: {
                text: numSeeders
            }
        }
    ]
    return data
}

function defineStatusView() {
    const template = {
        props: {
            bgcolor: $color("clear")
        },
        views: [
            {
                type: "label",
                props: {
                    id: "title",
                    align: $align.left
                },
                layout: function(make, view) {
                    make.top.left.bottom.inset(0)
                    make.width.equalTo(100)
                }
            },
            {
                type: "label",
                props: {
                    id: "content",
                    align: $align.right,
                    autoFontSize: false,
                    lines: 0
                },
                layout: function(make, view) {
                    make.top.right.bottom.inset(0)
                    make.left.equalTo($("title").right)
                }
            }
        ]
    }
    const list = {
        type: "list",
        props: {
            id: "statusInfoList",
            selectable: false,
            template: template
        },
        layout: function(make, view) {
            make.top.left.right.bottom.inset(30)
        },
        events: {
            ready: async function(sender) {
                const info = await utility.callRPC("tellStatus", [GID])
                sender.data = getDataForStatusInfoView(info)
            }
        }
    }
    return list
}

function getDataForFilesView(filesInfo) {
    return filesInfo.map(n => {
        return {
            title: {
                text: n.path
            },
            size: {
                text: `${utility.getAdjustedFormatBytes(n.completedLength)}/\n${utility.getAdjustedFormatBytes(n.length)}`
            }
        }
    })
}

function defineFilesView() {
    const template = {
        props: {
            bgcolor: $color("clear")
        },
        views: [
            {
                type: "label",
                props: {
                    id: "title",
                    lines: 2
                },
                layout: function(make, view) {
                    make.top.left.bottom.inset(0)
                    make.right.inset(80)
                }
            },
            {
                type: "label",
                props: {
                    id: "size",
                    lines: 2,
                    font: $font(13)
                },
                layout: function(make, view) {
                    make.top.right.bottom.inset(0)
                    make.width.equalTo(80)
                }
            }
        ]
    }
    const list = {
        type: "list",
        props: {
            id: "filesInfoList",
            template: template
        },
        layout: function(make, view) {
            make.top.left.right.bottom.inset(30)
        },
        events: {
            ready: async function(sender) {
                const info = await utility.callRPC("tellStatus", [GID])
                sender.data = getDataForFilesView(info.files)
            }
        }
    }
    return list
}

function getDataForPeersView(peersInfo) {
    return peersInfo.map(n => {
        let client
        try {
            const peerId = $text.URLDecode(utility.convertInvalidChrOfPeerId(n.peerId))
            client = peerid.parseClient(peerId).client
        } catch(err) {
            client =  "unknown"
        }
        return {
            address: {
                text: n.ip + ":" + n.port
            },
            client: {
                text: client
            },
            percent: {
                text: utility.bitfieldToPercent(n.bitfield) + "%"
            },
            speed: {
                text: `⇣${utility.getAdjustedFormatBytes(n.downloadSpeed)}/s ⇡${utility.getAdjustedFormatBytes(n.uploadSpeed)}/s`
            }
        }
    })
}

function definePeersView() {
    const template = {
        props: {
            bgcolor: $color("clear")
        },
        views: [
            {
                type: "label",
                props: {
                    id: "address"
                },
                layout: function(make, view) {
                    make.top.left.inset(0)
                    make.height.equalTo(22)
                    make.width.equalTo(250)
                }
            },
            {
                type: "label",
                props: {
                    id: "client"
                },
                layout: function(make, view) {
                    make.left.bottom.inset(0)
                    make.height.equalTo(22)
                    make.width.equalTo(150)
                }
            },
            {
                type: "label",
                props: {
                    id: "percent",
                    align: $align.right
                },
                layout: function(make, view) {
                    make.top.right.inset(0)
                    make.height.equalTo(22)
                    make.width.equalTo(100)
                }
            },
            {
                type: "label",
                props: {
                    id: "speed",
                    align: $align.right
                },
                layout: function(make, view) {
                    make.right.bottom.inset(0)
                    make.height.equalTo(22)
                    make.width.equalTo(200)
                }
            }
        ]
    }
    const list = {
        type: "list",
        props: {
            id: "peersInfoList",
            template: template
        },
        layout: function(make, view) {
            make.top.left.right.bottom.inset(30)
        },
        events: {
            ready: async function(sender) {
                try {
                    const info = await utility.callRPC("getPeers", [GID])
                    sender.data = getDataForPeersView(info)
                } catch(err) {
                    $ui.toast("getPeers失败")
                }
                
            }
        }
    }
    return list
}

function defineDetailView() {
    const tab = {
        type: "tab",
        props: {
            id: "tab",
            items: ["status", "files", "peers"],
            index: 0
        },
        layout: function(make, view) {
            make.top.left.right.inset(0)
            make.height.equalTo(50)
        },
        events: {
            changed: function(sender) {
                const index = sender.index
                $("contentView").views[0].remove()
                switch (index) {
                    case 0:
                        $("contentView").add(defineStatusView())
                        break;
                    case 1:
                        $("contentView").add(defineFilesView())
                        break;
                    case 2:
                        $("contentView").add(definePeersView())
                        break;
                    default:
                        break;
                }
            }
        }
    }
    const contentView = {
        type: "view",
        props: {
            id: "contentView"
        },
        layout: function(make, view) {
            make.bottom.left.right.inset(0)
            make.top.equalTo($("tab").bottom)
        }
    }
    const detailView = {
        type: "view",
        props: {
            id: "detailView",

        },
        layout: $layout.fill,
        views: [tab, contentView]
    }
    return detailView
}

function init(gid) {
    GID = gid
    $ui.push({
        props: {
            title: "Details"
        },
        views: [defineDetailView()]
    })
    $("contentView").add(defineStatusView())
}

module.exports = {
    init: init
}