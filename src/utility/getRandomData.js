import { nanoid } from "@reduxjs/toolkit"
import * as R from "ramda"

const getRanNum = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min)

const getLengths = () => ({
  rent: 1,
  food: getRanNum(4, 15),
  home: getRanNum(2, 8),
  transportation: getRanNum(1, 4),
  utilities: getRanNum(1, 5),
  entertainment: getRanNum(1, 5),
  miscellaneous: getRanNum(0, 5),
  takeout: getRanNum(0, 4),
})

const tags = {
  food: ["tuna", "salmon", "chicken", "bread", "cauliflower", "bonito-flakes"],
  home: ["strings", "tall-shelves", "random-leaves"],
  entertainment: [
    "catnip",
    "scratchables",
    "mice",
    "marie's-kinky-leather-toy",
    "clothes-tags",
  ],
  transportation: ["under-couch-pass"],
  utilities: ["litter", "vet", "fleas-stuff"],
  takeout: ["sushi", "pizza", "fish-tacos"],
}

const pickTags = (n, tags, picked) => {
  if (!n || R.isEmpty(tags)) return picked
  const index = getRanNum(0, tags.length - 1)
  return pickTags(n - 1, R.remove(index, 1, tags), picked.concat(tags[index]))
}

const getTags = category => {
  const array = tags[category]
  if (!array) return []
  let n = getRanNum(0, R.min(array.length, 2))
  return pickTags(n, array, [])
}

const getRandEntry = (y, m, category, payer) => ({
  id: nanoid(8),
  year: y,
  month: m,
  category,
  payer,
  date: `${y}-${m}-${category === "rent" ? "01" : getRanNum(10, 28)}`,
  value: category === "rent" ? 1 : getRanNum(1, 500),
  more: category === "rent" ? "cats don't pay rent" : "",
  tags: getTags(category),
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
      (year === currentYear ? months.slice(0, +currentMonth + 1) : months).map(
        month => getRandomMonthData(year, month),
      ),
    ),
    R.unnest,
    R.sortBy(R.prop("date")),
    R.map(entry => R.objOf(entry.id, entry)),
    R.mergeAll,
  )(years)
}
