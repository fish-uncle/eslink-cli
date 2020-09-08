import React from 'react'

interface Point {
  readonly x: number
  readonly y: number
}
let p1: Point = { x: 10, y: 20 }

function Test() {
  return (
    <div>
      test
      {p1.x}
    </div>
  )
}

export default Test