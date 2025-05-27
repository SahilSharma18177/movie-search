import { useState } from "react"
import './App.css'

const CheckBoxes = ({ data, checked, setChecked }) => {

  const handleCheckedState = (isChecked, node) => {
    // recursive function to update the checked state of children 
    const checkChildren = (newState, node) => {
      node.children?.forEach((child) => {
        newState[child.id] = isChecked
        if (child?.children) {
          checkChildren(newState, child)
        }
      })
    }

    
    setChecked((prev) => {
      const newState = { ...prev, [node.id]: isChecked }
      checkChildren(newState, node)   // check all children if parent is checked
      
      // if all children are checked then parent should also be checked
      const verifyChecked = (node) => {
        if (!node.children) {
          return newState[node.id] || false;
        }
        const allChildrenChecked = node.children.every(child => verifyChecked(child))
        newState[node.id] = allChildrenChecked
        return allChildrenChecked;
      }

      data.forEach(node => verifyChecked(node)) 

      return newState
    })
  }

  return (
    <div>
      {
        data.map((node) => (
          <div key={node.id} className="checkBox">
            <input type="checkbox" id={node.id} checked={checked[node.id] || false} onChange={(e) => handleCheckedState(e.target.checked, node)} />
            <label htmlFor={node.id}>{node.name}</label>
            {
              (node.children) &&
              <CheckBoxes data={node.children} checked={checked} setChecked={setChecked} />
            }
          </div>
        ))
      }
    </div>
  )
}

const CheckBoxDemo = () => {

  const data = [
    {
      id: 1,
      name: "Fruits",
      children: [
        {
          id: 2,
          name: "Citrus",
          children: [
            {
              id: 3,
              name: "Orange"
            },

            {
              id: 4,
              name: "Lemon"
            },
          ]
        },
        {
          id: 5,
          name: "Berries",
          children: [
            {
              id: 6,
              name: "Blueberry"
            },

            {
              id: 7,
              name: "Strawberry"
            },
          ]
        }
      ]
    },
    {
      id: 8,
      name: "don"
    },
    {
      id: 9,
      name: "Iykyk",
      children: [
        {
          id: 10,
          name: 'No name'
        },
        {
          id: 11,
          name: 'John'
        },

      ]
    }
  ]
  const [checked, setChecked] = useState({})   // {id: true, ..}
  return (
    <CheckBoxes data={data} checked={checked} setChecked={setChecked} />
  )
}

export default CheckBoxDemo