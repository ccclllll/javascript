/**
 * element:id选择器或者节点 eg:#editor
 * options: 配置选项
 */
function ImageEditor(element, options) {
  if (!element) {
    throw 'element required'
  }
  if (typeof element === 'string') {
    if (element.startsWith('#')) {
      this.rootElement = document.querySelector(element);
    }
  }
  if (element instanceof Node) {
    this.rootElement = element;
  }
  if (!this.rootElement) {
    throw 'element not found';
  }

  this.eImages = [];
  this.currentEImage = null;
  this.imgList = [];
  this.modes = {
    'point_mode': new PointMode(this),
    'circle_mode': new CircleMode(this),
    'line_mode': new LineMode(this),
    'rect_mode': new RectMode(this)
  };


  if (!ImageEditor.prototype.create) {

    ImageEditor.getStyle = function (element, property) {
      if (element.currentStyle) {
        //IE
        return this.imageListContainer.currentStyle["width"];
      } else {
        //火狐谷歌
        return window.getComputedStyle(element, null)[property];
      }
    }
    ImageEditor.elementPosition = function (e) {
      var x = e.offsetLeft;
      var y = e.offsetTop;
      if (e.offsetParent !== null) {
        x += this.elementPosition(e.offsetParent).x;
        y += this.elementPosition(e.offsetParent).y
      }
      return {
        x,
        y
      };
    }

    ImageEditor.prototype.operateMap = {
      '点': () => this.changeMode(this.modes['point_mode']),
      '线': () => this.changeMode(this.modes['line_mode']),
      '圆': () => this.changeMode(this.modes['circle_mode']),
      '矩形': () => this.changeMode(this.modes['rect_mode']),
      '重绘': () => this.clear(),
      '回退': () => this.goBack()
    }

    ImageEditor.prototype.menus = [{
      'title': '回退',
      'name': 'goBack'
    }, {
      'title': '新增',
      'name': 'addImage'
    }, {
      'title': '重绘',
      'name': 'clear'
    }];

    // 初始化
    ImageEditor.prototype.create = function () {

      // 创建dom
      const fragement = document.createDocumentFragment();
      this.container = document.createElement('div'); // 主容器
      const canvas = document.createElement('canvas');
      const operate = document.createElement('div'); // 放置操作选项的容器
      const drawPointOperate = document.createElement('div');
      const drawPointOperateTitle = document.createElement('span');
      const drawCircleOperate = document.createElement('div');
      const drawCircleOperateTitle = document.createElement('span');
      const drawRectOperate = document.createElement('div');
      const drawRectOperateTitle = document.createElement('span');
      const drawLineOperate = document.createElement('div');
      const drawLineOperateTitle = document.createElement('span');;
      this.imageListContainer = document.createElement('div'); // 放置图片列表
      const menu = document.createElement('div'); // 菜单容器
      const addImage = document.createElement('div'); // 新增图片

      // 构建结构
      fragement.appendChild(this.container);
      fragement.appendChild(this.imageListContainer);
      this.container.appendChild(canvas);
      this.container.appendChild(menu);
      this.container.appendChild(operate);
      operate.appendChild(drawPointOperate);
      drawPointOperate.appendChild(drawPointOperateTitle)
      this.rootElement.appendChild(fragement);
      operate.appendChild(drawCircleOperate);
      drawCircleOperate.appendChild(drawCircleOperateTitle);
      operate.appendChild(drawRectOperate);
      drawRectOperate.appendChild(drawRectOperateTitle);
      operate.appendChild(drawLineOperate);
      drawLineOperate.appendChild(drawLineOperateTitle);

      //构建内容
      drawPointOperateTitle.innerText = '点'
      drawCircleOperateTitle.innerText = '圆'
      drawRectOperateTitle.innerText = '矩形'
      drawLineOperateTitle.innerText = '线'

      // 构建样式
      this.container.setAttribute('class', 'editor-container');
      menu.setAttribute('class', 'editor-menu');
      operate.setAttribute('class', 'editor-operate');
      drawPointOperate.setAttribute('class', 'operate-item');
      drawCircleOperate.setAttribute('class', 'operate-item');
      drawRectOperate.setAttribute('class', 'operate-item');
      drawLineOperate.setAttribute('class', 'operate-item');
      this.imageListContainer.setAttribute('class', 'editor-imgs')
      this.initHeight = parseInt(ImageEditor.getStyle(this.container, 'height')) - parseInt(ImageEditor.getStyle(operate, 'height')) - 24;
      this.initWidth = parseInt(ImageEditor.getStyle(this.container, 'width'));
      canvas.width = this.initWidth;
      canvas.height = this.initHeight;
      this.position = ImageEditor.elementPosition(canvas);
      this._buildMenu(menu);
      this._bindEvent();
      this.canvas = canvas;
    }

    /**
     * 监听菜单点击
     */
    ImageEditor.prototype._bindEvent = function () {
      this.container.addEventListener('click', (e) => {
        var element = e.target;
        if (element.className === 'operate-item' || element.parentNode.className === 'operate-item' ||
          element.className === 'menu-item' || element.parentNode.className === 'menu-item') {
          var text = element.innerText;
          if (this.operateMap[text.trim()]) {
            this.operateMap[text.trim()]();
            if (element.className === 'operate-item' || element.parentNode.className === 'operate-item') {
              if (element.tagName === 'SPAN') {
                element = element.parentNode;
              }
              var selectedEle = document.querySelector('.operate-item.selected');
              selectedEle && (selectedEle.classList.remove('selected'))
              element.classList.add('selected')
            }
          }
        }
      })
    }

    ImageEditor.prototype._buildMenu = function (menu) {
      var fragement = document.createDocumentFragment();
      for (var index = 0; index < this.menus.length; index++) {
        var item = document.createElement('div');
        item.setAttribute('class', 'menu-item')
        var text = document.createElement('span');
        fragement.appendChild(item);
        item.appendChild(text);
        text.innerText = this.menus[index].title;
        if (this.menus[index].name === 'addImage') {
          var input = document.createElement('input');
          input.setAttribute('type', 'file');
          // 限定input只支持jpg，png
          input.setAttribute('accept', 'image/jpeg, image/png');
          item.appendChild(input);
          input.style.visibility = 'hidden'
          input.style.height = '0px';
          input.style.width = '0px';
          item.addEventListener('click', (e) => {
            input.click();
          })
          input.addEventListener('change', (e) => {
            this._imageChange(e)
          })
        }
      }
      menu.appendChild(fragement);
    }

    // 撤销
    ImageEditor.prototype.goBack = function () {
      if (this.currentEImage && this.currentEImage.shaps.length > 0) {
        this.currentEImage.shaps.pop();
        this.currentEImage.draw(this.canvas);
        //this.updateList();
      }
    }

    // 清除内容
    ImageEditor.prototype.clear = function () {
      if (this.currentEImage && this.currentEImage.shaps.length > 0) {
        this.currentEImage.shaps = [];
        this.currentEImage.draw(this.canvas);
      }
    }

    ImageEditor.prototype._imageChange = function (e) {
      var file = e.target.files[0];
      if(!file){
        return;
      }
      var reads = new FileReader();
      reads.readAsDataURL(file);
      reads.onload = (e) => {
        var img = new Image();
        img.src = e.target.result;
        img.onload = (e) => {
          var eImage = new EImage(img);
          this.eImages.unshift(eImage);
          this.currentEImage = eImage;
          this.canvas.width = this.initWidth;
          this.canvas.height = this.initHeight;
          eImage.draw(this.canvas, () => {
            var height = ImageEditor.getStyle(this.imageListContainer, 'height');
            const image = new Image();
            image.src = eImage.img.src;
            image.style.height = height;
            image.style.width = height;
            this.imageListContainer.appendChild(image);
      
            image.addEventListener('click', () => {
              this.currentEImage = eImage;
              this.canvas.width = this.initWidth;
              this.canvas.height = this.initHeight;
              eImage.draw(this.canvas)
            })
          });
        }
      };
    }

    // 改变绘图模式
    ImageEditor.prototype.changeMode = function (mode) {
      this.mode && (this.mode.unbind());
      this.mode = mode;
      this.mode.bind();
    }
  }

  /** 定义EImage构造函数 */
  function EImage(img) {
    this.img = img;
    this.shaps = [];
  }

  /** callback 绘制完成之后的回调 */
  EImage.prototype.draw = function (canvas, callback) {
    if (!this.img || !canvas) {
      return;
    }
    
    // 按比例缩放图片
    var height, width;
    var cRatio = canvas.width / canvas.height;
    var iRatio = this.img.width / this.img.height;

    if (cRatio > iRatio) {
      height = canvas.height;
      width = canvas.height * iRatio;
    } else if (cRatio < iRatio) {
      width = canvas.width;
      height = canvas.width / iRatio;
    } else {
      height = canvas.height;
      width = canvas.width;
    }

    canvas.height = height;
    canvas.width = width;
    var cxt = canvas.getContext('2d');
    cxt.clearRect(0, 0, canvas.width, canvas.height);
    cxt.drawImage(this.img, 0, 0, width, height);
    // 将所有图形画出来
    for (var index = 0; index < this.shaps.length; index++) {
      this.shaps[index].draw(cxt);
    }
    typeof callback === 'function' && (callback());
  }

  //新增一个图形
  EImage.prototype.addShap = function (canvas, shap) {
    this.shaps.push(shap);
    shap.draw(canvas.getContext("2d"))
  }

  function Rect(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.height = height;
    this.width = width;
  }

  Rect.prototype.draw = function (ctx) {
    ctx.fillStyle = "#FF0000";
    ctx.strokeRect(this.x, this.y, this.width, this.height);
  }

  function Circle(x, y, color, radius, isFill) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.isFill = isFill;
    this.radius = radius;
  }

  Circle.prototype.draw = function (ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    this.isFill ? ctx.fill() : ctx.stroke();
  }

  function Point() {
    this.x = x;
    this.y = y;
  }
  Point.prototype.draw = function (ctx) {
    ctx.beginPath();
    ctx.arc(100, 75, 5, 0, 2 * Math.PI);
    ctx.fill();
  }

  function Line(x, y, endX, endY, color) {
    this.x = x;
    this.y = y;
    this.endX = endX;
    this.endY = endY;
    this.color = color;
  }
  Line.prototype.draw = function (ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.endX, this.endY);
    ctx.stroke();
  }

  // 画圆模式
  function CircleMode(editor) {
    let radius, endX, endY, beginX, beginY;
    let mousedown = (e) => {
      e.preventDefault();
      beginX = e.clientX - editor.position.x;
      beginY = e.clientY - editor.position.y;
      editor.canvas.addEventListener('mousemove', move)
      editor.canvas.addEventListener('mouseup', mouseup)
    }
    let move = (e) => {
      e.preventDefault();
      endX = e.clientX - editor.position.x;
      endY = e.clientY - editor.position.y;
    }

    let mouseup = (e) => {
      // 根据滑动距离决定圆的半径
      radius = Math.sqrt((endX - beginX) * (endX - beginX) +
        (endY - beginY) * (endY - beginY));
      editor.currentEImage.addShap(editor.canvas, new Circle(beginX, beginY, '#0000ff', radius, false));
    }
    this.bind = function () {
        //console.log(this)
        editor.canvas.addEventListener('mousedown', mousedown)
      },
      this.unbind = function () {
        editor.canvas.removeEventListener('mousemove', move);
        editor.canvas.removeEventListener('mousedown', mousedown);
        editor.canvas.removeEventListener('mouseup', mouseup);
      }
  }

  // 画点模式
  function PointMode(editor) {
    let mousedown = (e) => {
      e.preventDefault();
      beginX = e.clientX - editor.position.x;
      beginY = e.clientY - editor.position.y;
      editor.currentEImage && (editor.currentEImage.addShap(editor.canvas, new Circle(beginX, beginY, '#0000ff', 4, true)));
    }
    this.bind = function () {
      editor.canvas.addEventListener('mousedown', mousedown);
    }
    this.unbind = function () {
      editor.canvas.removeEventListener('mousedown', mousedown);
    }
  }

  //画矩形模式
  function RectMode(editor) {
    var endX, endY, beginX, beginY;
    let mousedown = (e) => {
      e.preventDefault();
      beginX = e.clientX - editor.position.x;
      beginY = e.clientY - editor.position.y;
      editor.canvas.addEventListener('mousemove', move)
      editor.canvas.addEventListener('mouseup', mouseup)
    }
    let move = (e) => {
      e.preventDefault();
      endX = e.clientX - editor.position.x;
      endY = e.clientY - editor.position.y;
      // 根据滑动距离决定圆的半径
      radius = Math.sqrt((endX - beginX) * (endX - beginX) +
        (endY - beginY) * (endY - beginY));
    }
    let mouseup = (e) => {
      if (beginX < endX && beginY < endY) {
        editor.currentEImage.addShap(editor.canvas, new Rect(beginX, beginY, endX - beginX, endY - beginY))
      }

      if (beginX > endX && beginY > endY) {
        editor.currentEImage.addShap(editor.canvas, new Rect(endX, endY, beginX - endX, beginY - endY))
      }

      if (beginX < endX && beginY > endY) {
        editor.currentEImage.addShap(editor.canvas, new Rect(beginX, endY, endX - beginX, beginY - endY))
      }

      if (beginX > endX && beginY < endY) {
        editor.currentEImage.addShap(editor.canvas, new Rect(endX, beginY, beginX - endX, endY - beginY))
      }

      endX = beginX;
      endY = beginY;
    }

    this.bind = function () {
      editor.canvas.addEventListener('mousedown', mousedown)
    };
    this.unbind = function () {
      editor.canvas.removeEventListener('mousemove', move);
      editor.canvas.removeEventListener('mousedown', mousedown);
      editor.canvas.removeEventListener('mouseup', mouseup);
    }
  }

  function LineMode(editor) {
    this.beginX = 0;
    this.beginY = 0;
    this.endX = this.beginX;
    this.endY = this.beginY;
    let mousedown = (e) => {
      e.preventDefault();
      this.beginX = e.clientX - editor.position.x;
      this.beginY = e.clientY - editor.position.y;
      editor.canvas.addEventListener('mousemove', move)
      editor.canvas.addEventListener('mouseup', mouseup)
    }
    let move = (e) => {
      e.preventDefault();
      this.endX = e.clientX - editor.position.x;
      this.endY = e.clientY - editor.position.y;
    }
    let mouseup = (e) => {
      editor.currentEImage.addShap(editor.canvas, new Line(this.beginX, this.beginY, this.endX, this.endY, '#0000ff'))
      this.endX = this.beginX;
      this.endY = this.beginY;
    }
    this.bind = function () {
      editor.canvas.addEventListener('mousedown', mousedown)
    };
    this.unbind = function () {
      editor.canvas.removeEventListener('mousemove', move);
      editor.canvas.removeEventListener('mousedown', mousedown);
      editor.canvas.removeEventListener('mouseup', mouseup);
    }
  }
}