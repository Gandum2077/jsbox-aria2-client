const utility = require("./utility");
const detailViewGenerator = require("./detailView");
const pushAddActionView = require("./addActionView");

function defineToolsView() {
  const buttonAdd = {
    type: "button",
    props: {
      id: "buttonAdd",
      icon: $icon("104", $color("#ccc"), $size(25, 25)),
      bgcolor: $color("#007aff")
    },
    layout: function(make, view) {
      make.centerY.equalTo(view.super);
      make.left.inset(25);
      make.height.equalTo(32);
      make.width
        .equalTo(view.super.width)
        .multipliedBy(0.25)
        .offset(-(80 / 4));
    },
    events: {
      tapped: async function(sender) {
        const result = await pushAddActionView();
        console.info(result);
        switch (result.type) {
          case "uri": {
            const multicall = result.uris.map(n => {
              if (result.options) {
                return ["addUri", [n], result.options];
              } else {
                return ["addUri", [n]];
              }
            });
            try {
              await utility.multicallRPC(multicall);
              await refresh();
            } catch (err) {
              $ui.toast("失败");
              console.info(err);
            }
            break;
          }
          case "torrent": {
            try {
              if (result.options) {
                await utility.callRPC("addTorrent", [
                  result.base64,
                  result.options
                ]);
              } else {
                await utility.callRPC("addTorrent", [result.base64]);
              }
              await refresh();
            } catch (err) {
              $ui.toast("失败");
              console.info(err);
            }
            break;
          }
          default:
            break;
        }
      }
    }
  };
  const buttonUnpauseAll = {
    type: "button",
    props: {
      id: "buttonUnpauseAll",
      bgcolor: $color("green")
    },
    views: [
      {
        type: "image",
        props: {
          symbol: "play.fill",
          contentMode: 1,
          tintColor: $color("gray"),
          alpha: 0.5
        },
        layout: $layout.fill
      }
    ],
    layout: function(make, view) {
      make.centerY.equalTo(view.super);
      make.left.equalTo($("buttonAdd").right).offset(10);
      make.height.equalTo(32);
      make.width.equalTo($("buttonAdd").width);
    },
    events: {
      tapped: async function(sender) {
        try {
          await utility.callRPC("unpauseAll");
          await refresh();
        } catch (err) {
          $ui.toast("失败");
          console.info(err);
        }
      }
    }
  };
  const buttonPauseAll = {
    type: "button",
    props: {
      id: "buttonPauseAll",
      bgcolor: $color("orange")
    },
    views: [
      {
        type: "image",
        props: {
          symbol: "pause.fill",
          contentMode: 1,
          tintColor: $color("white"),
          alpha: 0.5
        },
        layout: $layout.fill
      }
    ],
    layout: function(make, view) {
      make.centerY.equalTo(view.super);
      make.left.equalTo($("buttonUnpauseAll").right).offset(10);
      make.height.equalTo(32);
      make.width.equalTo($("buttonUnpauseAll").width);
    },
    events: {
      tapped: async function(sender) {
        try {
          await utility.callRPC("pauseAll");
          await refresh();
        } catch (err) {
          $ui.toast("失败");
          console.info(err);
        }
      }
    }
  };
  const buttonRemoveFinished = {
    type: "button",
    props: {
      id: "buttonRemoveFinished",
      bgcolor: $color("red")
    },
    views: [
      {
        type: "image",
        props: {
          symbol: "trash.fill",
          contentMode: 1,
          tintColor: $color("white"),
          alpha: 0.5
        },
        layout: $layout.fill
      }
    ],
    layout: function(make, view) {
      make.centerY.equalTo(view.super);
      make.left.equalTo($("buttonPauseAll").right).offset(10);
      make.height.equalTo(32);
      make.width.equalTo($("buttonPauseAll").width);
    },
    events: {
      tapped: async function(sender) {
        try {
          await utility.callRPC("purgeDownloadResult");
          await refresh();
        } catch (err) {
          $ui.toast("失败");
          console.info(err);
        }
      }
    }
  };
  const toolsView = {
    type: "view",
    props: {
      id: "toolsView",
      bgcolor: $color("#f3f3f4")
    },
    views: [buttonAdd, buttonUnpauseAll, buttonPauseAll, buttonRemoveFinished],
    layout: function(make, view) {
      make.top.left.right.inset(0);
      make.height.equalTo(50);
    }
  };
  return toolsView;
}

