export let TOKEN_KEY

// eslint-disable-next-line
if ($BUILD_TARGET$ === 'production') {
  TOKEN_KEY = 'h666-demo-pro'
} else {
  TOKEN_KEY = 'h666-demo-dev'
}
