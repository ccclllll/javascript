
const gen = function* (){
    yield readFile();
    yield getData();
}
const readFile = function(){
    return new Promise((resolve,reject)=>{
        setTimeout(resolve('read file end'),2000);
    })
}
const getData = function(){
    return new Promise((resolve,reject)=>{
        setTimeout(resolve('get data end'),2000);
    })
}

function run(g){
    const it = g();
    function go(re){
        if(re.done) return it.value;
        re.value.then(va=>{
            console.log(va)
            return go(it.next());
        }).catch(e=>{
            console.log(e);
        })
    }
    go(it.next());
}
run(gen);


//let it = gen();
//it.next().value.then(v=>console.log(v))
//it.next().value.then(v=>console.log(v))
//gen().next().value.then(v=>console.log(v))
async function asyTest(){

    let v = await readFile();
    console.log(`${v}`)
    let a = await getData();
    console.log(a)
}
asyTest()

// @serveice
// class FileService{

// }
// console.log(FileServce.isService)
function arsT(){
    const args = Array.from(arguments);
    console.log(args);
}
arsT(1,2,3,5,6)