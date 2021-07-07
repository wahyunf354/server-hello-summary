function formatNumber(num) {
  return new Intl.NumberFormat("en-IN", { maximumSignificantDigits: 3 }).format(
    num
  );
}

module.exports = {
  formatNumber,
};
