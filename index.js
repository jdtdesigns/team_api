
class Animal {
  constructor(legs, sound) {
    this.legs = legs
    this.sound = sound
  }

  makeSound() {
    console.log(this.sound)
  }
}

class Bear extends Animal {
  hibernates = true

  makeSound() {
    console.log('Bear says', this.sound)
  }
}

class Tiger extends Animal {
  isFeline = true
}

const grizzly = new Bear(4, 'grrrr')
const tigger = new Tiger(4, 'rawrr')


grizzly.makeSound()
tigger.makeSound()