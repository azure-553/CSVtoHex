import { ALLOW_FILE_EXTENSION } from '../constants';
import { removeFileName } from './removeFileName';

export const fileExtensionValid = ({ name }) => {
  // 파일 확장자
  const extension = removeFileName(name);

  /**
   * 허용가능한 확장자가 있는지 확인하는 부분은 indexOf를 사용해도 괜찮고,
   * 새롭게 나온 includes를 사용해도 괜찮고, 그밖의 다른 방법을 사용해도 좋다.
   * 성능과 취향의 따라 사용하면 될것같다.
   *
   * indexOf의 경우
   * 허용가능한 확장자가 있을경우
   * ALLOW_FILE_EXTENSION 상수의 해당 확장자 첫 index 위치값을 반환
   */
  if (!(ALLOW_FILE_EXTENSION.indexOf(extension) > -1) || extension === '') {
    // 해당 if문이 수행되는 조건은
    // 1. 허용하지 않은 확장자일경우
    // 2. 확장자가 없는경우이다.
    return false;
  }
  return true;
};
