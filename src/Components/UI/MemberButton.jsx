import './CSS/MemberButton.css';
const MemberButton = () => {
    return (
        <div className="flex justify-center">
            <a className="mb-12" href="/Members"><button  className="sci-fi-button flex">View All Members</button></a>
        </div>
    );
};

export default MemberButton;