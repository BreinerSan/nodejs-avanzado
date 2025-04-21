class Singleton {
    constructor() {
        if(Singleton.instance){
            return Singleton.instance;
        }
        this.instance = this;
    }

    setName(name){
        this.name = name;
    }
}

const s1 = new Singleton();
const s2 = new Singleton();

console.log("Holaaa desde docker");
console.log(s1 === s2);