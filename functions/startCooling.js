const { startPreCool, getInfo } = require('../lib/mellow')

module.exports = async (event) => {
  await startPreCool(event)
  const info = await getInfo(event)
  console.log(info.data.MellowState)
  return event
}
