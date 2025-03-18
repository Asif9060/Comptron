import RaihanSir from '../assets/images/pooto/M. Raihan.jpg';
import InzamamSir from '../assets/images/pooto/Md. Inzamam-Ul-Hossain.jpg';
import PeyaMaam from '../assets/images/pooto/Zahrul Jannat Peya.jpg';
import Menu from '../Components/Layout/Menu';
import TeacherCard from "../Components/UI/TeacherCard";

const AboutPage = () => {

    const contents = [
        {
            img : [RaihanSir],
            name : 'M. Raihan',
            position : 'Advisor',
            url :{
                facebook: 'https://www.facebook.com/memraihan',
            }
        },
        
        {
            img : [InzamamSir],
            name : 'Md. Inzamam-Ul-Hossain',
            position : 'Moderator',
            url :{
                facebook: '',
            }
        },

        {
            img : [PeyaMaam],
            name : 'Zahrul Jannat Peya',
            position : 'Moderator',
            url :{
                facebook: '',
            }
        }

    ]

    return (
        <div className='bg-white'>

            <h1 className="text-[50px]">Temporary Testing Zone</h1>


            <br />
            <br />
            <br />
            <br />

            <div className='flex justify-center gap-7'>
                <TeacherCard cont = {contents[0]}></TeacherCard>
                <TeacherCard cont = {contents[1]}></TeacherCard>
                <TeacherCard cont = {contents[2]}></TeacherCard>
            </div>

            

            <Menu></Menu>
        
        </div>
    );
};

export default AboutPage;