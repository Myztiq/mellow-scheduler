const { stopCook, getInfo } = require('../lib/mellow')

module.exports = async (event) => {
  await stopCook(event)
  const info = await getInfo(event)
  console.log(info.data.MellowState)
  return event
}
