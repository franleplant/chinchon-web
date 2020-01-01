/** @jsx jsx */
import React, {useRef} from "react";
import { jsx } from "@emotion/core";
import css from "@emotion/css/macro";
import styled from "@emotion/styled/macro";
import { useDrag, useDrop } from 'react-dnd'
import Card from './Card.js'


// props
// - index
// - card.id
// - sortItem
// - moveCard
export default function SortableCard(props) {
   const ref = useRef(null)
const [, drop] = useDrop({
    accept: props.sortItem,
    hover(item, monitor) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = props.index
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return
      }
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current.getBoundingClientRect()
      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      // Determine mouse position
      const clientOffset = monitor.getClientOffset()
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }
      // Time to actually perform the action
      props.moveCard(dragIndex, hoverIndex)
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex
    },
  })

  const [{ isDragging }, drag] = useDrag({
      item: { type: props.sortItem, id: props.card.id, index: props.index },
        collect: monitor => ({
                    isDragging: monitor.isDragging(),
                        }),
                          })
                            const opacity = isDragging ? 0 : 1
                              drag(drop(ref))


  return (
    <Card ref={ref} {...props}/>
  );
}
