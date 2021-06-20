async function awaitFor<T, U = Error>(
  fn: Promise<T> | Function | Array<Promise<T> | Function>
): Promise<[T, null] | [null, U]> {
  try {
    if (fn instanceof Error) {
      // We throw right away if the input is an Error
      throw fn;
    }

    let result;

    if (fn instanceof Promise) {
      // Input is a Promise, we need to await
      result = await fn;
    } else if (fn instanceof Function) {
      // Input is a Function, we need to call it
      // Note that we can `await` for both sync and async Functions alike
      result = await fn();
    } else if (fn instanceof Array) {
      // Input is an Array, we need to go over each element
      // Note that we use `Promise.all` so that we can reject as soon as an input throws or is rejected
      result = await Promise.all(
        fn.map((f) => {
          if (f instanceof Error) {
            // Element is an Error, throw
            throw f;
          }

          if (f instanceof Function) {
            // Element is a Function, call
            return f();
          }

          // Element is anything else, return
          // Note that if this was an Array, we would not recursively go over all
          // its elements at a further depth
          return f;
        })
      );
    } else {
      // Element is anything else, return value
      result = fn;
    }

    return [result, null];
  } catch (error) {
    return [null, error];
  }
}

export default awaitFor;
