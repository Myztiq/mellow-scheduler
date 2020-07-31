const md5 = require('md5')
const axios = require('axios')
const { v4: uuidv4 } = require('uuid');

const fetchBearer = async ({username, password}) => {
  const deviceId = uuidv4()
  const tokenResponse = await axios.post(`https://api.cookmellow.com/api/v1/user/logintoken/${username}`)
  const token = tokenResponse.data.Token;

  const loginResponse = await axios.post(`https://api.cookmellow.com/api/v1/user/login`, {
    "ClientIdentifier": username,
    "ClientSecret": md5(token + md5(password)),
    "DeviceId": deviceId
  })

  const accessToken = loginResponse.data.AccessToken
  const UserId = loginResponse.data.UserId

  return {
    deviceId,
    bearer: Buffer.from(`${accessToken}:${UserId}:${deviceId}`, 'utf-8').toString('base64')
  }
}

const makeAuthedRequest = async (auth, method, url, body) => {
  const {bearer} = await fetchBearer(auth)

  return axios.request({
    url: `http://api.cookmellow.com/api/v1/${url}`,
    method,
    headers: {
      Authorization: `Bearer ${bearer}`,
      Accept: 'application/json',
      'User-Agent': 'Mellowapp/2.1.0 (com.cookmellow.Mellowapp; build:15; iOS 13.5.1) Alamofire/5.2.1'
    },
    data: body
  })
}

module.exports.getInfo = async (auth) => {
  return makeAuthedRequest(auth,'post', 'init', {LocalTime: new Date().toJSON()})
}

module.exports.startPreCool = async (auth) => {
  return makeAuthedRequest(auth,'post', 'precooling', {Force: 0, PreCooling: 1})
}

module.exports.stopPreCool = async (auth) => {
  return makeAuthedRequest(auth,'post', 'precooling', {Force: 0, PreCooling: 0})
}

module.exports.startCook = async (auth, temp) => { // Temp as F
  return makeAuthedRequest(auth,'post', 'manualmode/basic', {Force: 0, Temperature: temp})
}

module.exports.stopCook = async (auth, temp) => {
  return makeAuthedRequest(auth,'post', 'cooking/stop')
}
