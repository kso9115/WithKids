import logo from '../../assets/images/루피.PNG';
import AttandanceChart from '../../pages/chartAPI/AttandanceChart';
import Charts from '../../pages/chartAPI/AttCharts';
import ChatTest from '../chatMember/ChatTest';
import ChattingManagement2 from '../chatMember/ChattingManagement2';
import ChattingManagement from './../chatMember/ChattingManagement';
// import logo from '../../assets/images/루피.PNG';
import MealChart from '../../pages/chartAPI/MealChart';


function Main() {

    return (
        <>
            
            {/* <img alt="logo" src={logo} width="1000" height="600" /> */}
            {/* <div><ChatTest/></div> */}
            {/* <div><ChattingManagement2/></div> */}
            {/* <div><ChattingManagement/></div> */}
            
            
            <MealChart style={{ width :350, height:300}}/>
        </>
    );
}

export default Main;