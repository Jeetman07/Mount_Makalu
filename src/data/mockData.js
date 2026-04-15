export const mockProblems = [
  {
    id: 1,
    title: 'Tomato Leaf Disease',
    description: 'Yellow spots are appearing on tomato leaves.',
    status: 'Pending'
  },
  {
    id: 2,
    title: 'Rice Pest Attack',
    description: 'Small insects are damaging rice plants.',
    status: 'Solved'
  }
]

export const mockWeather = [
  {
    id: 1,
    location: 'Bardibas',
    temperature: '29°C',
    humidity: '68%',
    condition: 'Sunny'
  },
  {
    id: 2,
    location: 'Espoo',
    temperature: '10°C',
    humidity: '75%',
    condition: 'Cloudy'
  }
]

export const mockTips = [
  {
    id: 1,
    title: 'Water Early Morning',
    description: 'Water crops early in the morning to reduce evaporation.'
  },
  {
    id: 2,
    title: 'Check Leaves Daily',
    description: 'Inspect leaves every day to detect diseases early.'
  }
]

export const mockResponses = [
  {
    id: 1,
    problemId: 1,
    role: 'Expert',
    message: 'Use a suitable fungicide and remove damaged leaves.'
  },
  {
    id: 2,
    problemId: 1,
    role: 'Admin',
    message: 'Monitor the tomato plants for one week after treatment.'
  }
]