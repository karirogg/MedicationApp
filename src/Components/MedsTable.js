import React, {Component} from 'react';
import {connect} from 'react-redux';
import '../CSS/Info.css';

class MedsTable extends Component {
    formatDate = (num) => {
        if(parseInt(num) < 10) return("0" + String(num));
        return(""+num);
    }
    // Needs optimizing, think about sorting etc.
    relevantTimelabels = () => {
        let relevant = [];
        const timeLabels = [];

        for(let i = 0; i<24; i++) {
            timeLabels.push(this.formatDate(i) + ":00");
            timeLabels.push(this.formatDate(i) + ":30");
        }

        outer:
        for(let i = 0; i < 48; i++) {
            for(let j = 0; j<this.props.meds.length; j++) {
                for(let k = 0; k<this.props.meds[j].doses.length; k++) {
                    if(parseInt(this.props.meds[j].doses[k].hour) === Math.floor(i/2) && parseInt(this.props.meds[j].doses[k].minute) === 30*(i%2)) {
                        relevant.push(timeLabels[i]);
                        continue outer;
                    }
                }
            } 
        }
        return(relevant)
    }
    // Needs optimizing, think about sorting etc.
    summarizeAmounts = (doses) => {
        let count = [];
        for(let i = 0; i<doses.length; i++) {
            let included = false;
            for(let j = 0; j<count.length; j++) {
                if(count[j].amount === doses[i].amount) {
                    count[j].total++;
                }
            }
            if(included === false) {
                count.push({amount: doses[i].amount, total: 1});
            }

        }

        var s = "";

        for(let i = 0; i<count.length; i++) {
            if(i > 0) s += " + "
            s += count[i].total + "x" + count[i].amount;
        }

        return s;
    }

    render() {
        let timeLabels = this.relevantTimelabels();

        return(<div key={this.props.id}>
                <table className="medication-info">
                    <thead>
                        <tr>
                            {timeLabels.length > 0 ? <th>Nafn</th> : null}
                            {timeLabels.length > 0 ? <th>Magn</th> : null}
                            {timeLabels.map((time) => (<th>{time}</th>))}
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.meds ? this.props.meds.map((med, i) => {
                            var k = 0;
                            return(<tr onClick={() => (this.props.toggleAdd(this.props.meds[i], i))} key={i}>
                                    <td key={i}>{med.name}</td>
                                    <td>{this.summarizeAmounts(med.doses)}</td>
                                    {timeLabels.map((time, j) => {
                                        let value = "";
                                        console.log(JSON.stringify(this.props.meds[i]));
                                        let dose = this.props.meds[i].doses[k];
                                        if (dose && (dose.hour + ":" + dose.minute) === time) {
                                            value = this.props.meds[i].doses[k].amount;
                                            k++;
                                        }
                                        return(<td>{value}</td>);
                                    })}
                                </tr>);
                        }) : null}
                    </tbody>
                </table>
            </div>);
    }
}

function mapStateToProps(state) {
    return {meds: state.meds};
}

export default connect(mapStateToProps)(MedsTable);