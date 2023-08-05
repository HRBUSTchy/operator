import {existsSync, readFileSync} from "fs"


export class Json<T extends object> {
  _json: T;

  constructor(path:string){
    if(!existsSync(path)){
      throw new Error("file not found")
    }
    try {
      const rawJson  = readFileSync(path,'utf-8')
      this._json = JSON.parse(rawJson)
    } catch (error) {
      throw new Error("json parse fail")
    }
  }

  public readAll = ():T => {
    return this._json;
  }

  public writeAll = (mergeData: Partial<T>):boolean => {
    
    return true
  }
}