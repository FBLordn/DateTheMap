import { CSSProperties } from "react"


export default function WorldMap() {
  const css:CSSProperties={"maxWidth":"100%"}
  return (
    <img src="src/assets/image.png" alt="tempimage" height="100%" width="auto" style={css} ></img>
  )
}