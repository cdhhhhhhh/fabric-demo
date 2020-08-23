import {fabric} from 'fabric'

// create a wrapper around native canvas element (with id="c")
let canvas = new fabric.Canvas('c');


let mockTable = [
    ['日期', '时间', '课程内容'],
    ['8月16号', '10:00-12:00', '1.课程内容课程内容课程内容课程内容课程内容课\n2.程程内容课程内容课程内容课程内容课\n3.程内容内容容课程内容课程内容课\n4.程内容课程内容课程内容课程内容课程内容课程内容课程内容课程内容'],
    ['8月16号', '10:00-12:00', '1.课程内容课程内容课程内容课程内容课程内容课\n2.程内容课程内容课程内容课程内容课程内容课程内容课程内容课程内容'],
    ['8月16号', '10:00-12:00', '1.课程内容课程内容课程内容课程内容课程内容课\n2.程内容课程内容课程内容课程内容课程内容课程内容课程内容课程内容\n1.课程内容课程内容课程内容课程内容课程内容课\n2.程内容课程内容课程内容课程内容课程内容课程内容课程内容课程内容\n1.课程内容课程内容课程内容课程内容课程内容课\n2.程内容课程内容课程内容课程内容课程内容课程内容课程内容课程内容\n1.课程内容课程内容课程内容课程内容课程内容课\n2.程内容课程内容课程内容课程内容课程内容课程内容课程内容课程内容'],
]
//表格信息
let tableInfo = []

function createText(text) {
    return new fabric.IText(text, {
        fontSize: 30,
        fontWeight: 400,
    });
}

function loadPosterText() {
    let title = new fabric.IText('标题', {fontSize: 30, fontWeight: 400,});
    let content = new fabric.IText('内容内容内容内容内容内容内容内容', {fontSize: 20, fontWeight: 400,});
    canvas.add(title, content)
}

//初始化
mockTable.forEach((row, i) => {
    tableInfo[i] = []
    row.forEach((col, j) => {
        mockTable[i][j] = createText(mockTable[i][j])
        //设置标头字体
        if (i === 0) {
            mockTable[i][j].set('fontSize', 40)
            mockTable[i][j].set('fontWeight', 700)
            mockTable[i][j].set('fill', 'rgb(178,86,49)')
        }
        tableInfo[i][j] = {
            width: 0,
            height: 0
        }
    })
})

//计算列最大宽度
function getWidth(x) {

    let maxWidth = mockTable[0][x].width;
    for (let i = 0; i < mockTable.length; i++) {
        maxWidth = Math.max(maxWidth, mockTable[i][x].width)
    }
    return maxWidth
}

//计算行最大高度
function getHeight(y) {
    let maxHeight = mockTable[y][0].height;
    for (let i = 0; i < mockTable[0].length; i++) {
        maxHeight = Math.max(maxHeight, mockTable[y][i].height)
    }
    return maxHeight
}

//计算单元格居中
function getCenter() {

}

//累加行列宽高计算坐标
function getPostion(x, y) {
    let x1 = 0;
    let y1 = 0;
    for (let i = 0; i < x; i++) {
        x1 += tableInfo[y][i].width
    }
    for (let j = 0; j < y; j++) {
        y1 += tableInfo[j][x].height
    }
    return [x1, y1]
}

async function init() {
    let list = []
    for (let i = 0; i < mockTable.length; i++) {
        for (let j = 0; j < mockTable[0].length; j++) {
            tableInfo[i][j].width = getWidth(j)
            tableInfo[i][j].height = getHeight(i)
            let [x, y] = getPostion(j, i)
            let rect = new fabric.Rect({
                left: x,
                top: y,
                //设置标头背景样式
                fill: i === 0 ? 'rgb(231,225,186)' : 'white',
                width: tableInfo[i][j].width,
                height: tableInfo[i][j].height,
                stroke: 'rgb(161,127,123)', strokeWidth: 2,
            })
            // 设置文字垂直居中
            mockTable[i][j].set('left', x + (tableInfo[i][j].width - mockTable[i][j].width) / 2)
            mockTable[i][j].set('top', y + (tableInfo[i][j].height - mockTable[i][j].height) / 2)
            list.push(rect)
            list.push(mockTable[i][j])
        }
    }
    let group = new fabric.Group(list, {
        left: 100,
        top: 100
    });
    await (new Promise((resolve) => {
        fabric.Image.fromURL('http://localhost:8080/public/poster.png', function (img) {
            // img.filters.push(
            //     new fabric.Image.filters.Sepia(),
            //     new fabric.Image.filters.Brightness({ brightness: 100 }));
            //
            // img.applyFilters();
            canvas.insertAt(img, 0);
            resolve()
        });
    }))

    canvas.selection = true
    loadPosterText()
    canvas.add(group);

}


(async () => {
    await init()
    let popDom = document.querySelector('#pop');
    let pushDom = document.querySelector('#push');
    let historyList = [JSON.stringify(canvas)];
    let tempHistoryList = [];
    canvas.on('mouse:up:before', function () {
        tempHistoryList = []
        historyList.push(JSON.stringify(canvas))
        console.log('记录历史');
    });
    popDom.addEventListener('click', () => {
        if (historyList.length === 1) {
            canvas.clear()
            canvas.loadFromJSON(JSON.parse(historyList[0])).renderAll()
            return
        }
        tempHistoryList.push(JSON.parse(historyList.pop()))
        let historyAction = historyList[historyList.length - 1];
        canvas.clear()
        canvas.loadFromJSON(JSON.parse(historyAction)).renderAll()
    })
    pushDom.addEventListener('click', () => {
        if (tempHistoryList.length === 0) {
            alert('无前进记录')
            return
        }
        let tempAction = JSON.stringify(tempHistoryList.pop());
        historyList.push(tempAction)
        canvas.clear()
        canvas.loadFromJSON(JSON.parse(tempAction)).renderAll()
    })
})()
//撤销前进功能

