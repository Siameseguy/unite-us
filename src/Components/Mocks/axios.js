export const fakeData = {
  data: {
    data: [
      {
        display_name: 'item1',
        id: 1
      }, {
        display_name: 'item2',
        id: 2
      }
    ]
  }
}

export default async() => {
  const response = await new Promise((resolve) => {
    resolve(fakeData)
  })

  return response;
}