interface PaperSize {
  id: string
  name: string
  width: number
  height: number
}

interface PaperSizes {
  poster: {
    portrait: PaperSize[]
    landscape: PaperSize[]
  }
}

export const paperSizes: PaperSizes = {
  poster: {
    portrait: [
      {
        id: '30x46',
        name: 'Poster 30x46',
        width: 300,
        height: 460
      },
      {
        id: '50x70',
        name: 'Poster 50x70',
        width: 500,
        height: 700
      },
      {
        id: '61x91',
        name: 'Poster 61x91',
        width: 610,
        height: 910
      }
    ],
    landscape: [
      {
        id: '46x30',
        name: 'Poster 46x30',
        width: 460,
        height: 300
      },
      {
        id: '70x50',
        name: 'Poster 70x50',
        width: 700,
        height: 500
      },
      {
        id: '91x61',
        name: 'Poster 91x61',
        width: 910,
        height: 610
      }
    ]
  }
}
