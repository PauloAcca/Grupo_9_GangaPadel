const bcryptjs = require('bcryptjs')
let hash = bcryptjs.hashSync('hola123', 10)
console.log(bcryptjs.compareSync('hola17823',hash))