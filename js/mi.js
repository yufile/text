
/*创建一个function move函数 包装
    有两个参数
    Id:传进来调用div 的id
    speed:移动速度
    mm:表示移动的长度
    Style:用来保存样式 字符串 动画样式
    callback:回调函数 在程序运行结束之后执行
     */
//可以将这些函数封装到js代码中
function move(Id,speed,mm,Style,callback){

    //在下一个定时器开启之前把上一个定时器关闭
    clearInterval(Id.timer);
    //current当前左边距大小
    var current = parseInt(getStyle(Id, Style));

    /*判断当前left 从0-800(向右移动) 还是从800-0(向左移动)

    */
    // current 是否大于当前mm的值
    if(current > mm){
        //此时速度为负
        speed = -speed;
    }
    //向Id中添加一个timer 让两个div自己保存自己的定时器
    Id.timer = setInterval(function (){
        //获取当前边距大小
        var oldPixel = parseInt(getStyle(Id, Style));
        var newPixel = oldPixel + speed;
        //做一个判断如果newPixel值符合条件就重新给他赋值
        //当向左移动时 newPixel < mm && speed<0 当speed等于负数时向左移动
        //当向右移动时 newPixel > mm && speed>0 当speed等于正数时向右移动
        if((newPixel < mm && speed<0)||(newPixel > mm && speed>0)){
            newPixel = mm;
        }
        //将新的参数给style
        Id.style[Style] = newPixel +"px";
        //做一个判断如果newPixel值小于0px就重新给他赋值

        //当newPixel的值等于0时关闭定时器
        if(newPixel == mm){
            clearInterval(Id.timer);
            //回调函数 如果调用函数中传参数了就调用 如果没有 就不调用
            callback && callback();
        }
    },30);

}

function getStyle(styleId,name){
    /*getComputedStyle() 传递两个参数 一个是想要获取css样式的id 另一个是伪元素或null返回值是个对象
   谁生效返回谁
   返回当前值name边距大小*/
    return getComputedStyle(styleId,null)[name];//[name] 获取传进来的参数
}

/*
      可以封装一个函数用来单独调用className
      参数：
      obj：传送所需要修改内容的id
      name：传送需要修改的class的类名
      添加一个类
       */
function addClass(obj,name){
    //调用hasClass()这个函数来判断是否存在这个类名 如果没有添加 如果有就不添加
    if(!hasClass(obj,name)){
        obj.className += " " + name;
    }

}

//创建一个函数判断是否有这个类名 如果有就不在添加
function hasClass(obj,name){
    /*
    使用正则表达式来判断是否存类名
    /\bb2\b/\b 在正则表达式中代表边界值
    判断name中是否有 这个类名
     */
    var reg = new RegExp("\\b"+name+"\\b");
    //返回 这个布尔值
    return reg.test(obj.className);

}
//设置一个删除类名  的函数
function  removeClass(obj,name){
    var reg = new RegExp("\\b "+name+"\\b");
    //将正则表达式中传进来的参书替换成空串
    obj.className = obj.className.replace(reg,"");
}
//创建一个切换函数 如果有这个类名就删除 如果没有就添加
function  toggleClass(obj,name){
    if(hasClass(obj,name)){
        //如果有这个类名就删除
        removeClass(obj,name);
    }else {
        //如果没有就添加
        addClass(obj,name);
    }
}

//鼠标移动div显示和隐藏
function show(obj,divId){
    obj.onmousemove = function (){
        divId.style.display = "block";
    };
    obj.onmouseout = function (){
        divId.style.display = "none";
    };
}
