import useIsMobile from '../../hooks/useIsMobile';
import Desktop from './Desktop';
import Mobile from './Mobile';
import './style.css';

const Navbar = () => {
  const isMobile = useIsMobile();

  return isMobile ? <Mobile /> : <Desktop />;
};
export default Navbar;
