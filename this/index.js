let p = {
    i: 1,
    a: function () {
        // 普通函数，指向调用方，就是 p 自己了
        console.log(this);
        var obj = {
            i: 10,
            b: () => { 
                // 箭头函数，指向外层 p 的 this
                console.log(this.i)
            },
            c: function () {
                // 普通函数，指向调用方，也是是 obj 自己
                console.log(this.i)
            }
        }
        obj.b() // 1
        obj.c() // 10
    }
}
p.a()


function Person() {
    this.name = 'xiao';
    setTimeout(function(){
        console.log(this);
    }, 10);
}

// setTimeout(() => {
//     console.log(this);
// }, 1000);

const p1 = new Person();


/**
 * 总结：
 * 1、普通函数，指向调用方
 * 2、构造函数，指向新创建的对象
 * 3、setTimeout，指向全局对象
 * 4、箭头函数，指向外层函数的 this (优先级最高，比如 setTimeout中 function 内部的 this 指向全局对象， 但是箭头函数内部的 this 指向外层函数的 this)
 */