function defineFooterView() {
  const labelSpeed = {
    type: "label",
    props: {
      id: "labelSpeed",
      text: "⇩0 B/s  ⇧0 B/s",
      align: $align.left
    },
    layout: function(make, view) {
      make.top.inset(0);
      make.left.inset(10);
      make.height.equalTo(32);
      make.right.equalTo($("labelVersion").left);
    }
  };
  const labelVersion = {
    type: "label",
    props: {
      id: "labelVersion",
      text: "Aria2",
      align: $align.right
    },
    layout: function(make, view) {
      make.top.inset(0);
      make.right.inset(10);
      make.height.equalTo(32);
      make.width.equalTo(100);
    }
  };
  const footerView = {
    type: "view",
    props: {
      id: "footerView",
      bgcolor: $color("#f3f3f4")
    },
    views: [labelVersion, labelSpeed],
    layout: function(make, view) {
      make.bottom.left.right.inset(0);
      make.height.equalTo(32);
    }
  };
  return footerView;
}

const template = {
  props: {
    bgcolor: $color("white")
  },
  views: [
    {
      type: "view",
      props: {
        id: "background",
        alpha: 0.25
      },
      layout: $layout.fill,
      views: [
        {
          type: "view",
          props: {
            id: "inner"
          }
        }
      ],
      events: {
        layoutSubviews: sender => {
          const inner = sender.get("inner");
          const bounds = sender.frame;
          const percentage = sender.info.percentage;
          inner.frame = $rect(0, 0, bounds.width * percentage, bounds.height);
          inner.bgcolor = sender.info.innerColor;
        }
      }
    },
    {
      type: "image",
      props: {
        id: "icon"
      },
      layout: function(make, view) {
        make.size.equalTo($size(30, 30));
        make.centerY.equalTo(view.super);
        make.left.inset(10);
      }
    },
    {
      type: "label",
      props: {
        id: "title"
      },
      layout: function(make, view) {
        make.height.equalTo(32);
        make.top.inset(0);
        make.left.equalTo($("icon").right).inset(10);
        make.right.inset(0);
      }
    },
    {
      type: "label",
      props: {
        id: "size",
        align: $align.right,
        font: $font(11),
        autoFontSize: true
      },
      layout: function(make, view) {
        make.size.equalTo($size(110, 32));
        make.bottom.inset(0);
        make.right.inset(10);
      }
    },
    {
      type: "label",
      props: {
        id: "speed",
        align: $align.left,
        font: $font(11),
        autoFontSize: true
      },
      layout: function(make, view) {
        make.height.equalTo(32);
        make.bottom.inset(0);
        make.left.equalTo($("icon").right).inset(10);
        make.right.equalTo($("size").left);
      }
    }
  ]
};

function getData(result) {
  function handleItems(items) {
    items.reverse();
    const colors = {
      active: $color("green"),
      waiting: $color("white"),
      paused: $color("yellow"),
      error: $color("red"),
      complete: $color("green"),
      removed: $color("gray")
    };
    const icons = {
      active: "icloud.and.arrow.down.fill",
      waiting: "pause.circle",
      paused: "pause.circle",
      error: "xmark.circle.fill",
      complete: "checkmark.circle.fill",
      removed: "trash.fill"
    };
    return items.map(n => {
      let title = "";
      if (n.bittorrent && n.bittorrent.info && n.bittorrent.info.name) {
        title = n.bittorrent.info.name;
      } else if (n.files.length === 1 && n.files[0].path) {
        title = n.files[0].path.split("/").pop();
      }
      const speedText =
        n.status === "complete"
          ? ""
          : `⇣${utility.getAdjustedFormatBytes(
              n.downloadSpeed
            )}/s ⇡${utility.getAdjustedFormatBytes(n.uploadSpeed)}/s`;
      const remainingTime =
        n.status === "active"
          ? parseInt(n.downloadSpeed)
            ? " ETA: " +
              utility.formatTime(
                (parseInt(n.totalLength) - parseInt(n.completedLength)) /
                  parseInt(n.downloadSpeed)
              )
            : " ETA: INF"
          : "";
      return {
        background: {
          info: {
            percentage:
              n.totalLength !== "0"
                ? parseInt(n.completedLength) / parseInt(n.totalLength)
                : 0,
            innerColor: colors[n.status]
          }
        },
        icon: {
          symbol: icons[n.status]
        },
        title: {
          text: title,
          info: {
            gid: n.gid,
            status: n.status
          }
        },
        speed: {
          text: speedText + remainingTime
        },
        size: {
          text:
            n.status === "complete"
              ? utility.getAdjustedFormatBytes(n.totalLength)
              : utility.getAdjustedFormatBytes(n.completedLength) +
                "/" +
                utility.getAdjustedFormatBytes(n.totalLength)
        }
      };
    });
  }
  return [
    ...handleItems(result.active),
    ...handleItems(result.waiting),
    ...handleItems(result.stopped)
  ];
}

