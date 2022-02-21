// 防抖，高频触发，n秒只执行一次，如果在n秒内重新触发，则重新计时

// 思路
// 1、因为要频繁调用，还要保持内部的定时器，所以需要用闭包的形式保存定时器
// 2、因为要调用，所以它应该要返回一个函数

function de(fn) {
    let timer = null;
    return function () {
        let args = arguments;
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(function () {
            console.log(this);
            // fn(...args);
            fn.apply(this, args);
        }, 1000);
    }
}

function handle() {
    console.log('防抖 + 节流');
}

// const a = de(handle);
// a(1, 2,3);

// setTimeout(() => {
//     a(4, 5, 6);  
// }, 3000);


// 节流
// 思路
// 1、因为要频繁调用，还要保持内部的定时器，所以需要用闭包的形式保存定时器
// 2、因为要调用，所以它应该要返回一个函数
// 3、我们保证在n秒内必须执行一次，n秒内触发，不执行

// function te(fn) {
//     let pre = new Date();
//     return function () {
//         const now = new Date();
//         if (now - pre > 1000) {
//             fn(...arguments);
//             pre = now;
//         }
//     }
// }

function te(fn, runnow) {
    let timer = null;
    let runnowt = runnow;
    return function () {
        if (runnowt) {
            fn(...arguments)
            runnowt = false
        } else {
            if (!timer) {
                timer = setTimeout(() => {
                    fn(...arguments);
                    timer = null;
                }, 1000);
            } else {
                console.log('节流');
            }
        }
    }
}

const b = te(handle, true);
b();
b();
b();
// setTimeout(() => {
//     b();
// }, 3000);
// setTimeout(() => {
//     b();
// }, 3500);

// setTimeout(() => {
//     b();
// }, 4500);


// // 节流throttle代码（时间戳+定时器）：
// var throttle = function(func, delay, runnow) {     
//     var timer = null;     
//     var startTime = Date.now();     
//     return function() {             
//         var curTime = Date.now();             
//         var remaining = delay - (curTime - startTime);
//         console.log(remaining);             
//         var context = this;             
//         var args = arguments;             
//         clearTimeout(timer);              
//         if (remaining <= 0) {                    
//             func.apply(context, args);                    
//             startTime = Date.now();              
//         } else {                    
//             timer = setTimeout(func, remaining);              
//         }      
//     }
// }
// function handle() {      
//     console.log(Math.random());
// } 

// const c = throttle(handle, 5000, true);
// c();