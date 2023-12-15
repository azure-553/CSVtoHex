const header = '#MCFG';
const headerFixValue = [0, 13, 0, 13, 10];

const username = 'admin';
const usernameFixValue = new Array(35).fill(0);

const version = '1.0';
const versionFixValue = new Array(7).fill(0);

const mapType = 'M';
const reservedFixValue = 0;

const finish = '&SQISoft';
const finishFixValue = [13, 10];

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
  finishFixValue,
};
