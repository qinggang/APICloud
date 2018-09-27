(function (window) {
    var qg = {};
//图片缓存
    /*
    用法
    (<img  onload="qg.fnLoadImage(this)"  data-url="http://192.168.0.100/1.jpg"  src="http://192.168.0.100/1.jpg">
      */
    qg.fnLoadImage = function (ele_) {
        var imageURL = $api.attr(ele_, 'data-url');
        // alert(imageURL);
        if (imageURL) {

            api.imageCache({
                url: imageURL
            }, function (ret, err) {
                if (ret.status) {
                    ele_.src = ret.url;
                    //    alert(ele_.src);
                    //  $api.byId('log').append(ele_.src);
                    $api.removeAttr(ele_, 'data_url');
                }
            });
        }

    }

    //获取缓存方法
    qg.fnGetCacheSize = function () {
        api.getCacheSize(function (ret) {
            var size = parseInt(ret.size / 1024 / 1024 * 100) / 100 + ' MB';
            var cacheSize = $api.byId('cacheSize');
            cacheSize.innerHTML = size;
        });
    }

    //清除缓存方法
    qg.fnClearCache = function () {
        api.showProgress({
            title: '清除缓存中...',
        });

        api.clearCache(function () {
            setTimeout(function () {
                api.hideProgress();
                qg.fnGetCacheSize();
            }, 500)
        });
    }

    window.qg = qg;
})(window);