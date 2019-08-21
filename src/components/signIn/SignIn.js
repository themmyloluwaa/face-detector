import React from "react";

class SignIn extends React.Component {
  state = {
    signInEmail: "",
    signInPassword: ""
  };

  onEmailChange = event => {
    this.setState({ signInEmail: event.target.value });
  };
  onPasswordChange = event => {
    this.setState({ signInPassword: event.target.value });
  };
  onSubmitSignIn = event => {
    event.preventDefault();
    fetch("https://server-fd.herokuapp.com/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: this.state.signInEmail,
        password: this.state.signInPassword
      })
    })
      .then(res => res.json())
      .then(user => {
        if (user.id) {
          this.props.loadUser(user);
          this.props.onRouteChange("Home");
        } else {
          alert("wrong Username and Password");
        }
      });
  };
  render() {
    const { onRouteChange } = this.props;
    return (
      <div>
        <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
          <main className="pa4 black-80">
            <form className="measure ">
              <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                <legend className="f1 fw6 ph0 mh0 white">Sign In</legend>
                <div className="mt3">
                  <label
                    className="db fw6 lh-copy f6 white"
                    htmlFor="email-address"
                  >
                    Email
                  </label>
                  <input
                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                    type="email"
                    name="email-address"
                    id="email-address"
                    onChange={this.onEmailChange}
                  />
                </div>
                <div className="mv3">
                  <label className="db fw6 lh-copy white f6" htmlFor="password">
                    Password
                  </label>
                  <input
                    className="b pa2 input-reset ba bg-transparent  hover-bg-black hover-white w-100"
                    type="password"
                    name="password"
                    id="password"
                    onChange={this.onPasswordChange}
                  />
                </div>
              </fieldset>
              <div className="">
                <input
                  className="b ph3 pv2 input-reset ba b--black bg-transparent white grow pointer f6 dib"
                  type="submit"
                  value="Sign in"
                  onClick={this.onSubmitSignIn}
                />
              </div>
              <div className="lh-copy mt3">
                <p
                  href="#0"
                  onClick={() => onRouteChange("register")}
                  className="f4 link dim black db pointer white"
                >
                  Register
                </p>
              </div>
            </form>
          </main>
        </article>
      </div>
    );
  }
}

export default SignIn;
