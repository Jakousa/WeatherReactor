const ABSOLUTE_ZERO = -237.15
const REALLY_HOT = 60

export const validTemperature = n => Number(n) > ABSOLUTE_ZERO && Number(n) < REALLY_HOT

export const isNumeric = n => !Number.isNaN(Number(n))
    && Number.isFinite(Number(n))
    && !Number.isNaN(Number.parseInt(n, 10))
