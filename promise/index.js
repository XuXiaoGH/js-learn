
/**
 * promise 执行顺序，遵循宏任务和微任务的规则
 * 
 * 1. 宏任务：script(整体代码)、setTimeout、setInterval、setImmediate(Node.js 环境)、UI事件、I/O（Node.js
 * 2. 微任务：Promise、MutaionObserver、process.nextTick（Node.js）、setTimeout(0)、setImmediate(0)
 * 
 * 执行顺序：
 * 1、优先执行宏任务，碰到 setTimeout(0) 就会被插入到微任务队列中，等待执行，执行当前宏任务完毕后，再执行微任务队列中的任务
 * 2、执行宏任务完毕后，再执行微任务队列中的任务
 * 3、开启执行下一个宏任务，一路循环下去
 * 
 * 注意：
 * resovle后面的代码会先执行，然后再执行外部的then代码
 */

// console.log('script start')

// async function async1() {
//     await async2()
//     console.log('async1 end')
// }
// async function async2() {
//     console.log('async2 end')
// }
// async1()

// setTimeout(function () {
//     console.log('setTimeout')
// }, 0)

// new Promise(resolve => {
//     console.log('Promise')
//     resolve()
// })
//     .then(function () {
//         console.log('promise1')
//     })
//     .then(function () {
//         console.log('promise2')
//     })

// console.log('script end')



/**
 * script start
 * async2 end
 * Promise
 * script end
 * async1 end
 * promise1
 * promise2
 * setTimeout
 */


const p1 = () => (new Promise((resolve, reject) => {
    console.log(1);
    let p2 = new Promise((resolve, reject) => {
        console.log(2);
        const timeOut1 = setTimeout(() => {
            console.log(3);
            resolve(4);
        }, 0)
        resolve(5);
    });
    resolve(6);
    p2.then((arg) => {
        console.log(arg);
    });

}));
const timeOut2 = setTimeout(() => {
    console.log(8);
    const p3 = new Promise((resolve, reject) => {
        resolve(9);
    }).then(res => {
        console.log(res)
    }).catch(e => {
        console.log('catch');
        console.log(e);
    })
}, 0)


p1().then((arg) => {
    console.log(arg);
});
console.log(10);

/**
 * 1
 * 2
 * 10
 * 5
 * 6
 * 8
 * 9
 * 3
 * 
 * 解析：
 * 1、先执行到 timeout2，创建一个宏任务1
 * 2、再执行到p1，内部promise立即执行，打印 1，p2也立即执行，打印 2
 * 3、执行到 timeout1，创建一个宏任务2
 * 4、执行到 p2.then 创建一个微任务1
 * 5、执行到 p1.then 创建一个微任务2
 * 6、执行到 打印 10
 * 7、当前宏任务执行完毕，开始寻找微任务
 * 8、执行微任务1，p2.then 打印 5
 * 9、执行微任务2，p1.then 打印 6
 * 10、微任务池已经空了，开始寻找下一个宏任务
 * 11、执行宏任务1，打印 8，后面无执行了，开始执行微任务，打印9
 * 12、再执行宏任务2，打印 3，后面无执行了
 *  
 */