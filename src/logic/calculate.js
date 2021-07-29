import Big from "big.js";

import operate from "./operate";
import isNumber from "./isNumber";

/**
 * Given a button name and a calculator data object, return an updated
 * calculator data object.
 *
 * Calculator data object contains:
 *   total:String      the running total
 *   next:String       the next number to be operated on with the total
 *   operation:String  +, -, etc.
 */
export default function calculate(obj, buttonName) {
  
  console.log("calculate - obj -", obj);
  console.log("calculate - buttonName -", buttonName);

  if (buttonName === "AC") {
    console.log('calculate - if (buttonName === "AC") ');
    return {
      total: null,
      next: null,
      operation: null,
    };
  }

  if (isNumber(buttonName)) {
    console.log("calculate - if (isNumber(buttonName)) ", isNumber(buttonName));
    if (buttonName === "0" && obj.next === "0") {
      console.log('calculate - if (buttonName === "0" && obj.next === "0") ');
      return {};
    }
    // If there is an operation, update next
    if (obj.operation) {
      console.log(
        "calculate - if (isNumber(buttonName)) - if (obj.operation) ",
      );
      if (obj.next) {
        console.log(
          "calculate - if (isNumber(buttonName)) - if (obj.operation) -> if (obj.next) ",
        );
        return { next: obj.next + buttonName };
      }
      return { next: buttonName };
    }
    // If there is no operation, update next and clear the value
    if (obj.next) {
      console.log("calculate - if (isNumber(buttonName)) - if (obj.next) ");
      const next = obj.next === "0" ? buttonName : obj.next + buttonName;
      console.log(
        "calculate - if (isNumber(buttonName)) - if (obj.next) -> next",
        next,
      );
      return {
        next,
        total: null,
      };
    }
    return {
      next: buttonName,
      total: null,
    };
  }

  if (buttonName === "%") {
    console.log('calculate - if (buttonName === " % ") ');
    if (obj.operation && obj.next) {
      console.log(
        'calculate - if (buttonName === " % ") -> if (obj.operation && obj.next)',
      );
      const result = operate(obj.total, obj.next, obj.operation);
      console.log(
        'calculate - if (buttonName === " % ") -> if (obj.operation && obj.next) -> result - ',
        result,
      );
      return {
        total: Big(result)
          .div(Big("100"))
          .toString(),
        next: null,
        operation: null,
      };
    }
    if (obj.next) {
      console.log(
        'calculate - if (buttonName === " % ") -> obj.next ',
        obj.next,
      );
      return {
        next: Big(obj.next)
          .div(Big("100"))
          .toString(),
      };
    }
    return {};
  }

  if (buttonName === ".") {
    console.log(
      'calculate - if (buttonName === " % ") -> if (buttonName === ".") ',
    );
    if (obj.next) {
      console.log(
        'calculate - if (buttonName === " % ") -> if (buttonName === ".") -> if (obj.next) ',
        obj.next,
      );
      // ignore a . if the next number already has one
      if (obj.next.includes(".")) {
        console.log(
          'calculate - if (buttonName === " % ") -> if (buttonName === ".") -> if (obj.next) -> if (obj.next.includes(".")) ',
          obj.next,
        );
        return {};
      }
      return { next: obj.next + "." };
    }
    return { next: "0." };
  }

  if (buttonName === "=") {
    console.log('calculate - if (buttonName === "=") ');
    if (obj.next && obj.operation) {
      console.log(
        'calculate - if (buttonName === "=") -> if (obj.next && obj.operation) ',
      );
      return {
        total: operate(obj.total, obj.next, obj.operation),
        next: null,
        operation: null,
      };
    } else {
      // '=' with no operation, nothing to do
      return {};
    }
  }

  if (buttonName === "+/-") {
    console.log('calculate - if (buttonName === "+/-") ');

    if (obj.next) {
      console.log('calculate - if (buttonName === "+/-") -> if (obj.next) ');
      return { next: (-1 * parseFloat(obj.next)).toString() };
    }
    if (obj.total) {
      console.log('calculate - if (buttonName === "+/-") -> if (obj.total) ');
      return { total: (-1 * parseFloat(obj.total)).toString() };
    }
    return {};
  }

  // Button must be an operation

  // When the user presses an operation button without having entered
  // a number first, do nothing.
  // if (!obj.next && !obj.total) {
  //   return {};
  // }

  // User pressed an operation button and there is an existing operation
  if (obj.operation) {
    console.log("calculate - if (obj.operation) ");
    return {
      total: operate(obj.total, obj.next, obj.operation),
      next: null,
      operation: buttonName,
    };
  }

  // no operation yet, but the user typed one

  // The user hasn't typed a number yet, just save the operation
  if (!obj.next) {
    console.log("calculate - if (!obj.next) ");
    return { operation: buttonName };
  }

  // save the operation and shift 'next' into 'total'
  return {
    total: obj.next,
    next: null,
    operation: buttonName,
  };
}
