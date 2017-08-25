class DragAndDrop{
    constructor(elem){
        this.elem = elem;
    }
    toHover(){
        this.elem.className = 'hover';
        return false
    }
    toNormal(){
        this.elem.className ='';
        return false
    }
    createImgList(event){
        let self = this;
        event.preventDefault();
        self.elem.className = 'drop';
        let files = event.dataTransfer.files;
        Array.from(files).map(function(file) {
            if (~file.type.indexOf('image')) {
                let fread = new FileReader();
                fread.readAsDataURL(file);
                fread.onload = (function (file) {
                    return function (e) {
                        let img = new Image();
                        img.src = e.target.result;
                        document.body.appendChild(img);
                    };
                })(file);
            } else {
                self.elem.className = 'error'
            }
        })
    }
    createDrag(){
        let self = this;
        self.elem.ondragover = function () {
            self.toHover(self.elem)
            return false
        }
        self.elem.ondragleave = function(){
            self.toNormal(self.elem)
            return false
        }
        self.elem.ondrop = function (event) {
            self.createImgList(event)
        }
    }
}
window.onload = function () {
    let dropZone = document.getElementById('dropZone'),
    drag = new DragAndDrop(dropZone);
    drag.createDrag();
}
