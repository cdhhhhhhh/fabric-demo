import {fabric} from 'fabric'

// create a wrapper around native canvas element (with id="c")
let canvas = new fabric.Canvas('c');
let size = 50;

let list = []
for (let i = 1; i <=3; i++) {
    for (let j = 1; j <= 3; j++) {
        let rect = new fabric.Rect({
            left: 100 + i * size,
            top: 100 + j * size,
            fill: 'white',
            width: size,
            height: size,
            stroke: 'black', strokeWidth: 1,
        })
        list.push(rect)
    }
}
let group = new fabric.Group(list,{
    left:100,
    top:100
});
var text = new fabric.Text('hello world', { left: 100, top: 100 ,  fontFamily: 'Comic Sans'});

canvas.selection = true
group.set('selectable', true);
canvas.add(group,text);
