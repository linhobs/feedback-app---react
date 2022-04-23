import React from "react"
import { useContext } from "react"
import PropTypes from "prop-types"
import { FaTimes, FaEdit } from "react-icons/fa"
import Card from "./shared/Card"
import feedbackContext from "../context/FeedbackContext"
const FeedbackItem = ({ item }) => {
  const { deleteFeedback, editFeedback } = useContext(feedbackContext)
  return (
    <Card className="card" reversed={false}>
      <div className="num-display">{item.rating}</div>
      <button className="close" onClick={() => deleteFeedback(item.id)}>
        <FaTimes color="purple" />
      </button>
      <button className="edit" onClick={() => editFeedback(item)}>
        <FaEdit color="purple" />
      </button>
      <div className="text-display">{item.text}</div>
    </Card>
  )
}
FeedbackItem.propTypes = {
  item: PropTypes.object.isRequired,
}

export default FeedbackItem