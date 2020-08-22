
import {fabric} from 'fabric'

// create a wrapper around native canvas element (with id="c")
var canvas = new fabric.Canvas('c');

// create a rectangle object
var rect = new fabric.Rect({
    left: 100,
    top: 100,
    fill: 'red',
    width: 50,
    height: 50,
    angle:0
});
var text = new fabric.Text('hello world', { left: 100, top: 100 ,  fontFamily: 'Comic Sans'});
rect.setGradient('fill', {
    x1: 0,
    y1: 0,
    x2: 0,
    y2: rect.height,
    colorStops: {
        0: '#000',
        1: '#fff'
    }
});
canvas.selection = true
rect.set('selectable', true);
rect.animate('angle', '2222', {
    from:1,
    duration:10000,
    onChange: canvas.renderAll.bind(canvas),
    easing: fabric.util.ease.easeOutBounce

});

// fabric.Image.fromURL('pug.jpg', function(img) {
//     img.filters.push(
//         new fabric.Image.filters.Sepia(),
//         new fabric.Image.filters.Brightness({ brightness: 100 }));
//
//     img.applyFilters();
//     canvas.add(img);
// });
// "add" rectangle onto canv
canvas.add(rect,text);
