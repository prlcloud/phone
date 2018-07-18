//获取元素
var getElem = function(selector){
	return document.querySelector(selector);
}
var getAllElem = function(selector){
	return document.querySelectorAll(selector);
}
//获取元素样式
var getCls = function(element){
	return element.getAttribute('class');
}
var setCls = function(element,cls){
	return element.setAttribute('class',cls);
}
//为元素添加样式
var addCls = function(element , cls){
	var baseCls = getCls(element);
	if(baseCls.indexOf(cls) === -1){
		setCls(element,baseCls+' '+cls);
	}
}
//为元素删除样式
var delCls = function(element , cls){
	var baseCls = getCls(element);
	if(baseCls.indexOf(cls) != -1){
		setCls(element,baseCls.split(cls).join(' ').replace(/\s+/g,' '));
	}
}

//第一步：初始化样式 init
var screenAnimateElements = {
	'.screen-1' : [
		'.screen-1_heading',
		'.screen-1_phone',
		'.screen-1_shadow',
	],
	'.screen-2' : [
		'.screen-2_heading',
		'.screen-2_subheading',
		'.screen-2_phone',
		'.screen-2_point_i_1',
		'.screen-2_point_i_2',
		'.screen-2_point_i_3',
	],
	'.screen-3' : [
		'.screen-3_heading',
		'.screen-3_subheading',
		'.screen-3_phone',
		'.screen-3_features',
		'.screen-3_features_item',
	],
	'.screen-4' : [
		'.screen-4_heading',
		'.screen-4_subheading',
		'.screen-4_type_item_i_1',
		'.screen-4_type_item_i_2',
		'.screen-4_type_item_i_3',
		'.screen-4_type_item_i_4'
	],
	'.screen-5' : [
		'.screen-5_heading',
		'.screen-5_subheading',
		'.screen-5_bg',
	]
};
//设置屏内元素为初始状态
var setScreenAnimateInit = function(screenCls){
	var screen = document.querySelector(screenCls);
	var animateElements = screenAnimateElements[screenCls];
	for(var i=0;i<animateElements.length;i++){
		var element = document.querySelector(animateElements[i]);
		var baseCls = element.getAttribute('class');
		element.setAttribute('class',baseCls + ' ' +animateElements[i].substr(1) + '_animate_init');
	}
}
//设置播放屏的元素动画
var playScreenAnimateDone = function(screenCls){
	var screen = document.querySelector(screenCls);
	var animateElements = screenAnimateElements[screenCls];
	for(var i=0;i<animateElements.length;i++){
		var element = document.querySelector(animateElements[i]);
		var baseCls = element.getAttribute('class');
		element.setAttribute('class',baseCls.replace('_animate_init','_animate_done'));
	}
}
window.onload = function(){
	for(k in screenAnimateElements){
		if(k=='.screen-1'){
			continue;
		}
	setScreenAnimateInit(k);
	}
}

//第二步：滚动到哪就播放到哪里
var navItems = getAllElem('.header_nav_item');
var outlineItems = getAllElem('.outline_item');

var switchNavItemsActive = function( idx ){
	for(var i=0;i<navItems.length;i++){
		delCls(navItems[i],'header_nav_item_status_active');
	}
	addCls(navItems[idx],'header_nav_item_status_active');
	for(var i=0;i<outlineItems.length;i++){
		delCls(outlineItems[i],'outline_item_status_active');
	}
	addCls(outlineItems[idx],'outline_item_status_active');
}
window.onscroll = function(){
	 var top  = document.documentElement.scrollTop;
	if(top > 80){
		addCls( getElem('.header'),'header_status_back');
		addCls( getElem('.outline'),'outline_status_in');
	}else{
		delCls( getElem('.header'),'header_status_back');
		delCls( getElem('.outline'),'outline_status_in');

		switchNavItemsActive(0);
	}
	if(top > 1){
		playScreenAnimateDone('.screen-1');
	}
	if(top > 800*1 - 100){
		playScreenAnimateDone('.screen-2');

		switchNavItemsActive(1);
	}
	if(top > 800*2 - 100){
		playScreenAnimateDone('.screen-3');

		switchNavItemsActive(2);
	}
	if(top > 800*3 - 100){
		playScreenAnimateDone('.screen-4');

		switchNavItemsActive(3);
	}
	if(top > 800*4 - 100){
		playScreenAnimateDone('.screen-5');

		switchNavItemsActive(4);
	}
}
//第三步：双向定位

var setNavJump = function(i,lib){
	var item = lib[i];
	item.onclick = function(){
		document.documentElement.scrollTop = 800*i;
	}
}
for(var i=0;i<navItems.length;i++){
	setNavJump(i,navItems);
}
for(var i=0;i<outlineItems.length;i++){
	setNavJump(i,outlineItems);
}
//第四步：滑动门特效
var navTip = getElem('.header_nav_tip');
var setTip = function(idx,lib){
	lib[idx].onmouseover = function(){
		console.log(this,idx)
		navTip.style.left = (idx*70)+'px';
	}
	var activeIdx = 0;
	lib[idx].ommouseout = function(){
		console.log(this,idx);
		for(var i=0;i<lib.length;i++){
			if(getCls(lib[i]).indexOf('header_nav_item_status_active') > -1){
				activeIdx = i;
				break;
			}
		}
		navTip.style.left = (activeIdx*70)+'px';
	}
}
for(var i=0;i<navItems.length;i++){
	setTip(i,navItems);
}
setTimeout(function(){
	playScreenAnimateDone('.screen-1');},200);