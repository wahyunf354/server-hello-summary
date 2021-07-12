const { formatNumber } = require("../utility/formatNumber");

describe("Sample Test", () => {
  it("should text that true === true", () => {
    expect(true).toBe(true);
  });
});

describe("Test Utility Function", () => {
  it("should function formatNumber return string with koma", () => {
    const numformat = formatNumber(2000);
    expect(numformat).toBe("2,000");
  });
});
