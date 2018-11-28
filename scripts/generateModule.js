const fs = require('fs')
const path = require('path')
const chalk = require('chalk')

const modulesPath = 'src/modules'
const args = process.argv.slice(2)

const error = (...args) => {
  console.log(chalk.red(...args))
};

const success = (...args) => {
  console.log(chalk.green(...args))
};

if (!args.length) {
  error('You must provide a name for the module!')
  return;
}

const moduleName = args[0];
const modulePath = path.join(__dirname, '../', modulesPath, moduleName);

if (fs.existsSync(modulePath)) {
  error(`${moduleName} directory already exists!`);
  return;
}

const indexContent = `
//Регистрация локального роутера
import './router'

//Регистрация локального cтора
import './store'
`;

const routerContent = `
import router from '@/router'

router.addRoutes([
    // Тут будут страницы routera
])
`;

const storeContent = `
import store from '@/store'

const state = {

}

const getters = {

}

const mutations = {

}

const actions = {

}

store.registerModule('${moduleName}', {
    state, getters, mutations, actions
})
`;

const indexPath = `${path.join(modulePath, `index.js`)}`
const routerPath = `${path.join(modulePath, 'router.js')}`
const storePath = `${path.join(modulePath, 'store.js')}`

const pagesPath = `${modulePath}/pages`
const componentsPath = `${modulePath}/components`

fs.mkdirSync(modulePath)
fs.mkdirSync(pagesPath)
fs.mkdirSync(componentsPath)
fs.appendFileSync(indexPath, indexContent)
fs.appendFileSync(routerPath, routerContent)
fs.appendFileSync(storePath, storeContent)

success('Module', moduleName, 'generated!')