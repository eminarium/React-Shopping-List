import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight, faCircle, faCheckCircle, faPlus, faTimes } from '@fortawesome/free-solid-svg-icons'
import './index.css'

function App() {

  const [items, setItems] = useState([
    { id: 1, itemName: 'item 1', quantity: 1, isSelected: false },
    { id: 2, itemName: 'item 2', quantity: 3, isSelected: true },
    { id: 3, itemName: 'item 3', quantity: 2, isSelected: false },
  ]);

  const [inputValue, setInputValue] = useState('')

  const [totalItemCount, setTotalItemCount] = useState(6)

  const handleAddButtonClick = () => {

    if (inputValue.trim().length === 0)
      return;

    const newItem = {
      id: Math.random(),
      itemName: inputValue,
      quantity: 1,
      isSelected: false
    }

    const newItems = [...items, newItem]

    setItems(newItems)
    setTotalItemCount(totalItemCount + 1)
  }

  const handleQuantityIncrease = (index) => {
    const newItems = [...items]

    newItems[index].quantity++

    setItems(newItems)
    setTotalItemCount(totalItemCount + 1)
  }

  const handleQuantityDecrease = (index) => {
    const newItems = [...items]

    if (newItems[index].quantity > 1) {
      newItems[index].quantity--
      setItems(newItems)
      setTotalItemCount(totalItemCount - 1)
    }
  }

  const toggleComplete = (index) => {
    const newItems = [...items]

    newItems[index].isSelected = !newItems[index].isSelected

    setItems(newItems)
  }

  const removeItem = (index) => {
    const newItems = [...items]
    const removedElements = newItems.splice(index, 1)
    setItems(newItems)
    setTotalItemCount(totalItemCount - removedElements[0].quantity)
  }

  return (
    <div className="App">
      <h1>Shopping List</h1>
      <div className = "add-item-box">
        <input 
          className = "add-item-input" 
          placeholder = "Add an item" 
          onChange = {(event) => setInputValue(event.target.value)}
        />
        <FontAwesomeIcon 
          icon = {faPlus} 
          onClick = {handleAddButtonClick}
        />
      </div>

      <div className='total'>{totalItemCount} total items</div>

      <div className = "item-list">
        {
          items.map((item, index) => (
            <div className="item-container" key = {item.id}>
              <div 
                className = "item-name"
                onClick = {() => toggleComplete(index)}
              >
                {
                  item.isSelected ? (
                    <>
                      <FontAwesomeIcon icon = {faCheckCircle} />
                      <span className = "completed">{ item.itemName }</span>
                    </>
                  ) :
                  (
                    <>
                      <FontAwesomeIcon icon = { faCircle } />
                      <span>{item.itemName }</span>
                    </>
                  )
                }
              </div>

              <div className="quantity">
                <button>
                  <FontAwesomeIcon 
                    icon = {faChevronLeft}
                    color= "#69a9d3"
                    onClick={() => handleQuantityDecrease(index)}
                  />
                </button>
                <span className = "item-quantity">{ item.quantity }</span>
                <button>
                  <FontAwesomeIcon 
                    icon={faChevronRight} 
                    color="#69a9d3"
                    onClick={() => handleQuantityIncrease(index)}
                  />
                </button>
                <button className = "remove">
                  <FontAwesomeIcon
                    icon={faTimes}
                    color = "red"
                    onClick={() => removeItem(index)}
                  />
                </button>

              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default App;
