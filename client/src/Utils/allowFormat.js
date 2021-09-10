function allowFormat(type) {
  if (
    type === 'application/vnd.ms-excel' ||
    type === 'application/vnd.oasis.opendocument.spreadsheet' ||
    type === 'application/vnd.oasis.opendocument.spreadsheet-template' ||
    type ===
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
      type ===
      'application/vnd.openxmlformats-officedocument.spreadsheetml.template'
  ) {
    return true;
  }
  return false;
}

export default allowFormat;
