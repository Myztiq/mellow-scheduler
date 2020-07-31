const { startCook, stopPreCool } = require('../lib/mellow')

module.exports = async (event) => {
  const {
    username,
    password,
    temp
  } = event

  await stopPreCool(
    {
      username,
      password
    }
  )

  await startCook(
    {
      username,
      password
    },
    temp
  )

  return event
}
