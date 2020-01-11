const clientViewGenerator = require('./clientView')
const welcome = require('./welcome')

async function init() {
    const rootView = {
        props: {
            id: "rootView",
            title: "aria2Client",
            navButtons: [{
                title: "Settings",
                handler: async () => {
                    await changePrefs()
                }
            }]
        },
        views: []
    }
    $ui.render(rootView)
    const version = await utility.getVersion()
    if (!version) {
        await $ui.alert({
            title: "请先进行初始设置",
            actions: [{title: "OK"}]
        })
        await welcome.welcome()
    }
    $ui.window.add(clientViewGenerator.defineClientView())
}

module.exports = {
    init: init
}
