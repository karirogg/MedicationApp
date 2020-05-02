import React, {Component} from 'react';
import '../CSS/AddWindow.css';
import {addMeds} from '../Actions/add-meds-action';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

class AddWindow extends Component {
    submitMeds = () => {
        var submit_name = this.refs.name_input.value;
        var amount_name = this.refs.amount_input.value;

        if(submit_name && amount_name) {
            this.props.toggle();
            this.props.addMeds({                    
                name: submit_name,                
                amount: amount_name,
                times: [this.refs.nine.checked,this.refs.twelve.checked,this.refs.fifteen.checked,this.refs.twenty.checked]
            });
        } else {
            alert("You cannot add empty medication");
        }
    }

    render() {
        return(
            <div>
                <div className='dim-background' onClick={this.props.toggle}></div>
                <div className='add-window'>
                    <div className="top"><p>Add new medication</p></div>
                    <input type="text" ref="name_input" placeholder="Name"></input>
                    <input type="text" ref="amount_input" placeholder="Amount"></input>
                    <input type="checkbox" ref="nine" id="nine" />
                    <label htmlFor="nine">9:00</label>
                    <input type="checkbox" ref="twelve" id="twelve" />
                    <label htmlFor="twelve">12:00</label>
                    <input type="checkbox" ref="fifteen" id="fifteen" />
                    <label htmlFor="fifteen">15:00</label>
                    <input type="checkbox" ref="twenty" id="twenty" />
                    <label htmlFor="twenty">20:00</label>
                    <button className="save" type="submit" onClick={this.submitMeds}>Save</button>
                    <p className="error_message"></p>
                </div>
            </div>
        )
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({addMeds: addMeds}, dispatch);
}


export default connect(null, matchDispatchToProps)(AddWindow);