const header = '#MCFG'
const headerFixValue = String.fromCharCode(0, 13, 0, 13, 10)

const username = 'admin'
const usernameFixValue = String.fromCharCode(
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
)

const version = '1.0'
const versionFixValue = String.fromCharCode(0, 0, 0, 0, 0, 0, 0)

const mapType = 'M'
const reservedFixValue = String.fromCharCode(0)

const finish = '&SQISoft'
const finishFixValue = String.fromCharCode(13,10)

export {
  headerFixValue,
  header,
  usernameFixValue,
  username,
  versionFixValue,
  version,
  reservedFixValue,
  mapType,
  finish,
  finishFixValue
}
