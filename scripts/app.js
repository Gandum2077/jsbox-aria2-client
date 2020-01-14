const utility = require('./utility')
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
                    await welcome()
                    if ($("labelVersion")) {
                        const version = await utility.getVersion()
                        $("labelVersion").text = "Aria2" + " " + version
                    }
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
        await welcome()
    }
    const result = await utility.getGlobalOptionFromServer()
    utility.setGlobalOptionToPrefs(result)
    $ui.window.add(clientViewGenerator.defineClientView())
    await $wait(1)
    $app.tips("操作方式：轻点查看细节，长按开始/暂停，左滑删除")
}

module.exports = {
    init: init
}
