export const sortCompMap = {
  ascend: {
    number: (a: number, b: number) => a - b,
    string: (a: string, b: string) => a.localeCompare(b),
  },
  descend: {
    number: (a: number, b: number) => b - a,
    string: (a: string, b: string) => b.localeCompare(a),
  },
} as const
