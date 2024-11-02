import { Flex, Switch, Typography } from 'antd'

const { Paragraph, Text } = Typography

interface IFormSwitchProps {
  label: string
  description: string
  defaultChecked?: boolean
  className?: string
  checked?: boolean
  onChange?: (checked: boolean) => void
}

const FormSwitch: React.FC<IFormSwitchProps> = ({
  label,
  description,
  defaultChecked = true,
  className,
  checked,
  onChange,
}) => {
  return (
    <Flex
      justify="space-between"
      align="center"
      style={{
        border: '1px dashed #d5d5d5',
        padding: '12px 16px',
        borderRadius: '8px',
      }}
    >
      <Flex vertical>
        <Text style={{ margin: 0 }}>{label}</Text>
        <Paragraph style={{ margin: 0, color: '#8C8C8C' }}>{description}</Paragraph>
      </Flex>
      <Switch
        defaultChecked={defaultChecked}
        checked={checked}
        onChange={onChange}
        className={className}
      />
    </Flex>
  )
}

export default FormSwitch
