import { select } from "d3-selection"
import { useEffect, useRef } from "react"

export const Rect = ({ key, x, y, width, height, color, title }) => {
  const ref = useRef()

  useEffect(() => {
    const rect = select(ref)
    
  })

  return (
    <rect key={key} x={x} y={0} width={width} height={0} fill={color} ref={ref}>
      <title>{title}</title>
    </rect>
  )
}
