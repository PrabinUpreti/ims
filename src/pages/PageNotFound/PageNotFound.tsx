import { Button, Flex, Result } from 'antd'
import { Link } from 'react-router-dom'
import { PAGE_NOT_FOUND } from '../../messages'

const PageNotFound: React.FC = () => (
  <Flex justify="center" align="center">
    <Result
      status="404"
      title="404"
      subTitle={PAGE_NOT_FOUND}
      extra={
        <Link to="/">
          <Button type="primary">ड्यासबोर्ड</Button>
        </Link>
      }
    />
  </Flex>
)

export default PageNotFound
