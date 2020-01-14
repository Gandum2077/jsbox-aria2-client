let OPTIONS
let RESULT

function defineUriInputView() {
    const text = {
        type: "text",
        props: {
            id: "textUri",
            placeholder: "HTTP, FTP or Magnet\n可添加多个链接，每个链接占一行即可",
            borderWidth: 1,
            borderColor: $color("#c6c6c8"),
            radius: 10,
            autocorrectionType: 1,
            autocapitalizationType: 0,
            spellCheckingType: 1
        },
        layout: function(make, view) {
            make.top.bottom.inset(10)
            make.left.right.inset(30)
        },
        events: {
            didEndEditing: function(sender) {
                const text = sender.text.trim()
                const uris = text.split('\n').filter(n => n.trim())
                if (uris.length) {
                    RESULT = {
                        type: "uri",
                        uris: sender.text.trim().split("\n")
                    }
                } else {
                    RESULT = undefined
                }
            }
        }
    }
    return text
}

function defineFileSelectionView() {
    const view = {
        type: "view",
        props: {
            id: "fileSelectionView"
        },
        views: [
            {
                type: "button",
                props: {
                    id: "button",
                    title: "select a torrent file"
                },
                layout: function(make, view) {
                    make.height.equalTo(50)
                    make.top.inset(10)
                    make.left.right.inset(30)

                },
                events: {
                    tapped: async function(sender) {
                        TEMP_EXIT = true
                        const torrent = await $drive.open()
                        TEMP_EXIT = false
                        if (torrent) {
                            sender.super.get("torrentName").text = torrent.fileName
                            RESULT = {
                                type: "torrent",
                                base64: $text.base64Encode(torrent)
                            }
                        } else {
                            sender.super.get("torrentName").text = ''
                            RESULT = undefined
                        }
                    }
                }
            },
            {
                type: "text",
                props: {
                    id: "torrentName",
                    editable: false,
                    selectable: false,
                    scrollEnabled: false,
                    borderWidth: 0
                },
                layout: function(make, view) {
                    make.top.equalTo($("button").bottom).inset(10)
                    make.bottom.inset(10)
                    make.left.right.inset(30)
                }
            }
        ],
        layout: function(make, view) {
            make.top.bottom.inset(10)
            make.left.right.inset(30)
        }
    }
    return view
}

function getData() {
    const data = [
        {
            title: {
                text: "File Name:"
            },
            content: {
                text: '',
                info: {
                    key: "out"
                }
            }
        },
        {
            title: {
                text: "Dir:"
            },
            content: {
                text: '',
                info: {
                    key: "dir"
                }
            }
        },
        {
            title: {
                text: "Split:"
            },
            content: {
                text: '',
                info: {
                    key: "split"
                }
            }
        },
        {
            title: {
                text: "Download Limit:"
            },
            content: {
                text: '',
                info: {
                    key: "max-download-limit"
                }
            }
        },
        {
            title: {
                text: "Upload Limit:"
            },
            content: {
                text: '',
                info: {
                    key: "max-upload-limit"
                }
            }
        },
        {
            title: {
                text: "Seed Ratio:"
            },
            content: {
                text: '',
                info: {
                    key: "seed-ratio"
                }
            }
        },
        {
            title: {
                text: "Seed Time:"
            },
            content: {
                text: '',
                info: {
                    key: "seed-time"
                }
            }
        },
        {
            title: {
                text: "Header:"
            },
            content: {
                text: '',
                info: {
                    key: "header"
                }
            }
        }
    ]
    return data
}

function defineOptionList() {
    const template = {
        props: {
            bgcolor: $color("clear")
        },
        views: [
            {
                type: "label",
                props: {
                    id: "title"
                },
                layout: function(make, view) {
                    make.top.left.bottom.inset(0)
                    make.width.equalTo(150)
                }
            },
            {
                type: "input",
                props: {
                    id: "content",
                    bgcolor: $color("clear"),
                    borderWidth: 1,
                    borderColor: $color("#c6c6c8"),
                    radius: 10,
                    autocorrectionType: 1,
                    autocapitalizationType: 0,
                    spellCheckingType: 1
                },
                layout: function(make, view) {
                    make.top.bottom.inset(3)
                    make.right.inset(0)
                    make.left.equalTo($("title").right)
                },
                events: {
                    returned: function(sender) {
                        sender.blur()
                    },
                    didEndEditing: function(sender) {
                        OPTIONS = {}
                        $("optionList").data.map((n, i) => {
                            const text = $("optionList").cell($indexPath(0, i)).get('content').text
                            if (text) {
                                OPTIONS[n.content.info.key] = text
                            }
                        })
                    }
                }
            }
        ]
    }
    const list = {
        type: "list",
        props: {
            id: "optionList",
            separatorHidden: true,
            template: template,
            data: getData(),
            header: {
                type: "label",
                props: {
                    height: 20,
                    text: "额外设置，若不需要留空即可，添加多个URI则File Name无效",
                    align: $align.center,
                    font: $font(12)
                }
              }
        },
        layout: function(make, view) {
            make.top.equalTo($("contentView").bottom)
            make.bottom.inset(20)
            make.left.right.inset(30)
        }
    }
    return list
}



function defineAddActionView() {
    const tab = {
        type: "tab",
        props: {
            id: "tab",
            items: ["URIs", "Torrent"],
            index: 0
        },
        layout: function(make, view) {
            make.top.left.right.inset(0)
            make.height.equalTo(50)
        },
        events: {
            changed: function(sender) {
                RESULT = undefined
                const index = sender.index
                $("contentView").views[0].remove()
                switch (index) {
                    case 0:
                        $("contentView").add(defineUriInputView())
                        break;
                    case 1:
                        $("contentView").add(defineFileSelectionView())
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
            make.left.right.inset(0)
            make.top.equalTo($("tab").bottom)
            make.height.equalTo(150)
        }
    }
    const optionList = defineOptionList()
    const addActionView = {
        type: "view",
        props: {
            id: "addActionView",

        },
        layout: $layout.fill,
        views: [tab, contentView, optionList]
    }
    return addActionView
}

async function pushAddActionView() {
    OPTIONS = undefined
    RESULT = undefined
    return new Promise((resolve, reject) => {
        $ui.push({
            views: [defineAddActionView()],
            events: {
                dealloc: function() {
                    if (RESULT) {
                        if (OPTIONS && Object.keys(OPTIONS).length === 0) OPTIONS = undefined
                        if (OPTIONS && RESULT.type === 'uri' && RESULT.uris.length > 1) {
                            delete OPTIONS.out
                        }
                        RESULT.options = OPTIONS
                        resolve(RESULT)
                    } else {
                        reject('cancelled')
                    }
                }
            }
        })
        $("contentView").add(defineUriInputView())
    })
}

module.exports = pushAddActionView