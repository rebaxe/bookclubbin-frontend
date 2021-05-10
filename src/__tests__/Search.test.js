import { shallow } from 'enzyme'
import Search from '../components/Search/Search'

describe('<Search />', () => {
  const search = shallow(<Search />)
  it('should match the snapshot', () => {
    expect(search.html()).toMatchSnapshot()
  })
})
