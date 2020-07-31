const { startCook, getInfo } = require('../lib/mellow')

module.exports = async (event) => {
  await startCook(event, event.temp)
  const info = await getInfo(event)
  console.log(info.data.MellowState)
  return event
}
