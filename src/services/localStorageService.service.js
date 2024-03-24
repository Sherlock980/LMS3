export default class LocalStorageService {
   "use strict";
   constructor(model, key) {
       this.origModel = model;
       this.key = key;
       this.update = this.update.bind(this);
       this.create = this.create.bind(this);
       this.delete = this.delete.bind(this);

       if (!this.retrieve()) {
           this.model = this.cloneObject(model);
       }
   }

  getLookup(lookupType) {
    if (this.model.lookups && this.model.lookups[lookupType]) {
      return Promise.resolve(this.model.lookups[lookupType]);
    } else {
      return Promise.reject(new Error(`Lookup type '${lookupType}' not found`));
    }
  }

   get sortCol() {
       return this.model.list.options.sortCol;
   }
   set sortCol(col) {
       this.model.list.options.sortCol = col;
   }

   get sortDir() {
       return this.model.list.options.sortDir;
   }
   set sortDir(dir) {
       this.model.list.options.sortDir = dir;
   }

   get filterStr() {
       return this.model.list.options.filterStr;
   }
   set filterStr(filterStr) {
       this.model.list.options.filterStr = filterStr;
   }

   get size() {
       return this.model.data.length;
   }

   async list() {
    this.sort(this.sortCol, this.sortDir);
    if (this.filterStr) {
        return this.model.data.filter(item => {
            return item.name.toLowerCase().includes(this.filterStr.toLowerCase());
        });
    }
    return this.model.data;
}

    async create(obj) {
        if (!this.model.data) {
            this.model.data = [];
            
        }
        const newId = this.model.data.reduce((acc, cur) => cur.id > acc ? cur.id : acc, 0) + 1;
        const newObj = { ...obj, id: newId };

        this.model.data.push(newObj);
        this.store();

    }

    async read(getId) {
        const item = this.model.data.find(item => String(item.id) === String(getId));
        return item || null;
        
    }
    
    async update(obj) {
        const index = this.getItemIndex(obj.id);
        if (index !== -1) {
            this.model.data[index] = { ...this.model.data[index], ...obj };
            this.store();
            return Promise.resolve(this.model.data[index]); // Return the updated object for confirmation
        } else {
            return Promise.reject(new Error(`Item with id ${obj.id} not found`));
        }
    }
    
    
      

   async delete(removeId) {
       let index = this.getItemIndex(removeId);
       if (index !== -1) {
           this.model.data.splice(index, 1);
           this.store();
       }
   }

   reset() {
       this.clear();
       this.model = this.cloneObject(this.origModel);
       this.store();
   }

   clear() {
       localStorage.removeItem(this.key);
   }

   store() {
       localStorage.setItem(this.key, JSON.stringify(this.model));
   }

   retrieve() {
       let storedData = localStorage.getItem(this.key);
       if (storedData) {
           this.model = JSON.parse(storedData);
           return true;
       }
       return false;
   }

   sort(col, direction) {
       let sortedData = this.cloneObject(this.model.data);

       sortedData.sort((a, b) => {
           if (a[col] < b[col]) return direction === 'asc' ? -1 : 1;
           if (a[col] > b[col]) return direction === 'asc' ? 1 : -1;
           return 0;
       });

       this.model.data = sortedData;
       this.store();
   }

   filter(filterObj) {
      return this.model.data.filter(item => {
          return Object.keys(filterObj).every(key => {
              return item[key] == filterObj[key];
          });
      });
  }
  
  getItemIndex(id) {
    return this.model.data.findIndex(item => item.id.toString() === id.toString());
}


   cloneObject(obj) {
       return JSON.parse(JSON.stringify(obj));
   }
}
