const numberFromTo = (from, to) => Math.round(Math.random() * (to - from)) + from

export const mockObservations = (amount) => {
    const observations = []

    for (let i = 0; i < amount; i += 1) {
        observations.push({
            temperature: numberFromTo(-100, 50),
            createdAt: (new Date()).toISOString(),
        })
    }
    return observations
}

export const mockLocations = (amount) => {
    const locations = []
    const preset = numberFromTo(0, 100)
    for (let i = 0; i < amount; i += 1) {
        const observations = mockObservations(numberFromTo(1, 10))
        locations.push({
            name: `Name${amount}, ${numberFromTo(0, 10000)}`,
            lat: i + preset,
            long: i + preset,
            observations,
        })
    }
    return locations
}

