function HttpUtils() {



}

/**
 * jsonp
 */
HttpUtils.prototype.createScript = function (url, charset) {
    var script = document.createElement('script');
    script.setAttribute('src', url);
    script.setAttribute('charset', charset);
    return script;
}
HttpUtils.prototype.jsonp = function (url, onsuccess, onerror, charset) {
    var callback;
    try {
        callback = url.match(/(\&|\?)callback\=\w+(&?|$)/)[0].split(/=/)[1];
    } catch (e) {
        throw 'url must contains callback query';
    }

    if (!callback) {
        throw 'url must contains callback query';
    }

    window[callback] = function () {
        if (onsuccess && onsuccess instanceof Function) {
            onsuccess(arguments[0]);
        }
    }

    var script = HttpUtils.prototype.createScript.call(); // 创建script标签
    script.onload = script.onreadystatechange = function () {
        if (!script.readystate || /loaded | complete/.test(script.readystate)) {
            script.onload = script.onreadystatechange = null;
            if (script.parentNode) {
                script.parentNode.removeChild(script);
            }
        }
        window[callback] = null; // 移除属性  
    }

    script.onerror = function () {
        if (onerror && onerror instanceof Function) {
            onerror();
        }
    }

    document.getElementsByTagName('head')[0].appendChild(script);
}


/**
 * ajax + Promise ajax不能跨域通讯
 */
HttpUtils.prototype.get = function (url) {
    return new Promise((resolve, reject) => {
        var xhr = XMLHttpRequest ? new XMLHttpRequest() : new window.ActiveXObject('Microsoft.XMLHttp');

        xhr.open('get', url, true);

        xhr.send();
        // xhr.setRequestHeader('Content-Type','application/json')
        // xhr.onreadystatechange = function () {
        //     //304 有缓存文件 206 请求了一部分

        //     if (xhr.readyState === 4 && (xhr.status === 200 || xhr.status === 304 || xhr.status === 206)) {
        //             console.log(xhr.responseText)
        //             resolve(xhr.responseText);
        //         } else {
        //             reject(xhr.statusText);
        //         }
        //     }
        xhr.onload = function () {
            if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
                resolve(xhr.responseText)
            }
        }

    });




}

/**
 *postMessage() h5 新增
 *
 */
function sendMessaage() {
    var frame = document.getElementsByTagName('iframe').item(0);
    window.postMessage({
        data: 'my post messageData'
    }, 'http://b.com');


    // 接收
    window.addEventListener('message', function (e) {
        console.log(event.data)
    });
}

/**
 * url # 后面的内容就是hash
 *
 * @param {*} data
 */
function hash(data) {
    var frame = document.getElementsByTagName('iframe').item(0);

    frame.src = frame.src + '#' + data;


    // 接收
    window.addEventListener('hashchange', function () {
        this.console.log(location.hash)
    })
}

/**
 * use fetch 跨域通讯
 * 常见content-tye
 * 1. application/x-www-form-urlencoded 原生form表单数据
 * 2. multipart/form-data  文件
 * 3. application/json 
 * 4. text/xml 
 * JSON.parse() // 字符串转json
 * JSON.stringify() // json转字符串
 * 
 * @param {*} url
 */
function cors(url) {
    fetch(url, {
        method: "POST",
        mode: "no-cors",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: "请求参数"
    }).then(function (res) {
        console.log("Response succeeded?", JSON.stringify(res.ok));
        console.log(JSON.stringify(res));
    }).catch(function (e) {
        console.log("fetch fail", JSON.stringify(params));
    });
}



function sockt() {
    // 初始化一个 WebSocket 对象
    var ws = new WebSocket("ws://localhost:8888").addEventListener('open', function () {
        ws.send("发送数据");
        alert("数据发送中...");
    });



    // 接收服务端数据时触发事件
    ws.onmessage = function (evt) {
        var received_msg = evt.data;
        alert("数据已接收...");
    };

    // 断开 web socket 连接成功触发事件
    ws.onclose = function () {
        alert("连接已关闭...");
    };

}

sockt()