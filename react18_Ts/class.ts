
class Animal {
    name: string;
    constructor(name: string) {
        this.name = name
    }
    run() {
        return `${this.name} in running`
    }
}
const snake = new Animal('lily')
console.log(snake.run());




class Dog extends Animal {
    bark() {
        return `${this.name} in bark`
    }
}

const xiaobao = new Dog('xiaobaoName')
console.log(xiaobao.bark());



class Cat extends Animal {
    constructor(name:string) {
        super(name)
    }
    run() {
        return '毛毛' + super.run()
    }
}

const maomao = new Cat('maomao')
console.log(maomao.run());







