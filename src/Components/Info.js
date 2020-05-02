import React, {Component} from 'react';
import '../CSS/Info.css';
import AddWindow from './AddWindow';
import MedsTable from './MedsTable';


class Info extends Component {
    state = {
        seen: false
    };

    toggleAdd = () => {
        this.setState({
            seen: !this.state.seen
        });
    };

    render() {
        return(
            <div>
                <button className="add-meds" onClick={this.toggleAdd}>Add</button>
                {this.state.seen ? <AddWindow toggle={this.toggleAdd} /> : null}
                <MedsTable />
            </div>
        );
    }
}

export default Info;