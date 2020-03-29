module.exports = value => {
  if (isNaN(parseInt(value, 10))) {
    console.error('Enter proper shift type - number1');
    // eslint-disable-next-line no-process-exit
    process.exit(3);
  }
  return value;
};
