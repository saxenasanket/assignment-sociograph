import React from "react";
import { Link } from "react-router-dom";
import { history } from "./history";
import { withRouter } from "react-router-dom";
import Button from "react-bootstrap/Button";

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userID: "",
      password: "",
      submitted: false,
      checked: false
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleInputChange() {
    this.setState({
      checked: true
    });
  }

  render() {
    const { userID, password, submitted } = this.state;
    return (
      <>
        <div className="login-wrapper">
          <div className="login">
            <center>
              <h5>Welcome to SocioGraph, please Sign-in </h5>
            </center>

            <br></br>

            <form name="form" onSubmit={this.handleSubmit}>
              <div
                className={
                  "form-group" + (submitted && !userID ? " has-error" : "")
                }
                id="username"
              >
                <input
                  type="number"
                  className="form-control"
                  name="userID"
                  value={userID}
                  onChange={this.handleChange}
                  placeholder="userID"
                />
                {submitted && !userID && (
                  <div className="help-block">userID is required</div>
                )}
              </div>
              <div
                className={
                  "form-group" + (submitted && !password ? " has-error" : "")
                }
                id="password"
              >
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  value={password}
                  onChange={this.handleChange}
                  placeholder="password"
                />
                {submitted && !password && (
                  <div className="help-block">Password is required</div>
                )}
              </div>

              <center>
                <Button
                  href="/products"
                  onClick={() =>
                    localStorage.setItem("user-ID", this.state.userID)
                  }
                  variant="success"
                >
                  Login
                </Button>
              </center>
            </form>
          </div>
        </div>
      </>
    );
  }
}

export default withRouter(LoginPage);
