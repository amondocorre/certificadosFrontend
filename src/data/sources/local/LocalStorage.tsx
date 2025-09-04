export class LocalStorage{

  async save(key:string,value:string){
    try {
      await localStorage.setItem(key,value);
    } catch (error) {
      console.log('Error en local storage', error);
    }
  }
  async getItem(key:string){
    try {
      const item = await localStorage.getItem(key);
      return item;
    } catch (error) {
      console.log('Error en local storage', error);
    }
  }
  async remove(key:string){
    try {
      await localStorage.removeItem(key);
    } catch (error) {
      console.log('Error en local storage', error);
    }
  }
} 