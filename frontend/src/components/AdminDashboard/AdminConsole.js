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
import AdminConsoleTable from './AdminConsoleTable';

class Dashboard extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			show: false,
			emaillist: '',
			emailmessage: '',
			userName: '',
            show: false,
            show2: false,
            show3: false,
			checkInUserID: 0,
            checkOutUserID: 0,
            enrollUserID: 0,
            membershipName: '',
            isMember: 0,
            location: '',
		};

		this.handleOpen = this.handleOpen.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.handleEmaillist = this.handleEmaillist.bind(this);

        this.handleOpen2 = this.handleOpen2.bind(this);
		this.handleClose2 = this.handleClose2.bind(this);
        this.handleOpen3 = this.handleOpen3.bind(this);
		this.handleClose3 = this.handleClose3.bind(this);
        this.handleCheckIn = this.handleCheckIn.bind(this);
        this.handleCheckOut = this.handleCheckOut.bind(this);
        this.handleEnroll = this.handleEnroll.bind(this);
	}

	handleOpen() {
		console.log('is it here', this.state.show);
		this.setState({ show: true });
		console.log('is it here', this.state.show);
	}

	handleClose = async () => {
		await this.setState({ show: false });
	};

    handleOpen2() {
		console.log('is it here', this.state.show);
		this.setState({ show2: true });
		console.log('is it here', this.state.show);
	}

    handleClose2 = async () => {
		await this.setState({ show2: false });
	};

    handleOpen3() {
		console.log('is it here', this.state.show3);
		this.setState({ show3: true });
		console.log('is it here', this.state.show3);
	}

    handleClose3 = async () => {
		await this.setState({ show3: false });
	};

    handleCheckIn = () => {
        const checkInTimeStamp = new Date().toISOString().slice(0, 19).replace('T', ' ');
		const data = {
			userID: this.state.checkInUserID,
			checkIn: checkInTimeStamp,
            location: this.state.location,
		};
		axios({
			url: `${url}/admin/checkin`,
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

    handleCheckOut = () => {
        const checkOutTimeStamp = new Date().toISOString().slice(0, 19).replace('T', ' ');
		const data = {
			userID: this.state.checkOutUserID,
			checkOut: checkOutTimeStamp,
		};
		axios({
			url: `${url}/admin/checkOut`,
			method: 'post',
			data: data,
		})
			.then(async (response) => {
				await this.setState({ show2: false });
			})
			.catch(function(error) {
				alert(error);
			});
	};

    handleEnroll = () => {
		const data = {
			userID: this.state.enrollUserID,
			isMember: this.state.isMember,
            membershipName: this.state.membershipName,

		};
		axios({
			url: `${url}/admin/enroll/memenroll`,
			method: 'post',
			data: data,
		})
			.then(async (response) => {
				await this.setState({ show3: false });
			})
			.catch(function(error) {
				alert(error);
			});
	};

	handleEmaillist = () => {
		const data = {
			emails: this.state.emaillist.split(';'),
			message: this.state.emailmessage,
			flight_items: JSON.parse(localStorage.getItem('flight_items')),
			hotel_items: JSON.parse(localStorage.getItem('hotel_items')),
		};
		axios({
			url: `${url}/send/sendEmail`,
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

	emailChangehandler = (e) => {
		this.setState({
			emaillist: e.target.value,
		});
	};

	emailmessagehandler = (e) => {
		this.setState({
			emailmessage: e.target.value,
		});
	};

    checkInHandler = (e) => {
		this.setState({
			checkInUserID: e.target.value,
		});
	};

	checkOutHandler = (e) => {
		this.setState({
			checkOutUserID: e.target.value,
		});
	};

    
	enrollUserIDHandler = (e) => {
		this.setState({
			enrollUserID: e.target.value,
		});
	};

    
	membershipNameHandler = (e) => {
        console.log(e.target.value);
		this.setState({
			membershipName: e.target.value,
		});
	};

    locationHandler = (e) => {
        console.log(e.target.value);
		this.setState({
			location: e.target.value,
		});
	};

    
	isMemberHandler = (e) => {
        console.log(Number(e.target.value));
		this.setState({
			isMember: Number(e.target.value),
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
										<Link to="/admin/dashboard" style={{ color: 'white' }}>
											View Analytics
										</Link>
										&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
									</Button>
								</div>

                                <br></br>


                                {/* Check In Logic */}
								<div>
									<Button variant="danger" size="lg" onClick={this.handleOpen}>
										&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Check In User
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
												Enter check in information here
											</Typography>
												<div className="form-group">
                                                    <input
                                                        type="number"
                                                        className="form-control"
                                                        name="message"
                                                        onChange={this.checkInHandler}
                                                        multiline
                                                        placeholder="Insert userID here..."
                                                    />
                                                </div>

                                                <br></br>

                                                <select className="form-control" onChange={this.locationHandler}>
                                                    <option value="" selected disabled hidden>Choose location here</option>
                                                    <option value="Santa Clara">Santa Clara</option>
                                                    <option value="Fremont">Fremont</option>
                                                    <option value="San Jose">San Jose</option>
                                                </select> 
											<div className="text-center pt-1 mb-5 pb-1">
												<Button variant="danger" onClick={this.handleCheckIn}>
													Check In
												</Button>
											</div>
										</Box>
									</Modal>
								</div>

                                <br></br>

                                {/* Check Out Logic */}
                                <div>
									<Button variant="danger" size="lg" onClick={this.handleOpen2}>
										&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Check Out User
										&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
									</Button>
									<Modal
										show={this.state.show2}
										onHide={this.handleClose2}
										onClose={this.handleClose2}
										aria-labelledby="modal-modal-title"
										aria-describedby="modal-modal-description"
									>
										<Box className="Auth-form">
											<Typography id="modal-modal-title" variant="h6" component="h2">
												Enter userID to check out
											</Typography>
												<div className="form-group">
                                                    <input
                                                        type="number"
                                                        className="form-control"
                                                        name="message"
                                                        onChange={this.checkOutHandler}
                                                        multiline
                                                        placeholder="Insert userID here..."
                                                    />
                                                </div>
											<div className="text-center pt-1 mb-5 pb-1">
												<Button variant="danger" onClick={this.handleCheckOut}>
													Check Out
												</Button>
											</div>
										</Box>
									</Modal>
								</div>

                                <br></br>

                                {/* Enroll Logic */}
                                <div>
									<Button variant="danger" size="lg" onClick={this.handleOpen3}>
										&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Enroll New User
										&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
									</Button>
									<Modal
										show={this.state.show3}
										onHide={this.handleClose3}
										onClose={this.handleClose3}
										aria-labelledby="modal-modal-title"
										aria-describedby="modal-modal-description"
									>
										<Box className="Auth-form">
											<Typography id="modal-modal-title" variant="h6" component="h2">
												Enter information for user you want to enroll
											</Typography>
												<div className="form-group">
                                                    <input
                                                        type="number"
                                                        className="form-control"
                                                        name="enrollUserID"
                                                        onChange={this.enrollUserIDHandler}
                                                        multiline
                                                        placeholder="Insert userID here..."
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <select className="form-control" onChange={this.membershipNameHandler}>
                                                        <option value="" selected disabled hidden>Choose membership type here</option>
                                                        <option value="PLATINUM">Platinum</option>
                                                        <option value="GOLD">Gold</option>
                                                        <option value="SILVER">Silver</option>
                                                        <option value="BRONZE">Bronze</option>
                                                        <option value="TRIAL">Trial</option>
                                                    </select> 
                                                    {/* <input
                                                        type="text"
                                                        className="form-control"
                                                        name="membershipname"
                                                        onChange={this.membershipNameHandler}
                                                        multiline
                                                        placeholder="Insert membership type here..."
                                                    /> */}
                                                </div>
                                                <div className="form-group">
                                                    <select className="form-control" onChange={this.isMemberHandler}>
                                                        <option value="" selected disabled hidden>Choose member type here</option>
                                                        <option value="1">Member</option>
                                                        <option value="0">Trial</option>
                                                    </select> 
                                                    {/* <input
                                                        type="number"
                                                        className="form-control"
                                                        name="isMember"
                                                        onChange={this.isMemberHandler}
                                                        multiline
                                                        placeholder="Enter member type here..."
                                                    /> */}
                                                </div>
											<div className="text-center pt-1 mb-5 pb-1">
												<Button variant="danger" onClick={this.handleEnroll}>
													Enroll
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
								<AdminConsoleTable />
							</MDBCol>
						</MDBRow>

						<ChatBox />
					</MDBContainer>
				</div>
			</div>
		);
	}
}

export default Dashboard;
