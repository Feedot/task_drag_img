class DragAndDrop{
    constructor(elemId){
        this.elem = document.getElementById(elemId);
        this.elem.ondragover = () => this.changeClassName('hover');
        this.elem.ondragleave =()=> this.changeClassName('');
        this.elem.ondrop = e => this.createImgList(e);
    }
    changeClassName(className){
        this.elem.className = className;
        return false
    }
    createImgList(e){
        e.preventDefault();
        this.elem.className = 'drop';
        Array.from(e.dataTransfer.files).map(file=> {
            if (~file.type.indexOf('image')) {
                let fread = new FileReader();
                fread.readAsDataURL(file);
                fread.onload = (file=>{
                    return function (e) {
                        let img = new Image();
                        img.src = e.target.result;
                        document.body.appendChild(img);
                    };
                })(file);
            } else this.elem.className = 'error'
        })
    }
}
window.onload = () =>{const drag = new DragAndDrop('dropZone')}
