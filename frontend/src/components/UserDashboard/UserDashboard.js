/* eslint-disable */
import React, { PureComponent } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../../App.css';
import Navbar from '../Common/Navbar';
import Button from 'react-bootstrap/Button';
import { MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';
import { Modal } from 'react-bootstrap';
import { home } from 'react-bootstrap-icons';
import ChatBox from '../Common/ChatBox';
import { Box, Typography } from '@mui/material';
import axios from 'axios';
import url from '../../utils/urlconfig';
import { Link } from 'react-router-dom';
import jwtDecode from "jwt-decode";
import DisplayTableComponent from './DisplayTable';

class UserDashboard extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			show: false,
			activityname: '',
			activitytime: '',
			gymlocation: ''
		};

		this.handleOpen = this.handleOpen.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.logActivity = this.logActivity.bind(this);
	}

	handleOpen() {
		console.log('is it here', this.state.show);
		this.setState({ show: true });
		console.log('is it here', this.state.show);
	}

	handleClose = async () => {
		await this.setState({ show: false });
	};
	//userId, activityName, mins, location
	logActivity = () => {
		const data = {
			userId: jwtDecode(localStorage.getItem("currentUser")).user_id,
			activityName: this.state.activityname,
			mins: this.state.activitytime,
			location: this.state.gymlocation,
		};
		axios({
			url: `${url}/userdashboard/log`,
			method: 'post',
			data: data,
		})
			.then(async (response) => {
				await this.setState({ show: false });
			})
			.catch(function(error) {
				alert(error);
			});
	};

	activityNamehandler = (e) => {
		this.setState({
			activityname: e.target.value,
		});
	};

	activityTimehandler = (e) => {
		this.setState({
			activitytime: e.target.value,
		});
	};

	selectLocationhandler = (e) => {
		this.setState({
			gymlocation: e.target.value,
		});
	};

	render() {
		return (
			<div>
				<div>
					<Navbar />
				</div>
				<div className="Home-form-container">
					<div className="my-5 gradient-form">
						<br></br>
						<br></br>
						<MDBRow>
							<MDBCol>
								<div>
									<Button variant="danger" size="lg">
										&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
										<Link to="/myactivities" style={{ color: 'white' }}>
											View Activity  
										</Link>
										&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
									</Button>
								</div>
								<br></br>
								<div>
									<Button variant="danger" size="lg">
										&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
										<Link to="/bookclass" style={{ color: 'white' }}>
											Book Class&nbsp;&nbsp;
										</Link>
										&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
									</Button>
								</div>
								<br></br>
								<div>
									<Button variant="danger" size="lg" onClick={this.handleOpen}>
										&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Log Activity
										&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
									</Button>
									<Modal
										show={this.state.show}
										onHide={this.handleClose}
										onClose={this.handleClose}
										aria-labelledby="modal-modal-title"
										aria-describedby="modal-modal-description"
									>
										<Box className="Auth-form">
											<Typography id="modal-modal-title" variant="h6" component="h2">
												<h3>Log your Activity here:</h3>
											</Typography>
											<br></br>
												<div className="form-group">
													<label>
														<p style={{ fontSize: 20 }}>Activity Name:</p>
														<select onChange={this.activityNamehandler}>
														<option value="">Select</option>
															<option value="Treadmill">Treadmill</option>
															<option value="Cycling">Cycling</option>
															<option value="Weight Training">Weight Training</option>
														</select>
													</label>
												</div>
												<br></br>
												
												<div className="form-group">
													<b style={{ fontSize: 20 }}>Enter your activity time in minutes:</b>
													<input
														type="text"
														className="form-control"
														name="activitytime"
														placeholder="Enter time here"
														onChange={this.activityTimehandler}
													/>
												</div>
												<br></br>
												
												<div className="form-group">
													<label>
														<b style={{ fontSize: 20 }}>Gym Location: </b>
														<select onChange={this.selectLocationhandler}>
														<option value="">Select</option>
															<option value="San Jose">San Jose</option>
															<option value="Santa Clara">Santa Clara</option>
															<option value="Fremont">Fremont</option>
														</select>
													</label>
												</div>
											<div className="text-center pt-1 mb-5 pb-1">
												<Button variant="danger" onClick={this.logActivity}>
													Log
												</Button>
											</div>
										</Box>
									</Modal>
								</div>
							</MDBCol>
						</MDBRow>
					</div>
					<MDBContainer className="my-5 gradient-form">
						<br></br>
						<br></br>

						<MDBRow>
							<MDBCol className="Home-form1" style={{ border: 'solid', marginBottom: '20px' }}>
								<DisplayTableComponent />
							</MDBCol>
						</MDBRow>

						<ChatBox />
					</MDBContainer>
				</div>
			</div>
		);
	}
}

export default UserDashboard;
