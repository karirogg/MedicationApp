import React, {Component} from 'react';
import deleteIcon from '../Images/DeleteIcon.svg';
import '../CSS/NewDose.css';

class NewDose extends Component {
    hourEdited = (event) => {
        let newValue = event.target.value;
        if(newValue.length <= 2) {
            this.props.edit_hour(newValue.replace(/[^0-9]+/g, ""), this.props.id);
        } 
    }
    minuteEdited = (event) => {
        let newValue = event.target.value;
        if(newValue.length <= 2) {
            this.props.edit_minute(newValue.replace(/[^0-9]+/g, ""), this.props.id);
        }
    }
    amountEdited = (event) => {
        this.props.edit_amount(event.target.value, this.props.id);
    }

    render() {
        const availableAmounts = ["75mg", "150mg", "500mg"]

        return(<div className="new-dose">
        <div className="select-amount">
            <select ref="amount" value={this.props.dose.amount} onChange={this.amountEdited}>
                {availableAmounts.map((amount, i) => {
                    return (<option key={i} value={amount}>{amount}</option>);
                })}
            </select>
        </div>
        <div className="time-picker">
            <div className="hour">
                <div className="hr-up" onClick={() => {this.props.hr_up(this.props.id)}} />
                <input type="text" ref={(ref) => this.hour_input = ref} className="hr" onChange={this.hourEdited.bind(this)} value={this.props.dose.hour} max="99" />
                <div className="hr-down" onClick={() => {this.props.hr_down(this.props.id)}} />
            </div>
            <div className="separator">:</div>
            <div className="minute">
                <div className="min-up" onClick={() => {this.props.min_up(this.props.id)}}/>
                <input type="text" ref={(ref) => this.minute_input = ref} className="min" onChange={this.minuteEdited.bind(this)} value={this.props.dose.minute} max="99" />
                <div className="min-down" onClick={() => {this.props.min_down(this.props.id)}} />
            </div>
        </div>
        <div className="remove-element" onClick={() => (this.props.removeElementAtIndex(this.props.id))}><img src={deleteIcon} height="15" width="15" alt="Delete icon" /></div>
    </div>);
    }
}

export default NewDose;