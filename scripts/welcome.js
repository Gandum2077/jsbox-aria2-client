utility = require('./utility')

async function welcome() {
    await utility.changePrefs()
    let version = await utility.getVersion()
    while (!version) {
        await $ui.alert({
            title: "设置错误",
            message: "无法获取版本号",
            actions: [{title: "Cancel"}]
        })
        await utility.changePrefs()
        version = await utility.getVersion()
    }
}

module.exports = {
    welcome: welcome
}