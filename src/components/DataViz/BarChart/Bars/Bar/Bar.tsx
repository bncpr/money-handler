
export const Bar = ({ d, hovered, setHovered }: any) => {
  return (
    <rect
      as='rect'
      {...d}
      onMouseOver={() => setHovered(d.name)}
      onMouseOut={() => setHovered("")}
      style={{
        opacity: hovered && hovered !== d.name ? "0.4" : "1",
        stroke: hovered === d.name ? "black" : "",
        transition: "all ease-out 700ms 100ms",
        transitionProperty: "opacity, stroke",
      }}
    />
  )
}