function defineListView() {
  const list = {
    type: "list",
    props: {
      id: "list",
      rowHeight: 64,
      template: template,
      actions: [
        {
          title: "remove",
          color: $color("red"),
          handler: async function(sender, indexPath) {
            const info = sender.data[indexPath.row].title.info;
            try {
              if (
                ["complete", "error", "removed"].indexOf(info.status) !== -1
              ) {
                await utility.callRPC("removeDownloadResult", [info.gid]);
              } else {
                await utility.callRPC("remove", [info.gid]);
              }
              await refresh();
            } catch (err) {
              console.info(err);
              $ui.toast("remove失败");
            }
          }
        }
      ]
    },
    layout: function(make, view) {
      make.top.equalTo($("toolsView").bottom);
      make.bottom.equalTo($("footerView").top);
      make.left.right.inset(0);
    },
    events: {
      ready: async function(sender) {
        const version = await utility.getVersion();
        $("labelVersion").text = "Aria2" + " " + version;
        while (sender.super) {
          if (!sender.hasActiveAction) {
            await refresh();
          }
          await $wait($prefs.get("refresh_interval") || 5);
        }
      },
      forEachItem: (view, indexPath) => {
        const wrapper = view.get("background");
        const inner = wrapper.get("inner");
        const percentage = wrapper.info.percentage;
        inner.frame = $rect(
          0,
          0,
          wrapper.frame.width * percentage,
          wrapper.frame.height
        );
        inner.bgcolor = wrapper.info.innerColor;
      },
      didSelect: function(sender, indexPath, data) {
        const info = data.title.info;
        detailViewGenerator.init(info.gid);
      },
      didLongPress: async function(sender, indexPath, data) {
        const info = data.title.info;
        if (info.status === "paused") {
          await utility.callRPC("unpause", [info.gid]);
          await refresh();
        } else if (info.status === "active" || info.status === "waiting") {
          await utility.callRPC("pause", [info.gid]);
          await refresh();
        } else if (info.status === "error") {
          const taskStatus = await utility.callRPC("tellStatus", [info.gid]);
          const taskOption = await utility.callRPC("getOption", [info.gid]);
          const taskUris = taskStatus.files[0].uris;
          const retryUris = taskUris.map(n => {
            return n.uri;
          });
          try {
            await utility.callRPC("addUri", [retryUris, taskOption]);
            await refresh();
          } catch (err) {
            $ui.toast("失败");
            console.info(err);
          }
          //console.log(retryUris)
        }
      }
    }
  };
  return list;
}

function defineClientView() {
  const footerView = defineFooterView();
  const toolsView = defineToolsView();
  const listView = defineListView();
  const clientView = {
    type: "view",
    props: {
      id: "clientView"
    },
    views: [toolsView, footerView, listView],
    layout: $layout.fill
  };
  return clientView;
}

async function refresh() {
  const list = $("list");
  const result = await utility.getStatus();
  if (result && !list.hasActiveAction) {
    list.data = getData(result);
    $("labelSpeed").text = `▼ ${utility.getAdjustedFormatBytes(
      result.downloadSpeed
    )}/s  ▲ ${utility.getAdjustedFormatBytes(result.uploadSpeed)}/s`;
  }
}

module.exports = {
  defineClientView
};
