class DragAndDrop {

    constructor (elemId) {

        this.elem = document.getElementById(elemId);
        this.pElem = document.querySelector('p');
        this.elem.ondragover = () => this.changeClassName('hover');
        this.elem.ondragleave = () => this.changeClassName('');
        this.elem.ondrop = e => this.createImgList(e);

    }
    changeClassName(className) {

        this.elem.className = className;
        return false

    }
    changePElem(className,innerHtml) {

        this.pElem.className = className;
        this.pElem.innerHTML = innerHtml

    }
    createImgList(e) {

        e.preventDefault();
        this.elem.className = '';
        this.changePElem('','Success! Pull one more image..');

        Array.from(e.dataTransfer.files).map(file => {

            if (~file.type.indexOf('image')) {

                let fread = new FileReader();
                fread.readAsDataURL(file);

                fread.onload = e => {
                        let img = new Image();
                        img.src = e.target.result;
                        document.body.appendChild(img);
                    };

            } else this.changePElem('error','Error!! Pull only image....')

        })
    }

}
window.onload = () => new DragAndDrop('dropZone');
