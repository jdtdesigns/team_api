const fs = require('fs/promises')
require('colors')

async function getNames() {
  const names = await fs.readFile('./names.txt', 'utf8')

  return names
}

async function spinWheel() {
  const nameData = await getNames()
  const names = nameData.trim().split('\n')
  const getRandom = () => {
    const index = Math.floor(Math.random() * names.length)
    return names[index]
  }

  let count = 30

  const cycle = setInterval(() => {
    const randomName = getRandom()

    console.clear()

    count--

    if (!count) {
      console.log(`${randomName} has been chosen!`.bgMagenta.white)
      clearInterval(cycle)
    } else {
      console.log(randomName.bgBrightGreen.white)
    }
  }, 75);

}

spinWheel()