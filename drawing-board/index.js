var lineObject = {
    canvas: $('.canvas'),
    context: $('.canvas').get(0).getContext('2d'),
    colorChange: $('.colorChange'),
    clearScreen: $('.clearScreen'),
    eraser: $('.eraser'),
    revoke: $('.revoke'),
    lineRange: $('.lineRange'),
    btnList: $('.btnList'),
    flag: true,
    arrImage: [],
    init: function () {
        this.draw();
        this.bindEvent();
    },
    draw: function () {
        var self = this,
            canvas = this.canvas;
        canvas.on('mousedown', function (e) {
            self.flag = true;
            self.context.lineCap = 'round';
            self.context.lineJoin = 'round';
            var sX = e.pageX - canvas.offset().left;
            var sY = e.pageY - canvas.offset().top;
            self.context.beginPath();
            self.context.moveTo(sX, sY);
            canvas.on('mousemove', function (e) {
                if (self.flag) {
                    self.context.lineTo(e.pageX - canvas.offset().left, e.pageY - canvas.offset().top);
                    self.context.stroke();
                }
            })
            canvas.on('mouseup', function () {
                self.context.closePath();
                self.flag = false;
            })
            canvas.on('mouseleave', function () {
                self.context.closePath();
                self.flag = false;
            })
            var imgData = self.context.getImageData(0, 0, self.canvas[0].width, self.canvas[0].height);
            self.arrImage.push(imgData);
            // console.log(self.arrImage);
        })

    },
    bindEvent: function () {
        var self = this;
        $('.btnList').on('click', function (e) {
            e = e || window.event;
            switch (e.target.className) {
                case 'clearScreen':
                    self.context.clearRect(0, 0, self.canvas[0].width, self.canvas[0].height);
                    break;
                case 'eraser':
                    self.context.strokeStyle = "#fff";
                    break;
                case 'revoke':
                    if (self.arrImage.length > 0) {
                        self.context.putImageData(self.arrImage.pop(), 0, 0);
                    }
                    break;
            }
        })
        this.colorChange.change(function () {
            self.context.strokeStyle = $(this).val();
            console.log($(this));
        }),
            this.lineRange.change(function () {
                self.context.lineWidth = $(this).val();
            })
    },

}
lineObject.init();