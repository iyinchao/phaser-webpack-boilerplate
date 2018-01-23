const configCommon = {
  build: {
    dist: 'dist',
    assetDir: 'static',
    assetPublicPath: '/',
    browserList: ['> 1%', 'last 2 versions', 'not ie <= 8']
  },
  game: {
    dir: 'src/game'
  }
}

const configForEnv = {
  build: {

  }
}

export default config
