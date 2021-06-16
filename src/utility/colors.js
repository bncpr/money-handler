const colors1 = [
  "#E3BA22",
  "#E58429",
  "#BD2D28",
  "#D15A86",
  "#8E6C8A",
  "#6B99A1",
  "#42A5B3",
  "#0F8C79",
  "#6BBBA1",
  "#5C8100",
]

const colors2 = [
  "#F2DA57",
  "#F6B656",
  "#E25A42",
  "#DCBDCF",
  "#B396AD",
  "#B0CBDB",
  "#33B6D0",
  "#7ABFCC",
  "#C8D7A1",
  "#A0B700",
]

const colors3 = [
  "#B08B12",
  "#BA5F06",
  "#8C3B00",
  "#6D191B",
  "#842854",
  "#5F7186",
  "#193556",
  "#137B80",
  "#144847",
  "#254E00",
]

const colors = colors1.concat(colors2).concat(colors3)

function* generateColors(colors) {
  let i = 0
  while (true) {
    yield colors[i]
    i++
    i = i % colors.length
  }
}

export const colorsGenerator = generateColors(colors)
export const getColorsGenerator = () => generateColors(colors)
