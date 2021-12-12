export const random = (min = 0, max = 1): number => {
  return Math.round(min - 0.5 + Math.random() * (max - min + 1))
}

export const randomInArray = <T,>(arr: T[]): T => {
  return arr[random(0, arr.length - 1)]
}
