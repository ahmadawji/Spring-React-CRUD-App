import React, { Component } from "react";
import EmployeeService from "../services/EmployeeService";

class CreateEmployeeComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      componentHeader: "",
      id: this.props.match.params.id,
      firstName: "",
      lastName: "",
      emailId: "",
    };
    this.changeInputHandler = this.changeInputHandler.bind(this);
    this.saveEmployee = this.saveEmployee.bind(this);
  }
  changeInputHandler(e) {
    const name = e.target.name;
    this.setState({ [name]: e.target.value });
  }

  saveEmployee(e) {
    e.preventDefault();
    let employee = {};
    employee.id = this.state.id;
    employee.firstName = this.state.firstName;
    employee.lastName = this.state.lastName;
    employee.emailId = this.state.emailId;
    console.log(JSON.stringify(employee));
    if (employee.id === "-1") {
      EmployeeService.createEmployee(employee).then((res) => {
        this.props.history.push("/employees");
      });
    } else {
      EmployeeService.updateEmployee(employee.id, employee).then((res) => {
        this.props.history.push("/employees");
      });
    }
  }

  cancel(e) {
    e.preventDefault();
    this.setState({
      firstName: "",
      lastName: "",
      emailId: "",
    });
    this.props.history.push("/");
  }

  componentDidMount() {
    const id = this.state.id;
    console.log("id ", id);
    if (id !== "-1") {
      EmployeeService.getEmployeeById(this.state.id).then((res) => {
        let employee = res.data;
        console.log(employee);
        this.setState({
          componentHeader: "Update Employee",
          firstName: employee.firstName,
          lastName: employee.lastName,
          emailId: employee.emailId,
        });
      });
    } else {
      this.setState({
        componentHeader: "Add Employee",
      });
    }
  }

  render() {
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="card col-md-6 offset-md-3">
              <div className="card-body">
                <div className="card-title">
                  <h1 className="text-center">{this.state.componentHeader}</h1>
                </div>
                <form>
                  <div className="form-group">
                    <label>First Name:</label>
                    <input
                      placeholder="First Name: "
                      name="firstName"
                      className="form-control"
                      value={this.state.firstName}
                      onChange={this.changeInputHandler}></input>
                  </div>
                  <div className="form-group">
                    <label>Last Name:</label>
                    <input
                      placeholder="Last Name: "
                      name="lastName"
                      className="form-control"
                      value={this.state.lastName}
                      onChange={this.changeInputHandler}></input>
                  </div>
                  <div className="form-group">
                    <label>Email:</label>
                    <input
                      placeholder="Email: "
                      name="emailId"
                      className="form-control"
                      value={this.state.emailId}
                      onChange={this.changeInputHandler}></input>
                  </div>
                  <button
                    className="btn btn-success"
                    onClick={this.saveEmployee}>
                    Save
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={this.cancel.bind(this)}
                    style={{ marginLeft: "10px" }}>
                    Cancel
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateEmployeeComponent;
