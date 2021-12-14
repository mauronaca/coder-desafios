const fs = require('fs');
module.exports = class Contenedor{
    constructor(path = './productos.txt'){
        this.name = path;
        this.id = 0;

        try {

            console.log(`Reading '${path}'...`);
            let content = fs.readFileSync(path, 'utf-8');
            console.log(`Content:\n'''\n${content}\n'''`);

            this.id = (content == '') ? 0 : JSON.parse(content).length;
            
        } catch(error) {

            if(error.code === 'ENOENT' ){
                console.log(`No such file found\nCreating '${path}'...`);   
                let content = [];
                
                fs.writeFileSync(path, JSON.stringify(content, null, 3), (err) => {
                    if(err){
                        throw(`The following error has ocurred while reading ${path}:\n${error}`);
                    }
                });

            } else {
                throw(`The following error has ocurred while reading ${path}:\n${error}`);
            }
        }


    }

    async save(producto){
        this.id++;
        producto.id = this.id;

        try {
            let content = await fs.promises.readFile(this.name, 'utf-8');
            content = content != '' ? JSON.parse(content) : [];

            content.push(producto);

            await fs.promises.writeFile(this.name, JSON.stringify(content, null, 3));
            return producto.id

        } catch(error) {
            throw(`The following error has ocurred while modifyng '${this.name}:\n${error}'`);
        }
        
    }

    async update (id, newProduct){

        if(id > this.id || id <= 0){
            throw(`The requested id = ${id} is not valid`);
        }

        try{
            let content = await fs.promises.readFile(this.name, 'utf-8');
            content = JSON.parse(content);

            content.map((producto, idx) => {
                if(producto.id == id){
                    producto.title = newProduct.title;
                    producto.price = newProduct.price;
                    producto.thumbnail = newProduct.thumbnail;
                }
            }, content);

            await fs.promises.writeFile(this.name, JSON.stringify(content, null, 3));
            return id;

        } catch(error){
            throw(`The following error has ocurred while updating '${this.name}:\n${error}'`);
        }
    }

    async getById(id){

        if(id > this.id || id <= 0){
            throw(`The requested id = ${id} is not valid`);
        }

        try{
            let content = await fs.promises.readFile(this.name, 'utf-8');
            return(JSON.parse(content)[id - 1]);

        } catch(error) {

            throw(`The following error has ocurred while reading ${this.name}:\n${error}`);
        }
        
    }

    async getAll(){
        try {
            let content = await fs.promises.readFile(this.name, 'utf-8');
            return JSON.parse(content);
        } catch(error) {
            throw(`The following error has ocurred while reading ${this.name}:\n${error}`);
        }
        
    }

    async deleteById(id){
        if(id > this.id || id <= 0){
            throw(`The requested id = ${id} is not valid`);
        }

        try {
            let content = await fs.promises.readFile(this.name, 'utf-8');
            let idxDel = -1;
            content = JSON.parse(content);

            content.map((producto, idx) => {
                if(producto.id == id){
                    idxDel = idx;
                } else {
                    producto.id = producto.id > id? producto.id - 1 : producto.id;
                }
                
            }, content)
            content.splice(idxDel, 1);
            this.id--;
            await fs.promises.writeFile(this.name, JSON.stringify(content, null, 3));
            
            return;
        } catch(error) {
            throw(`The following error has ocurred while modifying ${this.name}:\n${error}`);
        }
    }

    async deleteAll(){
        try {
            let newCont = []
            await fs.promises.writeFile(this.name, JSON.stringify(newCont, null, 3));
        } catch (error) {
            throw(`The following error has ocurred while modifying ${this.name}:\n${error}`);
        }
    }

}

