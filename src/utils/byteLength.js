export const byteLength = (number) => {
  // 받아온 숫자를 바이트 형태로 계산
  const byteNumber = number.toString(16)
  const byteNumberLength = byteNumber.length
  // 32bit = 4byte = 정수크기
  // if (byteNumberLength < 32) {
  // }
  console.log(byteNumberLength);
  return byteNumber
}
