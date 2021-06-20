import awaitFor from "../src/index.ts";

describe("await-for", () => {
  it("is a function", () => {
    expect(typeof awaitFor).toBe("function");
  });
});
