export default function removeFileName(originalFileName) {
  const lastIndex = originalFileName.lastIndexOf('.');
  if (lastIndex < 0) {
    return '';
  }
  return originalFileName.substring(lastIndex + 1).toLowerCase();
}
