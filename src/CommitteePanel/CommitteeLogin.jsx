
const CommitteeLogin = () => {
    return (
        <div>
            <svg
      className="login__blob"
      viewBox="0 0 566 840"
      xmlns="http://www.w3.org/2000/svg"
    >
      <mask id="mask0" mask-type="alpha">
        <path
          d="M342.407 73.6315C388.53 56.4007 394.378 17.3643 391.538 
            0H566V840H0C14.5385 834.991 100.266 804.436 77.2046 707.263C49.6393 
            591.11 115.306 518.927 176.468 488.873C363.385 397.026 156.98 302.824 
            167.945 179.32C173.46 117.209 284.755 95.1699 342.407 73.6315Z"
        />
      </mask>

      <g mask="url(#mask0)">
        <path
          d="M342.407 73.6315C388.53 56.4007 394.378 17.3643 391.538 
            0H566V840H0C14.5385 834.991 100.266 804.436 77.2046 707.263C49.6393 
            591.11 115.306 518.927 176.468 488.873C363.385 397.026 156.98 302.824 
            167.945 179.32C173.46 117.209 284.755 95.1699 342.407 73.6315Z"
        />

        
        <image className="login__img" href="/photo/bg-img.jpg" />
      </g>
    </svg>

    <div className="login container grid" id="loginAccessRegister">
      
      <div className="login__access">
        <h1 className="login__title">Log in to your account.</h1>

        <div className="login__area">
          <htmlForm action="" className="login__htmlForm">
            <div className="login__content grid">
              <div className="login__box">
                <input
                  type="email"
                  id="email"
                  required
                  placeholder=" "
                  className="login__input"
                />
                <label htmlFor="email" className="login__label">Email</label>

                <i className="ri-mail-fill login__icon"></i>
              </div>

              <div className="login__box">
                <input
                  type="password"
                  id="password"
                  required
                  placeholder=" "
                  className="login__input"
                />
                <label htmlFor="password" className="login__label">Password</label>

                <i
                  className="ri-eye-off-fill login__icon login__password"
                  id="loginPassword"
                ></i>
              </div>
            </div>

            <a href="#" className="login__htmlForgot">htmlForgot your password?</a>

            <button type="submit" className="login__button">Login</button>
          </htmlForm>

          <div className="login__social">
            <p className="login__social-title">Or login with</p>

            <div className="login__social-links">
              <a href="#" className="login__social-link">
                <img
                  src="/photo/icon-google.svg"
                  alt="image"
                  className="login__social-img"
                />
              </a>

              <a href="#" className="login__social-link">
                <img
                  src="/photo/icon-facebook.svg"
                  alt="image"
                  className="login__social-img"
                />
              </a>

              <a href="#" className="login__social-link">
                <img
                  src="/photo/icon-apple.svg"
                  alt="image"
                  className="login__social-img"
                />
              </a>
            </div>
          </div>

          <p className="login__switch">
            Don't have an account?
            <button id="loginButtonRegister">Create Account</button>
          </p>
        </div>
      </div>

      
      <div className="login__register">
        <h1 className="login__title">Create new account.</h1>

        <div className="login__area">
          <htmlForm action="" className="login__htmlForm">
            <div className="login__content grid">
              <div className="login__group grid">
                <div className="login__box">
                  <input
                    type="text"
                    id="names"
                    required
                    placeholder=" "
                    className="login__input"
                  />
                  <label htmlFor="names" className="login__label">Names</label>

                  <i className="ri-id-card-fill login__icon"></i>
                </div>

                <div className="login__box">
                  <input
                    type="text"
                    id="surnames"
                    required
                    placeholder=" "
                    className="login__input"
                  />
                  <label htmlFor="surnames" className="login__label">Surnames</label>

                  <i className="ri-id-card-fill login__icon"></i>
                </div>
              </div>

              <div className="login__box">
                <input
                  type="email"
                  id="emailCreate"
                  required
                  placeholder=" "
                  className="login__input"
                />
                <label htmlFor="emailCreate" className="login__label">Email</label>

                <i className="ri-mail-fill login__icon"></i>
              </div>

              <div className="login__box">
                <input
                  type="password"
                  id="passwordCreate"
                  required
                  placeholder=" "
                  className="login__input"
                />
                <label htmlFor="passwordCreate" className="login__label"
                  >Password</label
                >

                <i
                  className="ri-eye-off-fill login__icon login__password"
                  id="loginPasswordCreate"
                ></i>
              </div>
            </div>

            <button type="submit" className="login__button">Create account</button>
          </htmlForm>

          <p className="login__switch">
            Already have an account?
            <button id="loginButtonAccess">Log In</button>
          </p>
        </div>
      </div>
    </div>
        </div>
    );
};

export default CommitteeLogin;