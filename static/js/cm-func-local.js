/*
 * jQuery postMessage - v0.5 - 9/11/2009
 * http://benalman.com/projects/jquery-postmessage-plugin/
 * 
 * Copyright (c) 2009 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 */
(function($){
    var g,d,j=1,a,b=this,f=!1,h="postMessage",e="addEventListener",c,i=b[h]&&!$.browser.opera;
    $[h]=function(k,l,m){
        if(!l){
            return
        }
        k=typeof k==="string"?k:$.param(k);
        m=m||parent;
        if(i){
            m[h](k,l.replace(/([^:]+:\/\/[^\/]+).*/,"$1"))
        }else{
            if(l){
                m.location=l.replace(/#.*$/,"")+"#"+(+new Date)+(j++)+"&"+k
            }
        }
    };

    $.receiveMessage=c=function(l,m,k){
        if(i){
            if(l){
                a&&c();
                a=function(n){
                    if((typeof m==="string"&&n.origin!==m)||($.isFunction(m)&&m(n.origin)===f)){
                        return f
                    }
                    l(n)
                }
            }
            if(b[e]){
                b[l?e:"removeEventListener"]("message",a,f)
            }else{
                b[l?"attachEvent":"detachEvent"]("onmessage",a)
            }
        }else{
            g&&clearInterval(g);
            g=null;
            if(l){
                k=typeof m==="number"?m:typeof k==="number"?k:100;
                g=setInterval(function(){
                    var o=document.location.hash,n=/^#?\d+&/;
                    if(o!==d&&n.test(o)){
                        d=o;
                        l({
                            data:o.replace(n,"")
                        })
                    }
                },k)
            }
        }
    }
})(jQuery);

function CM_result(message_in_JSON){
    $.postMessage(
        (message_in_JSON),
        'http://localhost:8000',
        parent
        );
}



//Works for the first upload page
function setObjectPathValue(source, path, value) {
    var parts = path.split('.'), len = parts.length, target = source;

    for (var i = 0, part; i < len - 1; i++) {
        part = parts[i];
        target = target[part] == undefined ? (target[part] = {}) : target[part];
    }
    target[parts[len - 1]] = value;
    return target;
}

function collect_data(button){
    var CM_data=new Object();
    $(button).parents('form:first').find('.croco').each(function(){
        setObjectPathValue(CM_data,$(this).attr('name'),$(this).val());
    });
    return CM_data;
}
$(document).ready(function(){
    $('[type=submit]').click(function(){
        var linkLoc = $(this).attr("onclick");
        $(this).live('click', linkLoc);
        var metadata=collect_data(this);
        console.log(metadata);
        CM_result(JSON.stringify(metadata));
    // alert(metadata);
   
    });    
       
///
//}); 
});
