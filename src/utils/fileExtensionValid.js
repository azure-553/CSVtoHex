import { ALLOW_FILE_EXTENSION } from '../constants';
import removeFileName from './removeFileName';

export default function fileExtensionValid({ name }) {
  const extension = removeFileName(name);
  if (!(ALLOW_FILE_EXTENSION.indexOf(extension) > -1) || extension === '') {
    return false;
  }
  return true;
}
