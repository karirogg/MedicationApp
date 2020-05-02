import React, {Component} from 'react';
import {connect} from 'react-redux';
import '../CSS/Info.css';

class MedsTable extends Component {
    render() {
        return(<div>
                <table className="medication-info">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Amount</th>
                            <th>9:00</th>
                            <th>12:00</th>
                            <th>15:00</th>
                            <th>20:00</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.meds ? this.props.meds.map((med, i) => {
                            return(<tr key={i}>
                                    <td>{med.name}</td>
                                    <td>{med.times.filter((time) => (time)).length + "x" + med.amount}</td>
                                    {med.times.map((time, j) => {
                                        return(<td key={j}>{time ? med.amount : null}</td>);
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