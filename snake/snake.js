"use strict";
window.onload=function(){
	
	//获取盒子
	let box=document.querySelector("div.box");
	
	let btn=document.querySelector("button");
	
	let score=document.querySelector('div.score').innerHTML;
	
	//创建游戏场景，创建小的div格子，并给每一个格子添加id
	for(let i=0;i<20;i++){
		for(let j=0;j<20;j++){
			let sdiv=document.createElement("div");//创建小的div格子
			let idname='c'+j+'-'+i;//定义一个变量用于保存id名
			sdiv.id=idname;//给小格子添加id名
			box.appendChild(sdiv);//将创建的小格子添加到大盒子中
		}
	}
	
	//如何表示初始的蛇（数组加对象）
	let she=[
		{x:0,y:0},//与id名对应
		{x:1,y:0},
		{x:2,y:0}
	]
	she.forEach(function(value){
		let x=value.x;//获取数组中每个对象的x,y
		let y=value.y;
		let idnm='c'+x+'-'+y;//生成id名
		
		let s=box.querySelector('#'+idnm);//在大盒子中找到与id名符合的div
		s.className='she';//给该元素添加类名
//		box.querySelector('#'+idnm).className='she';

	})
	
	//如何表示食物

	    //检查食物是否合适
	    let {random:ran,floor:fl}=Math;//解构
	    let food=getFood();//赋值，让函数运行，不能跟上一句调换，否则会出错,需要得到一个对象，最终的赋值形式应为（food={x:3,y:4}）
	    
	    function getFood(){
	    	let fx;
			let fy;
			
			do{
				//随机获取食物的坐标
		 		fx=fl(ran()*20);
				fy=fl(ran()*20);
				
			 }while(check(fx,fy,she))//检查食物的坐标与蛇的身体是否重合，重合时继续产生随机坐标
			 
			//生成id名，找到相符合的div格子，添加类名
			let fidnm='c'+fx+'-'+fy;
			let fs=box.querySelector('#'+fidnm);
			fs.className='food';
			return {fx,fy};//！！！返回一个对象，变量名作为属性名，变量值作为属性值，这样才能保证food的值是一个对象（food={x:3,y:4}）
	    }
	   
	   //检查获取到的食物的坐标是否在蛇的身上
		function check(a,b,arr){
			return arr.some(function(value){//此句的return是check的返回值
				return value.x==a&&value.y==b;//此句的返回值是arr.some回调函数的返回值，并不是外层函数check的返回值
			})
		}
	    
	    //动画
	    let way='right';//定义一个变量用于存放运动方式，不能放在move中定义，因为如果在move中定义，move函数会需要传参数，但是在setInterval中，move后不能加括号
	    //可以通过键盘的按下事件来改变way的值
	    
	    
	    function move(){
	    	//获取旧的蛇头的坐标{数组中最后一个元素是旧的蛇头}，注意，其下标是数组长度-1
	    	let oldhead=she[she.length-1];
			let newhead;//定义一个变量用于保存新的蛇头对象
			switch(way){//判断运动的方向
				case 'right':
					newhead={x:she[she.length-1].x+1,y:she[she.length-1].y};//通过旧的蛇头的坐标来给新的蛇头的坐标赋值，将旧的蛇头坐标+1，成为新蛇头
					break;
				case 'left':
					newhead={x:she[she.length-1].x-1,y:she[she.length-1].y};
					break;
				case 'top':
					newhead={x:she[she.length-1].x,y:she[she.length-1].y-1};
					break;
				case 'bottom':
					newhead={x:she[she.length-1].x,y:she[she.length-1].y+1};
					break;
			}
		
	    	
	    	//找到新蛇头对应的div
	    	
	    	let newt=box.querySelector('#c'+newhead.x+'-'+newhead.y);
	    	
			//（判断是否撞墙或者是否吃到自己），吃到自己的判断用新蛇头和蛇身来判断
	    	if(newt==null||check(newhead.x,newhead.y,she)){
	    		alert("GAME OVER");
	    		clearInterval(t);//清除事件进程函数
	    		return;//停止函数的运行（如果不写该句，还会继续执行下面加类名的那句，会报错）
	    	}
	    	
	    	
	    	newt.className='she';//给新蛇头添加类名
	    	
	    	//将新蛇头添加到she的数组中
	    	she.push(newhead);
	    	
	    	
	    	if(newhead.x==food.fx&&newhead.y==food.fy){//碰到食物时只加头，不去尾
	    				document.querySelector('div.score').innerHTML=parseInt(document.querySelector('div.score').innerHTML)+10;
	    		food=getFood();//重新给food赋值，获取到新的食物
	    	}else{
	    		//去尾
		    	box.querySelector('#c'+she[0].x+'-'+she[0].y).classList.remove('she');//给旧的蛇尾去掉类名
		    	she.shift();//从数组中移除旧的蛇尾
	    	}
	    	
	    	
	    	
	    }
	    
	    
	    
	    let t=setInterval(move,200);//设置时间函数

		//添加键盘事件，获取到按下的是哪个方向键
		document.onkeydown=function(e){
			let code=e.keyCode;
			switch(code){
				case 37:
					if(way=='right'){
						return;
					}
					way='left';break;
				case 38:
					if(way=='bottom'){
						return;
					}
					way='top';break;
				case 39:
					if(way=='left'){
						return;
					}
					way='right';break;
				case 40:
					if(way=='top'){
						return;
					}
					way='bottom';break;
			}
		}

	
		btn.onclick=function(){
			location.reload();
		}

	
	
	
	
	
	
	
}//window的括号
