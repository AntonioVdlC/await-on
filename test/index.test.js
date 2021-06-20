import awaitFor from "../src/index.ts";

describe("await-for", () => {
  it("is a function", () => {
    expect(typeof awaitFor).toBe("function");
  });
  it("returns an Array containing 2 values", async () => {
    const result = await awaitFor(Promise.resolve(42));

    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(2);
  });
  it("returns a non-Error value as the first element of the Array and a null value as the second element if the Promise resolves", async () => {
    const [result, error] = await awaitFor(Promise.resolve(42));

    expect(result).not.toBeNull();
    expect(error).toBeNull();
  });
  it("returns a null value as the first element of the Array and an Error as the second element if the Promise rejects", async () => {
    const [result, error] = await awaitFor(Promise.reject("Some error"));

    expect(result).toBeNull();
    expect(error).not.toBeNull();
  });
  it("returns a null value as the first element of the Array and an Error as the second element if the Promise throws", async () => {
    const promise = new Promise(() => {
      throw new Error("Some error");
    });
    const [result, error] = await awaitFor(promise);

    expect(result).toBeNull();
    expect(error).not.toBeNull();
  });

  it("accepts a value as argument", async () => {
    const value = 42;
    const [result, error] = await awaitFor(value);

    expect(result).toEqual(value);
    expect(error).toBeNull();
  });
  it("accepts a Promise as argument", async () => {
    const value = 42;
    const promise = new Promise((resolve) => resolve(value));
    const [result, error] = await awaitFor(promise);

    expect(result).toEqual(value);
    expect(error).toBeNull();
  });
  it("accepts an Array of Promises as argument", async () => {
    const value1 = "hello";
    const value2 = "world";
    const promise1 = new Promise((resolve) => resolve(value1));
    const promise2 = new Promise((resolve) => resolve(value2));
    const [result, error] = await awaitFor([promise1, promise2]);

    expect(Array.isArray(result)).toBe(true);
    expect(result[0]).toEqual(value1);
    expect(result[1]).toEqual(value2);
    expect(error).toBeNull();
  });
});
