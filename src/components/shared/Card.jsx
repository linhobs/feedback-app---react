import React from "react"
import PropTypes from "prop-types"
const Card = ({ children, reversed }) => {
  // if reverse is true, add reverse to the card name
  return <div className={`card ${reversed && "reverse"}`}>{children}</div>
}

Card.defaultProps = {
  reversed: false,
}
Card.prototypes = {
  children: PropTypes.node.isRequired,
  reversed: PropTypes.bool,
}

export default Card
