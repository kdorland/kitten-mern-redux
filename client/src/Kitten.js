import React, {Component} from 'react';
import {Link} from "@reach/router";

class Kitten extends Component {

    handleChange(event) {
        const value = event.target.value;
        this.setState({
            [event.target.name]: value
        });
    }

    render() {
        const kitten = this.props.getKitten(this.props.id);
        let content = <p>Loading</p>;
        if (kitten) {
            content =
                <React.Fragment>
                    <h1>{kitten.name}</h1>

                    <h3>Hobbies</h3>
                    <ul>
                        {kitten.hobbies.map(h => <li key={h}>{h}</li>)}
                    </ul>

                    <input name="newHobby" onChange={(event) => this.handleChange(event)} type="text"/>
                    <button onClick={_ => this.props.addHobby(this.props.id, this.state.newHobby)}
                            type="submit">Add New Kitten</button>

                    <br/>
                    <Link to="/">Back</Link>
                </React.Fragment>
        }

        return content;
    }
}

export default Kitten;
