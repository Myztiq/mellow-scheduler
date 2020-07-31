const { stopCook } = require('../lib/mellow')

module.exports = async (event) => {
  const {
    username,
    password,
  } = event

  await stopCook({
    username,
    password,
  })

  return event
}
