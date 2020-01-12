utility = require('./utility')

async function welcome() {
    await utility.changePrefs()
    let version = await utility.getVersion()
    while (!version) {
        const result = await $ui.alert({
            title: "设置错误",
            message: "无法获取版本号，请设置",
            actions: [{title: "Exit"}, {title: "Setting"}]
        })
        if (result.index) {
            await utility.changePrefs()
            version = await utility.getVersion()
        } else {
            $app.close()
        }
        
    }
}

module.exports = {
    welcome: welcome
}