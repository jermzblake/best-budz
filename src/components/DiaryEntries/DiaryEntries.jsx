import React, {Component} from 'react';
import diaryService from '../../utils/diaryService';
import '../DiaryEntries/DiaryEntries.css'
// Material Design Bootstrap 4 React
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';



class DiaryEntries extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal10: false,
            modal14: false
        }
    }

    toggle = nr => () => {
        let modalNumber = 'modal' + nr
        this.setState({
          [modalNumber]: !this.state[modalNumber]
        });
    }

    date = this.props.entry.date
    noTimeDate = this.date.slice(0,10);

    handleDelete = async (e) => {
        // e.preventDefault();
        await diaryService.deleteEntry(this.props.entry).then(diary => this.props.updateDiary(diary));
        this.toggle(10);
        this.toggle(14);
        this.props.history.push('/dank-diary');
    }

    makeList = (arr) => {
        let newarr = []
        arr.forEach(obj => {
            if(Object.values(obj)[0] === true) {
                newarr.push(Object.keys(obj)[0])
            }
        })
        let list = newarr.join(', ')
        return list
    }

    render() {
        return (
            <MDBContainer>
                <div onClick={this.toggle(14)} className="list-group-item list-group-item-action">
                    <div className="d-flex w-100 justify-content-between">
                        <h5 className="mb-1">{this.props.entry.strain }&nbsp;{this.props.entry.rating}/10</h5>
                        <small className="date">{this.noTimeDate}</small>
                    </div>
                    <p className="mb-1"><span className="pvefx">Positive Effects:</span> {this.makeList(this.props.entry.positiveEffects)} &nbsp;&nbsp;|&nbsp;&nbsp; <span className="nvefx">Negative Effects:</span> {this.makeList(this.props.entry.negativeEffects)} </p>
                    <small className="text-muted">{this.props.entry.type}</small>
                </div>
                <MDBModal isOpen={this.state.modal14} toggle={this.toggle(14)} centered>
                    <MDBModalHeader toggle={this.toggle(14)}>{this.props.entry.strain }&nbsp;&nbsp;|&nbsp;&nbsp;{this.props.entry.rating}/10</MDBModalHeader>
                    <MDBModalBody>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                        consequat.
                    </MDBModalBody>
                    <MDBModalFooter>
                        <MDBBtn color="warning" onClick={this.toggle(10)}>Delete</MDBBtn>
                        <MDBBtn color="primary">Update</MDBBtn>
                    </MDBModalFooter>
                </MDBModal>
                <MDBModal isOpen={this.state.modal10} toggle={this.toggle(10)} frame position="bottom">
                    <MDBModalBody className="text-center">
                        ARE YOU SURE YOU WANT TO DELETE? THIS ACTION CANNOT BE UNDONE!!
                        <MDBBtn color="secondary" onClick={this.toggle(10)}>Cancel</MDBBtn>
                        <MDBBtn color="primary" onClick={this.handleDelete}>Save changes</MDBBtn>
                    </MDBModalBody>
                </MDBModal>
            </MDBContainer>
        );
    }
}

export default DiaryEntries;