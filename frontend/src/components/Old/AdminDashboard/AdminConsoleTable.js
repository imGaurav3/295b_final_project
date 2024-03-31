import React from "react";
import axios from 'axios';
import url from '../../utils/urlconfig';
import jwtDecode from "jwt-decode";


class AdminConsoleTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      List: [],
      List1: [],
      MasterChecked: false,
      SelectedList: [],
      SelectedList1: [],
      reservations: {},
      users: [],
    };
  }

  getReservations = () => {
    axios({
      url: `${url}/getreservations/${jwtDecode(localStorage.getItem("currentUser")).user_id}`,
      method: "get",
    })
      .then(async (response) => {
        if (response.status == 200) {
          await this.setState ({reservations: response.data});
          await this.setState ({List: response.data.flight_items});
          await this.setState ({List1: response.data.hotel_items});
        } else {
          alert("No Reservations found!");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  getUsers = () => {
    axios({
      url: `${url}/admin/getallusers`,
      method: "post",
    })
      .then(async (response) => {
        console.log('------', response.status);
        if (response.status == 200) {
          console.log('------', response.data);
          await this.setState ({users: response.data});
          // await this.setState ({List: response.data.flight_items});
          // await this.setState ({List1: response.data.hotel_items});
        } else {
          alert("No Users found!");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  componentDidMount = async() =>{
    // await this.getReservations();
    await this.getUsers();
  }
  // Update List Item's state and Master Checkbox State
  onItemCheck = async(e, item) =>{
    let tempList = this.state.List;
    tempList.map((user) => {
      if (user.reservation_id === item.reservation_id) {
        user.selected = e.target.checked;
      }
      return user;
    });

    //To Control Master Checkbox State
    const totalItems = this.state.List.length;
    const totalCheckedItems = tempList.filter((e) => e.selected).length;


    // Update State
    await this.setState({
      MasterChecked: totalItems === totalCheckedItems,
      List: tempList,
      SelectedList: this.state.List.filter((e) => e.selected),
    });


    await localStorage.setItem(
      "flight_items",
      JSON.stringify(this.state.SelectedList)
    );
  }

  onItemCheck1 = async(e, item) =>{
    let tempList1 = this.state.List1;
    tempList1.map((user) => {
      if (user.reservation_id === item.reservation_id) {
        user.selected = e.target.checked;
      }
      return user;
    });

    //To Control Master Checkbox State
    const totalItems = this.state.List1.length;
    const totalCheckedItems = tempList1.filter((e) => e.selected).length;

    // Update State
    await this.setState({
      MasterChecked: totalItems === totalCheckedItems,
      List1: tempList1,
      SelectedList1: this.state.List1.filter((e) => e.selected),
    });

    await localStorage.setItem(
      "hotel_items",
      JSON.stringify(this.state.SelectedList1)
    );
  }

  render() {
    return (
      <div className="container">
        

        <h2>All enrolled users: &nbsp;&nbsp;</h2>
          <div class="tableFixHead" >
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">User ID</th>
                  <th scope="col">User name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Phone Number</th>
                  <th scope="col">Weight(in lbs)</th>
                  <th scope="col">Height(in cms)</th>
                </tr>
              </thead>
              <tbody>
                {this.state.users.map((user) => (
                  <tr>
                    <td>{user.user_id}</td>
                    <td>{user.user_name}</td>
                    <td>{user.email}</td>
                    <td>{user.contact_no}</td>
                    <td>{user.weight}</td>
                    <td>{user.height}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        
      </div>
    );
  }
}

export default AdminConsoleTable;