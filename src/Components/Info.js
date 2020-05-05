import React, {Component} from 'react';
import '../CSS/Info.css';
import AddWindow from './AddWindow';
import MedsTable from './MedsTable';


class Info extends Component {
    state = {
        seen: false,
        openAddWindowMed:{name:"", doses:[{amount: "75mg", hour:"09", minute:"00"}]}
    };

    toggleAdd = (med, i) => {
        this.setState({
            seen: !this.state.seen,
            openAddWindowMed: med,
            openAddWindowIndex: i
        });
    };

    render() {
        return(
            <div>
                <button className="add-meds" onClick={() => (this.toggleAdd({name:"", doses:[{amount: "75mg", hour:"09", minute:"00"}]}, -1))}>Add</button>
                {this.state.seen ? <AddWindow toggleAdd={this.toggleAdd} med={this.state.openAddWindowMed} index={this.state.openAddWindowIndex} /> : null}
                <MedsTable key={0} id={0} toggleAdd={this.toggleAdd} />
            </div>
        );
    }
}

export default Info;