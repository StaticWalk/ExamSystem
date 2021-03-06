/**
 * Created by luqingying on 2017/11/9.
 */
window.onload=function(){
    var time=document.getElementsByTagName('time')[0];
    var timeIcon=document.getElementsByClassName('timeIcon')[0];
    var collect=document.getElementsByClassName('collect')[0];
    var share=document.getElementsByClassName('share')[0];
    var collectForm=document.forms["collectform"];
    var collectLabelInput=document.getElementById('collectLabel');
    var arrLabelSpan=document.getElementsByClassName('labelSpan');
    var closeBtn=document.getElementsByClassName('closeBtn')[0];
    var cancelBtn=document.getElementsByClassName('cancelBtn')[0];
    var collectBtn=document.getElementsByClassName('collectBtn')[0];
    var shareBtn=document.getElementsByClassName('shareBtn')[0];
    var aheadBtn=document.getElementsByClassName('aheadBtn')[0];
    var sheetToggle=document.getElementsByClassName('sheetToggle')[0];
    var toggleIcon=document.getElementsByClassName('toggleIcon')[0];
    var practiceForm=document.forms["practice-form"];
    var strCollectInputValue='';
    var arrCollectInputValue=[];
    var arrLabelSpanValue=[];

    //fullscreen 全屏
    var viewFullScreen = document.getElementsByTagName("body")[0];
    if (viewFullScreen) {
        viewFullScreen.addEventListener("click", function () {
            var docElm = document.documentElement;
            if (docElm.requestFullscreen) {
                docElm.requestFullscreen();
            }
            else if (docElm.msRequestFullscreen) {
                docElm = document.body; //overwrite the element (for IE)
                docElm.msRequestFullscreen();
            }
            else if (docElm.mozRequestFullScreen) {
                docElm.mozRequestFullScreen();
            }
            else if (docElm.webkitRequestFullScreen) {
                docElm.webkitRequestFullScreen();
            }
        }, false);
    }

    var cancelFullScreen = document.getElementById("cancel-fullscreen");
    if (cancelFullScreen) {
        cancelFullScreen.addEventListener("click", function () {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
            else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
            else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            }
            else if (document.webkitCancelFullScreen) {
                document.webkitCancelFullScreen();
            }
        }, false);
    }

    var fullscreenState = document.getElementById("fullscreen-state");
    if (fullscreenState) {
        document.addEventListener("fullscreenchange", function () {
            fullscreenState.innerHTML = (document.fullscreenElement)? "" : "not ";
        }, false);

        document.addEventListener("msfullscreenchange", function () {
            fullscreenState.innerHTML = (document.msFullscreenElement)? "" : "not ";
        }, false);

        document.addEventListener("mozfullscreenchange", function () {
            fullscreenState.innerHTML = (document.mozFullScreen)? "" : "not ";
        }, false);

        document.addEventListener("webkitfullscreenchange", function () {
            fullscreenState.innerHTML = (document.webkitIsFullScreen)? "" : "not ";
        }, false);
    }
