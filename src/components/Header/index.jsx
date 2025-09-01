import { useMediaQuery } from 'react-responsive';
import NavBarDesktopTablet from './NavBarDesktopTablet'
import NavBarMobile from './NavBarMobile';
import useReponsive from '../../hook/useReponsive';

const HeaderPage = () => {
    const {isDesktop,isTablet,isMobile} = useReponsive();

    return (
    <div className='px-4 py-4 bg-gray-700 flex justify-between' >
        <div className='w-30' ><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Pornhub-logo.svg/1200px-Pornhub-logo.svg.png" alt="" /></div>
        <div className='text-white text-2xl font-bold' >
            WELCOME TO THONG'S DARKWEB</div>
        
        {isDesktop && <NavBarDesktopTablet/>}
        {isTablet && <NavBarDesktopTablet/>}   
        {isMobile && <NavBarMobile/>} 
    </div>
  )
}

export default HeaderPage