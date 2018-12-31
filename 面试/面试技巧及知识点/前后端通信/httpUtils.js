function HttpUtils(){
    


}
HttpUtils.prototype.createScript = function(url,charset){
    var script = document.createElement('script');
    script.setAttribute('src',url);
    script.setAttribute('charset',charset);
    return script;
}
HttpUtils.prototype.jsonp = function(url,onsuccess,onerror,charset){
    var callback;
    try{
        callback = url.match(/(\&|\?)callback\=\w+(&?|$)/)[0].split(/=/)[1];
    }catch(e){
        throw 'url must contains callback query';
    }
    
    if(!callback){
        throw 'url must contains callback query';
    }

    window[callback] = function(){
        if(onsuccess&&onsuccess instanceof Function){
            onsuccess(arguments[0]);
        }
    }

    var script = HttpUtils.prototype.createScript.call();// 创建script标签
    script.onload = script.onreadystatechange = function(){
        if(!script.readystate || /loaded | complete/.test(script.readystate)){
            script.onload = script.onreadystatechange = null;
            if(script.parentNode){
                script.parentNode.removeChild(script);
            }
        }
        window[callback] = null; // 移除属性  
    }

    script.onerror = function(){
        if(onerror && onerror instanceof Function){
            onerror();
        }
    }

    document.getElementsByTagName('head')[0].appendChild(script);
}


HttpUtils.prototype.get = function(url){
    return new Promise((resolve,reject)=>{
        var xhr = XMLHttpRequest ? new XMLHttpRequest() : new window.ActiveXObject('Microsoft.XMLHttp');
        xhr.open(type,url,true);
        xhr.send();
        xhr.onreadystatechange = function(){
            //304 有缓存文件 206 请求了一部分
            if(xhr.readystate ===4 && (xhr.status === 200 || xhr.status === 304 || xhr.status === 206){
                resolve(xhr.responseText);
            }else{
                reject(xhr.statusText);
            }
        }
    })

}