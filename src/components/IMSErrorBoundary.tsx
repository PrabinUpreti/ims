import React, { Component, ReactNode } from 'react'
import { Button, Result } from 'antd'
import { Location, useLocation } from 'react-router-dom'

const IMSErrorFallback: React.FC = () => {
  const handleRefresh = () => {
    window.location.reload()
  }

  return (
    <Result
      className="error-boundary"
      status="500"
      title="केही समस्याका कारणले यो पृष्ठ लोड गर्न सकिएन ।"
      subTitle="कृपया केहि समय पछि पुन: प्रयास गर्नुहोस् ।  रिफ्रेस गर्नका लागि तल दिइएको  रिफ्रेस बटन प्रयोग गर्नुहोस् ।"
      extra={
        <Button onClick={handleRefresh} type="primary">
          रिफ्रेस गर्नुहोस्
        </Button>
      }
    />
  )
}

interface IMSBaseErrorBoundaryProps {
  children: ReactNode
  location?: Location
}

interface IMSBaseErrorBoundaryState {
  hasError: boolean
}

export class IMSBaseErrorBoundary extends Component<
  IMSBaseErrorBoundaryProps,
  IMSBaseErrorBoundaryState
> {
  constructor(props: IMSBaseErrorBoundaryProps) {
    super(props)
    this.state = {
      hasError: false,
    }
  }

  componentDidUpdate(prevProps: IMSBaseErrorBoundaryProps) {
    if (this.props.location !== prevProps.location) {
      // Reset the error state if location changes
      this.setState({ hasError: false })
    }
  }

  static getDerivedStateFromError(): IMSBaseErrorBoundaryState {
    return { hasError: true }
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return <IMSErrorFallback />
    }

    return this.props.children
  }
}

interface IMSErrorBoundaryProps {
  children: ReactNode
}

const IMSErrorBoundary: React.FC<IMSErrorBoundaryProps> = ({ children }) => {
  const location = useLocation()
  return <IMSBaseErrorBoundary location={location}>{children}</IMSBaseErrorBoundary>
}

export default IMSErrorBoundary
