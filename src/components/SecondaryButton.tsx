import { Button } from 'antd'
import React from 'react'

interface ISecondaryButtonProps {
  onClick?: () => void
  text?: string
}

const SecondaryButton: React.FC<ISecondaryButtonProps> = ({
  onClick,
  text = 'विवरण प्रिन्ट गर्नुहोस्',
}) => {
  return (
    <Button
      size="middle"
      style={{ backgroundColor: '#ecf3ff', border: 0, color: '#3B82F6' }}
      onClick={onClick}
    >
      {text}
    </Button>
  )
}

export default SecondaryButton
