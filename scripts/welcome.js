const _ = require("lodash");
const utility = require("./utility");

async function welcome() {
  const oldOptions = utility.getOptions();
  await utility.changePrefs();
  let version = await utility.getVersion();
  while (!version) {
    const result = await $ui.alert({
      title: "设置错误",
      message: "无法获取版本号，请设置",
      actions: [{ title: "Exit" }, { title: "Setting" }]
    });
    if (result.index) {
      await utility.changePrefs();
      version = await utility.getVersion();
    } else {
      $app.close();
    }
  }
  const newOptions = utility.getOptions();
  if (_.isEqual(oldOptions, newOptions)) {
    await utility.changeGlobalOptionForServer();
  } else {
    const result = await utility.getGlobalOptionFromServer();
    utility.setGlobalOptionToPrefs(result);
  }
}

module.exports = welcome;
