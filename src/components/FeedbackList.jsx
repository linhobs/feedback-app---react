import { motion, AnimatePresence } from "framer-motion"
import { useContext } from "react"
import feedbackContext from "../context/FeedbackContext"
import React from "react"
import Spinner from "./shared/Spinner"

import FeedbackItem from "./FeedbackItem"
const FeedbackList = () => {
  //  using value from context instead of prop drilling
  const { feedback, isLoading } = useContext(feedbackContext)
  if (!isLoading && (!feedback || feedback.length === 0)) {
    return <p> No feedback available</p>
  }
  return isLoading ? (
    <Spinner />
  ) : (
    <div className="feedback-list">
      <AnimatePresence>
        {feedback.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <FeedbackItem key={item.id} item={item} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )

  // return (
  //   <div className="feedback-list">
  //     {feedback.map((item) => (
  //       <FeedbackItem
  //         key={item.id}
  //         item={item}
  //         handleDelete={() => handleDelete(item.id)}
  //       />
  //     ))}
  //   </div>
  // )
}

export default FeedbackList
