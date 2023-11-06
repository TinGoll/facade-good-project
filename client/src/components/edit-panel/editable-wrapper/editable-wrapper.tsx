import React from 'react'
import { Box, EmotionProps } from '../../facade-good/facade-good'

interface Props extends EmotionProps<HTMLDivElement> {
    edited?:boolean;
    text?:React.ReactNode;
}

const EditableWrapper: React.FC<Props> = ({
    edited,
    text,
    children,
    ...props
}) => {
  return (
    <Box {...props}>{edited ? children : text}</Box>
  )
}

export default EditableWrapper