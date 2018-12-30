(function() {

    C_Carousel = function (content,options){
        this.content = content;
        this.options = options;
    }

    var dirction = {
        pre:'ltr',
        next:'rtl'
    }

   C_Carousel.prototype.create = function(){

        if(this.content.startsWith('#')){
            try{
                this.content = document.querySelector(this.content);
            }catch(ex){
                throw ex;
            }
        }

       if(!(this.content instanceof Node)){
            throw 'pamarater error';
       }

       var carousel = document.createElement('div');
       carousel.setAttribute('draggable',false);
       carousel.setAttribute('class','cl_carousel');
       this.content.appendChild(carousel);

       var title = document.createElement('div');
       title.setAttribute('class','title');
       this.title = title;

       var pre = document.createElement('div');
       pre.setAttribute('class','cl_pre');
       
       var next = document.createElement('div');
       next.setAttribute('class','cl_next');

       this.carousel = carousel;
       this.carousel.appendChild(title);
       this.carousel.appendChild(pre);
       this.carousel.appendChild(next);

       next.addEventListener('click',()=>this.next());
       pre.addEventListener('click',()=>this.pre())

       if(this.options.items&&this.options.items instanceof Array){
           var activeItem;
           items = this.options.items;
           var that = this;
           function iterator(){
                for(var i = 0 ;i <items.length;i++){
                    if(items[i].isActive === true){
                        activeItem = items[i];
                        that.carouselIndex = i;
                        break;
                    }
                }
                
           }
           iterator();
       }

       if(activeItem){
            this.buildItem('ltr');
            //this.start();
       }
       
       this.bindEvent();

   };

   C_Carousel.prototype.buildItem = function(dir){
    if(this.activeElement){
        this.carousel.removeChild(this.activeElement);
           //this.activeElement.setAttribute('class','item none');
    }

    var img = document.createElement('img');
    img.setAttribute('draggable',false);
    img.setAttribute('src',this.options.items[this.carouselIndex].src);
    img.setAttribute('class','item active'+dir);
  
    this.carousel.appendChild(img);
    this.title.innerText = this.options.items[this.carouselIndex].title
    this.activeElement = img;
    if(this.options.onItemChange instanceof Function){
        this.options.onItemChange(this.options.items[this.carouselIndex],this.carouselIndex,this.activeElement);
    }

   };

   C_Carousel.prototype.start = function(){
       this.inteval = setInterval(()=>{
            if(this.carouselIndex+1<this.options.items.length){
                this.carouselIndex++;
            }else{
                this.carouselIndex = 0;        
            }
            this.buildItem(dirction.next);
       },this.options.inteval?parseInt(this.options.inteval):2000);
   }

   C_Carousel.prototype.goto = function(index){
        this.stop();
        var dir = dirction.pre;
        if(index>this.carouselIndex){
                dir = dirction.next;
        }
        if(index<this.options.items.length && index>=0){
            this.carouselIndex = index;
        }else if(index<0){
       
            this.carouselIndex = this.options.items.length-1;
        }else {    
            this.carouselIndex = 0;
        }
        this.buildItem(dir);
        this.start();    
   }


   C_Carousel.prototype.stop = function(){
       this.inteval&&(clearInterval(this.inteval))
   }

   C_Carousel.prototype.next = function (){
        this.goto(this.carouselIndex+1,'rtl');
   }

   C_Carousel.prototype.pre = function(){
        this.goto(this.carouselIndex-1,'ltr');

   }

   C_Carousel.prototype.bindEvent = function(){   
    var sourceLocation = {};

    var move = (e)=>{
        e.preventDefault();
    }

    var mousedown = (e)=>{ 
         sourceLocation.x = e.clientX;
         sourceLocation.y = e.clientY;
         //this.carousel.addEventListener('mousemove',move);
    }

    var mouseup = (e) =>{
        e.preventDefault();
        var distance = e.clientX -sourceLocation.x;
        console.log(distance);
        if(distance<-50){
            this.next();
            return;
         
        }
        if(distance>50){
            this.pre();
            return;
        }
       // this.carousel.removeEventListener('mouseup',mouseup);
    }
    this.carousel.addEventListener('mousedown',mousedown);
    this.carousel.addEventListener('mouseup',mouseup);
    this.carousel.addEventListener('mousemove',move);
   }
})();

