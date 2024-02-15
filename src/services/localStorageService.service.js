export default class LocalStorageService {
   "use strict";
   constructor(model, key) {
       this.origModel = model;
       this.key = key;

       if (!this.retrieve()) {
           this.model = this.cloneObject(model);   // get copy of data
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
       let filterObj = {};

       if (this.filterStr) {
           filterObj[this.filterCol] = this.filterStr;
           return this.filter(filterObj);
       }

       return this.model.data;
   }

   async create(obj) {
       this.model.data.push(obj);
       this.store();
   }

   async read(getId) {
       return this.model.data.find(item => item.id === getId) || null;
   }

   async update(obj) {
       let index = this.getItemIndex(obj.id);
       if (index !== -1) {
           this.model.data[index] = obj;
           this.store();
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
              return item[key] === filterObj[key];
          });
      });
  }
  

   getItemIndex(id) {
       return this.model.data.findIndex(item => item.id === id);
   }

   cloneObject(obj) {
       return JSON.parse(JSON.stringify(obj));
   }
}
