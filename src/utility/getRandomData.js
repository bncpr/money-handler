import { nanoid } from "@reduxjs/toolkit"
import * as R from "ramda"

const getRanNum = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min)

const getLengths = () => ({
  rent: 1,
  food: getRanNum(4, 15),
  home: getRanNum(2, 10),
  transportation: getRanNum(1, 8),
  utilities: getRanNum(1, 5),
  entertainment: getRanNum(1, 5),
  cats: getRanNum(0, 3),
  miscellaneous: getRanNum(0, 5),
  takeout: getRanNum(0, 5),
})

const getRandEntry = (y, m, category, payer) => ({
  id: nanoid(8),
  year: y,
  month: m,
  category,
  payer,
  date: `${y}-${m}-${getRanNum(10, 28)}`,
  value: category === "rent" ? 3800 : getRanNum(1, 500),
})

export const getRandomMonthData = (y, m) => {
  const payers = ["george", "marie"]
  const lengths = getLengths()
  return R.pipe(
    R.toPairs,
    R.chain(([category, length]) =>
      R.chain(
        () => getRandEntry(y, m, category, payers[getRanNum(0, 1)]),
        new Array(length),
      ),
    ),
  )(lengths)
}

export const getRandomData = () => {
  const [currentYear, currentMonth] = new Date()
    .toJSON()
    .slice(0, 11)
    .split("-")

  const months = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
  ]

  const years = ["" + (currentYear - 2), "" + (currentYear - 1), currentYear]

  return R.pipe(
    R.chain(year =>
      (year === currentYear ? months.slice(0, +currentMonth - 1) : months).map(
        month => getRandomMonthData(year, month),
      ),
    ),
    R.unnest,
    R.map(entry => R.objOf(entry.id, entry)),
    R.mergeAll,
  )(years)
}
