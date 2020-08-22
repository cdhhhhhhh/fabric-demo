import {fabric} from 'fabric'

// create a wrapper around native canvas element (with id="c")
let canvas = new fabric.Canvas('c');


let mockTable = [
    ['日期', '时间', '课程内容'],
    ['8月16号', '10:00-12:00', '1.课程内容课程内容课程内容课程内容课程内容课\n2.程程内容课程内容课程内容课程内容课\n3.程内容内容容课程内容课程内容课\n4.程内容课程内容课程内容课程内容课程内容课程内容课程内容课程内容'],
    ['8月16号', '10:00-12:00', '1.课程内容课程内容课程内容课程内容课程内容课\n2.程内容课程内容课程内容课程内容课程内容课程内容课程内容课程内容']
]

function createText(text) {
    return new fabric.IText(text, {
        fontSize: 30,
        fontWeight: 400,
    });
}

//初始化
mockTable.forEach((row, i) => {
    row.forEach((col, j) => {
        mockTable[i][j] = createText(mockTable[i][j])
        //设置标头字体
        if (i === 0) {
            mockTable[i][j].set('fontSize', 40)
            mockTable[i][j].set('fontWeight', 700)
            mockTable[i][j].set('fill', 'rgb(178,86,49)')
        }
    })
})

//计算列最大宽度
function getWidth(y) {
    let maxWidth = 0;
    for (let i = 0; i < mockTable.length; i++) {
        maxWidth = Math.max(maxWidth, mockTable[i][y].width)
    }
    return maxWidth
}

//计算行最大高度
function getHeight(x) {
    let maxHeight = 0;
    for (let i = 0; i < mockTable[0].length; i++) {
        maxHeight = Math.max(maxHeight, mockTable[x][i].height)
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
        x1 += mockTable[x][i].width
    }
    for (let j = 0; j < y; j++) {
        y1 += mockTable[j][y].height
    }
    return [x1, y1]
}

let list = []
for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
        let [x, y] = getPostion(i, j)
        let rect = new fabric.Rect({
            left: x,
            top: y,
            //设置标头背景样式
            fill: j === 0 ? 'rgb(231,225,186)' : 'white',
            width: getWidth(i),
            height: getHeight(j),
            stroke: 'rgb(161,127,123)', strokeWidth: 2,
        })
        //+ (getWidth(i) - mockTable[j][i].width) / 2
        mockTable[j][i].set('left', x + (getWidth(i) - mockTable[j][i].width) / 2)
        mockTable[j][i].set('top', y + (getHeight(j) - mockTable[j][i].height) / 2)
        list.push(rect)
        list.push(mockTable[j][i])
    }
}
let group = new fabric.Group(list, {
    left: 100,
    top: 100
});

canvas.selection = true
group.set('selectable', true);
canvas.add(group);
