import "./CSS/LoadingAnimation.css";
const Another = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="container">
        <div className="macbook">
          <div className="macbook__topBord">
            <div className="macbook__display">
              <div className="macbook__load"></div>
            </div>
          </div>
          <div className="macbook__underBord">
            <div className="macbook__keybord">
              <div className="keybord">
                <div className="keybord__touchbar"></div>
                <ul className="keybord__keyBox">
                  <li className="keybord__key key--01"></li>
                  <li className="keybord__key key--02"></li>
                  <li className="keybord__key key--03"></li>
                  <li className="keybord__key key--04"></li>
                  <li className="keybord__key key--05"></li>
                  <li className="keybord__key key--06"></li>
                  <li className="keybord__key key--07"></li>
                  <li className="keybord__key key--08"></li>
                  <li className="keybord__key key--09"></li>
                  <li className="keybord__key key--10"></li>
                  <li className="keybord__key key--11"></li>
                  <li className="keybord__key key--12"></li>
                  <li className="keybord__key key--13"></li>
                </ul>
                <ul className="keybord__keyBox--under">
                  <li className="keybord__key key--14"></li>
                  <li className="keybord__key key--15"></li>
                  <li className="keybord__key key--16"></li>
                  <li className="keybord__key key--17"></li>
                  <li className="keybord__key key--18"></li>
                  <li className="keybord__key key--19"></li>
                  <li className="keybord__key key--20"></li>
                  <li className="keybord__key key--21"></li>
                  <li className="keybord__key key--22"></li>
                  <li className="keybord__key key--23"></li>
                  <li className="keybord__key key--24"></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Another;
