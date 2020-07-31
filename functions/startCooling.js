const { startPreCool } = require('../lib/mellow')

module.exports = async (event) => {
  const {
    username,
    password
  } = event

  await startPreCool({
    username,
    password
  })

  return event
}
