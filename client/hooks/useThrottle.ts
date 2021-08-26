// Adapted from underscoreJS/lodash
// https://stackoverflow.com/questions/27078285/simple-throttle-in-js
// @ts-nocheck
export function useThrottleTrailing(
  func: () => void,
  wait: number,
  options: any
) {
  let context, args, result;
  let timeout: number | null = null;
  let previous = 0;
  if (!options) options = {};
  let later = function () {
    previous = options.leading === false ? 0 : Date.now();
    timeout = null;
    result = func.apply(context, args);
    if (!timeout) context = args = null;
  };
  return function () {
    let now = Date.now();
    if (!previous && options.leading === false) previous = now;
    let remaining = wait - (now - previous);
    context = this;
    args = arguments;
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = now;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining);
    }
    return result;
  };
}

export function useThrottleSimple(callback: () => void, limit: number) {
  var waiting = false;
  return function () {
    if (!waiting) {
      callback.apply(this, arguments);
      waiting = true;
      setTimeout(function () {
        waiting = false;
      }, limit);
    }
  };
}
