import { createContext, useState, useEffect } from "react"

//  let's create a context
const feedbackContext = createContext()

//  we need a provider to wrap the components with
export const FeedbackProvider = ({ children }) => {
  // let's use real data instead of fake
  const [feedback, setFeedback] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    fetchFeedback()
  }, [])

  //    fetch feedback
  const fetchFeedback = async () => {
    const response = await fetch("/feedback?_sort=id&_order=desc")
    console.log(response)
    const data = await response.json()
    console.log(data)
    // set feedback to the fetched data
    setFeedback(data)
    // stop the spinner
    setIsLoading(false)
  }

  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false,
  })
  // delete feedback
  const deleteFeedback = async (id) => {
    // set feedback to feedback minus what we are deleting
    if (window.confirm("Are you sure you want to delete?")) {
      await fetch(`/feedback/${id}`, {
        method: "DELETE",
      })

      setFeedback(feedback.filter((item) => item.id !== id))
    }
  }
  // add feedback
  const addFeedback = async (newFeedback) => {
    const response = await fetch("/feedback", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newFeedback),
    })
    const data = await response.json()
    setFeedback([data, ...feedback])
  }
  // edit feedback
  const editFeedback = (item) => {
    setFeedbackEdit({
      item,
      edit: true,
    })
  }

  const updateFeedback = async (id, updateItem) => {
    // find the item, and update it
    const response = await fetch(`/feedback/${id}`, {
      method: "PUT",
      body: JSON.stringify(updateItem),
      headers: {
        "Content-Type": "application/json",
      },
    })
    const data = await response.json()
    setFeedback(
      feedback.map((item) => (item.id === id ? { ...item, ...data } : item))
    )
    setFeedbackEdit({
      item: {},
      edit: false,
    })
  }

  return (
    <feedbackContext.Provider
      value={{
        feedback,
        feedbackEdit,
        isLoading,
        deleteFeedback,
        addFeedback,
        editFeedback,
        updateFeedback,
      }}
    >
      {children}
    </feedbackContext.Provider>
  )
}

export default feedbackContext
