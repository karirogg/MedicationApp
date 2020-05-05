import React, {Component} from 'react';
import '../CSS/AddWindow.css';
import {addMeds} from '../Actions/add-meds-action';
import {editMeds} from '../Actions/edit-meds-action';
import {deleteMeds} from '../Actions/delete-meds-action';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import NewDose from './NewDose';

class AddWindow extends Component {
    state = {
        name: this.props.med.name,
        doses: this.props.med.doses, 
    };

    formatDate = (num) => {
        if(String(num).length === 1) return("0" + String(num));
        if(num === "") return("00");
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
    edit_name = (event) => {
        let state_copy = JSON.parse(JSON.stringify(this.state));
        state_copy.name = event.target.value;
        this.setState(state_copy);
    }

    removeElementAtIndex = (i) => {
        let state_copy = JSON.parse(JSON.stringify(this.state));
        state_copy.doses.splice(i, 1);
        this.setState(state_copy);
    }

    submitMeds = () => {
        var state_copy = JSON.parse(JSON.stringify(this.state));
        for(let i = 0; i< state_copy.doses.length; i++) {
            console.log(this.formatDate(state_copy.doses[i].hour));
            state_copy.doses[i].hour = this.formatDate(state_copy.doses[i].hour);
            state_copy.doses[i].minute = this.formatDate(state_copy.doses[i].minute);
        }

        state_copy.doses.sort((a,b) => (parseInt(a.hour) - parseInt(b.hour) || parseInt(a.minute)-parseInt(b.minute)));

        if(state_copy.name !== "") {
            this.props.toggleAdd();
            if(this.props.index === -1) {
                this.props.addMeds({                    
                    name: state_copy.name,                
                    doses: state_copy.doses,
                });
            } else {
                this.props.editMeds({                    
                    name: state_copy.name,                
                    doses: state_copy.doses,
                }, this.props.index);
            }
        } else {
            alert("You cannot add empty medication");
        }
    }
    addDose = () => {
        this.setState({
            name: this.state.name,
            doses: [...this.state.doses, {amount:"75mg", hour:"09", minute:"00"}]});
    }

    render() {
        return(
            <div>
                <div className='dim-background' onClick={this.props.toggleAdd}></div>
                <div className='add-window'>
                    <div className="top"><p>Bæta við lyfjagjöf</p></div>
                    <input type="text" className="name-input" onChange={this.edit_name} placeholder="Nafn lyfs" value={this.state.name} />
                    {this.state.doses.map((dose, i) => {
                        return(<NewDose key={i} id={i} dose={dose} hr_up={this.hr_up} hr_down={this.hr_down} min_up={this.min_up} min_down={this.min_down} edit_minute={this.edit_minute} edit_hour={this.edit_hour} edit_amount={this.edit_amount} removeElementAtIndex={this.removeElementAtIndex} />);
                    })}
                    <div className="button-holder">
                        <button className="add-dose" onClick={this.addDose}>Nýr skammtur</button>
                        {(this.props.index >= 0) ? <button className="delete-medication" onClick={() => {
                            this.props.toggleAdd();
                            this.props.deleteMeds(this.props.index);
                        }}>Eyða</button> : null}
                        <button className="save" type="submit" onClick={this.submitMeds}>Vista</button>
                    </div>
                </div>
            </div>
        )
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({addMeds: addMeds, editMeds: editMeds, deleteMeds: deleteMeds}, dispatch);
}


export default connect(null, matchDispatchToProps)(AddWindow);