import * as R from "ramda";

export const capitalizeFirstChar = (string) =>
  `${string.charAt(0).toUpperCase()}${string.slice(1)}`;
export const updateObj = (obj, newObj) => {
  return { ...obj, ...newObj };
};
export const isEmptyObj = (obj) => {
  return obj && Object.keys(obj).length === 0 && obj.constructor === Object;
};

export function getMinKey(obj) {
  return "" + Math.min(...Object.keys(obj));
}

export function getMaxKey(obj) {
  return "" + Math.max(...Object.keys(obj));
}

export function sortStrings(array) {
  return array.sort(stringSorter);
}

export function stringSorter(operand = 1) {
  // -1 == reverse order
  return (a, b) => {
    if (a > b) return 1 * operand;
    if (a < b) return -1 * operand;
  };
}

export const extractMonthsOfYear = R.curry((year) =>
  R.pipe(R.prop(year), R.prop("months"), R.values)
);

export const extractEntriesOfYear = R.curry((year) =>
  R.pipe(
    extractMonthsOfYear(year),
    R.map(R.pipe(R.prop("entries"), R.values)),
    R.flatten
  )
);

export const entriesLensWithoutSetter = R.curry((setLens) =>
  R.lens(R.pipe(R.prop("entries"), R.values), setLens)
);
export const entriesLensOver = R.curry((setterLens, fn, obj) =>
  R.over(entriesLensWithoutSetter(setterLens), fn, obj)
);
export const extractSum = R.pipe(R.map(R.prop("value")), R.sum);
export const addSum = entriesLensOver(R.assoc("sum"), extractSum);

export const extractPayers = R.pipe(R.map(R.prop("payer")), R.uniq);
export const addPayers = entriesLensOver(R.assoc("payers"), extractPayers);

export const extractPayerSum = R.curry((payer, obj) => {
  return R.pipe(
    R.prop('entries'),
    R.values,
    R.filter((o) => o.payer === payer),
    R.map(R.prop("value")),
    R.sum
  )(obj);
});

export const extractPayersSums = R.curry((obj) => {
  const { payers } = obj;
  return R.zipObj(payers, R.map(extractPayerSum(R.__, obj), payers));
});

export const addPayersSums = R.curry((obj) =>
  R.over(R.lens(R.identity, R.assoc("payersSums")), extractPayersSums, obj)
);

export const entryDateLens = R.lensProp("date");
export const entryDateToDateObject = R.curry((obj) =>
  R.over(entryDateLens, (d) => new Date(d), obj)
);
