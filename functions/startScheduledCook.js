const { startPreCool } = require('../lib/mellow')

module.exports = async (event, context) => {
  const {
    username,
    password
  } = JSON.parse(event.body)

  await startPreCool({
    username,
    password
  })

  // Eventually this should schedule the cook next step...

  context.succeed({
    statusCode: 201
  })
}
