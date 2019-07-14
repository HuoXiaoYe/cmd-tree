// 打印目录树

const path = require('path');
const fs = require('fs');
let target = path.join(__dirname, process.argv[2] || './')

function printDicTree(target,depth){
	let prefix = new Array(depth + 1).join('│ ');
	
	var dirArr = fs.readdirSync(target);
	// console.log(dirArr)
	let fileArrs = []; // 文件数组
	let dirArrs = []; // 文件夹数组
	dirArr.forEach((item)=>{
		var stats = fs.statSync(path.join(target,item))
		if(stats.isFile()) return fileArrs.push(item);
		dirArrs.push(item)
	})
	var count = fileArrs.length-1;
	fileArrs.forEach((item)=>{
		var temp = count-- ? '├' : '└';
		console.log(`${prefix}${temp}  ${item}`)
		
	})
	dirArrs.forEach((item)=>{
		console.log(`${prefix}├ ${item}`); // node_modules
		// 当前是一个目录 需要深入进去
		printDicTree(path.join(target, item), depth + 1);
	})
	
}
printDicTree(target,0)