//end of fullscreen



    //跨浏览器的事件处理程序
    var EventUtil={
        addHandler:function(element,type,handler) {
            if (element.addEventListener) {
                element.addEventListener(type, handler, false);
            } else if (element.attachEvent) {
                element.attachEvent("on" + type, handler);
            } else {
                element["on" + type] = handler;
            }
        },
        removeHandler:function(element,type,handler){
            if(element.removeEventListener){
                element.removeEventListener(type,handler,false);
            }else if(element.detachEvent){
                element.detach("on"+type,handler);
            }else{
                element['on'+type]=null;
            }

        }
    };
    //通用函数



    function hasClass(elem, cls) {
        cls = cls || '';
        if (cls.replace(/\s/g, '').length == 0) return false; //当cls没有参数时，返回false
        return new RegExp(' ' + cls + ' ').test(' ' + elem.className + ' ');
    }

    function addClass(elem, cls) {
        if (!hasClass(elem, cls)) {
            elem.className = elem.className == '' ? cls : elem.className + ' ' + cls;
        }
    }

    function removeClass(elem, cls) {
        if (hasClass(elem, cls)) {
            var newClass = ' ' + elem.className.replace(/[\t\r\n]/g, '') + ' ';
            while (newClass.indexOf(' ' + cls + ' ') >= 0) {
                newClass = newClass.replace(' ' + cls + ' ', ' ');
            }
            elem.className = newClass.replace(/^\s+|\s+$/g, '');
        }
    }

    Array.prototype.removeByValue=function(val){
        for(var i=0;i<this.length;i++){
            if(this[i]===val){
                this.splice(i,1);
                return this;
            }
        }
    };

    //页面加载时，开始反向计时
    var mysetInterval=setInterval(timer, 1000);
    function timer(){
        var now = new Date();
        var SetEnd = new Date();//设置结束考试时间
        SetEnd.setHours(23,00, 00);//时，分，秒
        var leftTime=SetEnd.getTime()-now.getTime();
        var leftsecond = parseInt(leftTime/1000);
        var h=Math.floor(leftsecond/3600);
        var m=Math.floor((leftsecond-h*3600)/60);
        var s=Math.floor(leftsecond-h*3600-m*60);
        if((h==0)&(m<10))
        {
            time.style.color="red";
        }
        time.innerHTML=checkTime(h)+':'+checkTime(m)+':'+checkTime(s);
    }

    function checkTime(i){ //将0-9的数字前面加上0，例1变为01
        return  i<10 ? "0"+i:i;
    }

    EventUtil.addHandler(timeIcon,"click",timeIconClick);
    function timeIconClick(){
        if(hasClass(this,'fa-pause-circle')){
            removeClass(this,'fa-pause-circle');
            addClass(this,'fa-play-circle');
            clearInterval(mysetInterval);
        }else{
            removeClass(this,'fa-play-circle');
            addClass(this,'fa-pause-circle');
            setInterval(timer, 1000);
        }
    }

    //监控所有的关闭，取消按钮被点击时，输入框文字消失
    EventUtil.addHandler(closeBtn,"click",clearForm);
    EventUtil.addHandler(cancelBtn,"click",clearForm);
    function clearForm(){
        for(var i=0;i<collectForm.elements.length;i++){
            if(collectForm.elements[i].type==='text'){
                collectForm.elements[i].value='';
            }
        }
    }

    //collectInputKeyUp 监测keyup，使输入标签下方有时，自动变为选中状态
    EventUtil.addHandler(collectLabelInput,"keyup",collectInputKeyUp);
    function collectInputKeyUp(){
        strCollectInputValue=this.value;
        arrCollectInputValue=strCollectInputValue.trim().split(' ');
        var arrLabel=[];
        var labelSpanSelected;
        for(var i=0;i<arrLabelSpan.length;i++){
            if(hasClass(arrLabelSpan[i],'labelSelected')){
                removeClass(arrLabelSpan[i],'labelSelected');
            }
        }
        arrCollectInputValue.forEach(function(item,index,array){
            for(var i=0;i<arrLabelSpan.length;i++){
                if(arrLabelSpan[i].innerHTML===item){
                    // labelSpanSelected=arrLabelSpan[i];
                    arrLabel.push(arrLabelSpan[i]);
                }else{
                    arrLabel.removeByValue(arrLabelSpan[i]);
                }
            }
            for(var i=0;i<arrLabel.length;i++){
                addClass(arrLabel[i],'labelSelected');
            }
        });

    }
    //选择已有标签、鼠标移入、移出
    for(var i=0;i<arrLabelSpan.length;i++){
        EventUtil.addHandler(arrLabelSpan[i],"click",labelSelect);
        EventUtil.addHandler(arrLabelSpan[i],"mouseover",labelMouseOver);
        EventUtil.addHandler(arrLabelSpan[i],"mouseout",labelMouseOut)
    }
    function labelSelect(){
        if(!hasClass(this,'labelSelected')){
            collectLabelInput.value+=this.innerHTML+' ';
            addClass(this,'labelSelected');
        }else{
            var span=this;
            strCollectInputValue=collectLabelInput.value;
            arrCollectInputValue=strCollectInputValue.trim().split(' ');
            collectLabelInput.value='';
            arrCollectInputValue.forEach(
                function(item,index,array){
                    if(item!==span.innerHTML){
                        collectLabelInput.value+=item+' ';
                    }
                }
            );
            removeClass(span,'labelSelected');
        }

    }
    function labelMouseOver(){
        if(!hasClass(this,'labelSelected')){
            addClass(this,'labelHover');
        }
    }
    function labelMouseOut(){
        if(hasClass(this,'labelHover')){
            removeClass(this,'labelHover');
        }
    }

// 点击提前交卷的确定按钮后，提交表单
    aheadBtn.onclick=function(){
        $('.aheadModal').modal('hide');
        practiceForm.submit();
    };
//  点击收起答题卡
    sheetToggle.onclick=function(){
        if(hasClass(toggleIcon,"fa-chevron-down")){
            removeClass(toggleIcon,"fa-chevron-down");
            addClass(toggleIcon,"fa-chevron-up");
        }else{
            removeClass(toggleIcon,"fa-chevron-up");
            addClass(toggleIcon,"fa-chevron-down");
        }

    }
};