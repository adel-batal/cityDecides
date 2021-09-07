import camelizeObjectKeys from './camelizeObjectKeys';

function hasCommonEmail(arr1, arr2) {
  const arr1Emails = extractEmailArray(arr1);
  const arr2Emails = extractEmailArray(arr2);
  return arr1Emails.some((r) => arr2Emails.includes(r));
}

function extractEmailArray(arr) {
  let emailArr = [];
  arr.forEach((element) => emailArr.push(camelizeObjectKeys(element).email));
  return emailArr;
}

export default hasCommonEmail;
