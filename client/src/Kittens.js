import React, {Component} from 'react';
import {Link} from "@reach/router";

class Kittens extends Component {

    handleChange(event) {
        const value = event.target.value;
        this.setState({
            [event.target.name]: value
        });
    }

    render() {
        return (
            <React.Fragment>
                <h1>Kittens (full-stack)</h1>
                <ol>
                    {this.props.kittens.map(kitten =>
                        <li key={kitten.id}>
                            <Link to={`/kitten/${kitten.id}`}>{kitten.name}</Link>
                        </li>)}
                </ol>

                <input name="newKittenName" onChange={(event) => this.handleChange(event)} type="text"/>
                <button onClick={_ => this.props.addKitten(this.state.newKittenName)} type="submit">Add New Kitten</button>
            </React.Fragment>
        );
    }

}

export default Kittens;
