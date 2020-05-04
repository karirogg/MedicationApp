import React, {Component} from 'react';
import '../CSS/AddWindow.css';
import {addMeds} from '../Actions/add-meds-action';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import NewDose from './NewDose';

class AddWindow extends Component {
    constructor() {
        super();

        this.hour_fields = [];
        this.minute_fields = [];
    }

    state = {
        doses:[{amount: "75mg", hour:"00", minute:"00", ind: 0}]
    };

    formatDate = (num) => {
        if(num < 10) return("0" + String(num));
        return(""+num);
    }
    hr_up = (i) => {
        let hr = parseInt(this.state.doses[i].hour);
        if(this.state.doses[i].hour === "") hr = 0;
        hr++;
        if(hr > 23) hr = 0;
        var state_copy = JSON.parse(JSON.stringify(this.state));
        state_copy.doses[i].hour = this.formatDate(hr);
        this.setState(state_copy);
    }
    hr_down = (i) => {
        let hr = parseInt(this.state.doses[i].hour);
        if(this.state.hour === "") hr = 0;
        hr--;
        if(hr < 0) hr = 23;
        var state_copy = JSON.parse(JSON.stringify(this.state));
        state_copy.doses[i].hour = this.formatDate(hr);
        this.setState(state_copy);
    }
    min_up = (i) => {
        let hr = parseInt(this.state.doses[i].hour);
        let min = parseInt(this.state.doses[i].minute);
        if(this.state.doses[i].minute === "") min = 0;
        if(this.state.doses[i].hour === "") hr = 0;

        min += 30;
        if(min >= 60) {
            min = 0;
            hr++;
            if(hr > 23) hr = 0;
        }
        var state_copy = JSON.parse(JSON.stringify(this.state));
        state_copy.doses[i].minute = this.formatDate(min);
        state_copy.doses[i].hour = this.formatDate(hr);
        this.setState(state_copy);
    }
    min_down = (i) => {
        let hr = parseInt(this.state.doses[i].hour);
        let min = parseInt(this.state.doses[i].minute);
        if(this.state.doses[i].hour === "") hr = 0;
        if(this.state.doses[i].minute === "") min = 0;

        min -= 30;
        if(min < 0) {
            min = 30;
            hr--;
            if(hr < 0) hr = 23;
        }
        var state_copy = JSON.parse(JSON.stringify(this.state));
        state_copy.doses[i].minute = this.formatDate(min);
        state_copy.doses[i].hour = this.formatDate(hr);
        this.setState(state_copy);
    }

    edit_minute = (value, i) => {
        let state_copy = JSON.parse(JSON.stringify(this.state));
        state_copy.doses[i].minute = value;
        this.setState(state_copy);
    }
    edit_hour = (value, i) => {
        let state_copy = JSON.parse(JSON.stringify(this.state));
        state_copy.doses[i].hour = value;
        this.setState(state_copy);
    }
    edit_amount = (value, i) => {
        let state_copy = JSON.parse(JSON.stringify(this.state));
        state_copy.doses[i].amount = value;
        this.setState(state_copy);
    }

    submitMeds = () => {
        var submit_name = this.refs.name_input.value;

        if(submit_name) {
            this.props.toggle();
            this.props.addMeds({                    
                name: submit_name,                
                doses: this.state.doses,
            });
        } else {
            alert("You cannot add empty medication");
        }
    }
    addDose = () => {
        this.setState({doses: [...this.state.doses, {amount:"", hour:"00", minute:"00"}]});
    }

    render() {
        return(
            <div>
                <div className='dim-background' onClick={this.props.toggle}></div>
                <div className='add-window'>
                    <div className="top"><p>Bæta við lyfjagjöf</p></div>
                    <input type="text" ref="name_input" placeholder="Nafn lyfs" />
                    <button className="add-dose" onClick={this.addDose}>Nýr skammtur</button>
                    {this.state.doses.map((dose, i) => {
                        return(<NewDose key={i} id={i} dose={dose} hr_up={this.hr_up} hr_down={this.hr_down} min_up={this.min_up} min_down={this.min_down} edit_minute={this.edit_minute} edit_hour={this.edit_hour} edit_amount={this.edit_amount} />);
                    })}
                    <button className="save" type="submit" onClick={this.submitMeds}>Vista</button>
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