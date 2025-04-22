class Singleton {
    constructor() {
        if(!Singleton.instance){
            Singleton.instance = this;
        }
        return Singleton.instance;
    }

    setName(name){
        this.name = name;
    }
}

const s1 = new Singleton();
const s2 = new Singleton();

console.log("Holaaa desde docker");
console.log(s1 === s2);