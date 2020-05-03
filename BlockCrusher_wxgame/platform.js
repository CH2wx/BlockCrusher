/**
 * 请在白鹭引擎的Main.ts中调用 platform.login() 方法调用至此处。
 */

class WxgamePlatform {

    name = 'wxgame'
    applyJurisdiction() {
        wx.getSetting({
            success: (res) => {
                var status = res.authSetting;
                if (!status['scope.userInfo'])
                {
                    wx.authorize({
                        scope: 'scope.userInfo',
                        success: (res) => {
                            //授权成功后打开排行榜
                            console.log("打开排行榜");
                        }, fail: (res) => {
                            wx.showModal({
                                title: '是否授权用户信息',
                                content: '需要获取您的用户信息，请确认授权，否则排行榜功能将无法使用',
                                success: function (tip) {
                                    if (tip.confirm) {
                                        wx.openSetting({
                                        success: (res) => {
                                            if (res.authSetting["scope.userInfo"]) {
                                                wx.showToast({
                                                title: '授权成功！',
                                                icon: 'success',
                                                duration: 1000
                                                });
                                                //授权成功后打开排行榜
                                                console.log("打开排行榜");
                                            }
                                            else {
                                                wx.showToast({
                                                    title: '授权失败！',
                                                    icon: 'success',
                                                    duration: 1000
                                                });
                                            }
                                        },
                                        });
                                    }
                                }
                            });
                        }
                    });
                }
            }, fail: (res) => {
                wx.showToast({
                title: '调用授权窗口失败！',
                icon: 'success',
                duration: 1000
                });
            }
        })
    }

    login() {
        this.applyJurisdiction();
        return new Promise((resolve, reject) => {
            wx.login({
                success: (res) => {
                    resolve(res)
                }
            })
        })
    }

    getUserInfo() {
        return new Promise((resolve, reject) => {
            wx.getUserInfo({
                withCredentials: true,
                success: function (res) {
                    var userInfo = res.userInfo
                    var nickName = userInfo.nickName
                    var avatarUrl = userInfo.avatarUrl
                    var gender = userInfo.gender //性别 0：未知、1：男、2：女
                    var province = userInfo.province
                    var city = userInfo.city
                    var country = userInfo.country
                    resolve(userInfo);
                }
            })
        })
    }

    openDataContext = new WxgameOpenDataContext();
}

class WxgameOpenDataContext {

    createDisplayObject(type, width, height) {
        const bitmapdata = new egret.BitmapData(sharedCanvas);
        bitmapdata.$deleteSource = false;
        const texture = new egret.Texture();
        texture._setBitmapData(bitmapdata);
        const bitmap = new egret.Bitmap(texture);
        bitmap.width = width;
        bitmap.height = height;

        if (egret.Capabilities.renderMode == "webgl") {
            const renderContext = egret.wxgame.WebGLRenderContext.getInstance();
            const context = renderContext.context;
            ////需要用到最新的微信版本
            ////调用其接口WebGLRenderingContext.wxBindCanvasTexture(number texture, Canvas canvas)
            ////如果没有该接口，会进行如下处理，保证画面渲染正确，但会占用内存。
            if (!context.wxBindCanvasTexture) {
                egret.startTick((timeStarmp) => {
                    egret.WebGLUtils.deleteWebGLTexture(bitmapdata.webGLTexture);
                    bitmapdata.webGLTexture = null;
                    return false;
                }, this);
            }
        }
        return bitmap;
    }


    postMessage(data) {
        const openDataContext = wx.getOpenDataContext();
        openDataContext.postMessage(data);
    }
}


window.platform = new WxgamePlatform();