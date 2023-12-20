export const BLOB_TYPE = 'application/octet-stream';
export const SEQ_MAX_BYTE = 2;
export const DEVICE_MAX_BYTE = 16;
export const SUGGEST_FILENAME = 'MCFG_NEW_HEAT.MBC';
export const MSGLENGTH_ONE = 40;
export const SCALE_MAX_BYTE = 4;

export const ALLOW_FILE_EXTENSION = 'csv';
export const MAX_FILE_SIZE = 10 * 1024 * 1024;

export const ERROR = Object.freeze({
  SAVE: '[ERROR] 파일을 저장해주세요.',
  CHOOSE: '[ERROR] 파일을 선택해주세요.',
  DATA: '[ERROR] 파일에 데이터가 존재하지 않습니다.',
  EXTENSION: `[ERROR] 업로드 가능한 확장자가 아닙니다. [가능한 확장자 : ${ALLOW_FILE_EXTENSION}]`,
  MAX: '[ERROR] 업로드 가능한 최대 용량은 10MB입니다. ',
});
