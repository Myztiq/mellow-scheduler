const { startCook } = require('../lib/mellow')

module.exports = async (event) => {
  const {
    username,
    password,
    temp
  } = event

  await startCook(
    {
      username,
      password
    },
    temp
  )

  return event
}
