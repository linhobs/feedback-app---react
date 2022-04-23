import React from "react"
import { useState, useContext, useEffect } from "react"
import feedbackContext from "../context/FeedbackContext"
import RatingSelect from "./RatingSelect"
import Button from "./shared/Button"
import Card from "./shared/Card"

const FeedbackForm = () => {
  const { addFeedback, feedbackEdit, updateFeedback } =
    useContext(feedbackContext)

  const [text, setText] = useState("")
  const [btnDisabled, setBtnDisabled] = useState(true)
  const [message, setMessage] = useState("")
  const [rating, setRating] = useState(10)
  //  side effect with useeffect
  // empty array after callback means it will run when component loads
  useEffect(() => {
    // wen we click on something to edit
    // populate the form once again.
    if (feedbackEdit.edit === true) {
      setBtnDisabled(false)
      setText(feedbackEdit.item.text)
      setRating(feedbackEdit.item.rating)
    }
  }, [feedbackEdit])

  const handleTextChange = (e) => {
    if (text === "") {
      setBtnDisabled(true)
      setMessage(null)
    } else if (text !== "" && text.trim().length <= 10) {
      setBtnDisabled(true)
      setMessage("Text must be at least 10 characters")
    } else {
      setMessage(null)
      setBtnDisabled(false)
    }
    setText(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (text.trim().length > 10) {
      const newFeeback = {
        text,
        rating,
      }
      if (feedbackEdit.edit === true) {
        // update feedback
        updateFeedback(feedbackEdit.item.id, newFeeback)
      } else {
        addFeedback(newFeeback)
      }
      setText("")
    }
  }
  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <h2>How would you rate your service with us ?</h2>
        <RatingSelect select={(rating) => setRating(rating)} />
        <div className="input-group">
          <input
            onChange={handleTextChange}
            type="text"
            placeholder="Write a review"
            value={text}
          />
          <Button type="submit" isDisabled={btnDisabled}>
            Send
          </Button>
        </div>
        {message && <div>{message}</div>}
      </form>
    </Card>
  )
}

export default FeedbackForm
