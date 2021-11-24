
module.exports = class Productos{
    constructor(){
        this.productos = [];
        this.id = 0;
    }

    save(producto){
        try{
            this.id += 1;
            producto.id = this.id;
            this.productos.push(producto);

        } catch(error){
            return 0;
        }

        return this.id;
    }

    getAll(){
        return this.productos;
    }

    getId(id){
        if(id > this.id || id <= 0){
            return null;
        }

        let retItem;
        this.productos.map((item) => {
            if(item.id == id){
                retItem = item;
            }
        }, this.productos);

        return retItem;
    }

    update(id, newProduct){
        if(id > this.id || id <= 0){
            return null;
        }
        
        this.productos.map((item) => {
            if(item.id == id){
                if(newProduct.title){
                    item.title = newProduct.title;
                }
                if(newProduct.price){
                    item.price = newProduct.price;
                }
                if(newProduct.thumbnail){
                    item.thumbnail = newProduct.thumbnail;
                }
            }
        }, this.productos);

        return this.productos;
    }

    delete(id){
        if(id > this.id || id <= 0){
            return null;
        }
        
        let idx2delete = 0;
        this.productos.map((item, idx) => {
            if(item.id == id){
                idx2delete = idx;
            } else {
                item.id = item.id > id? item.id - 1 : item.id;
            }
        }, this.productos);

        this.productos.splice(idx2delete, 1);
        this.id--;

        return this.productos;
    }
}