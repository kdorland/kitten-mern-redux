import React, {Component} from 'react';
import {Router} from "@reach/router";
import Kitten from "./Kitten";
import Kittens from "./Kittens";

// Connect wraps a component and makes it a Container component
import {connect} from "react-redux";
import {postKitten, postHobby, fetchKittens} from "./actions";

class App extends Component {

    componentDidMount() {
        this.props.fetchKittens();
    }

    // We keep this method for searching in the list of kittens provided to the component
    getKitten(id) {
        return this.props.kittens.find(k => k.id === id);
    }

    render() {
        return (
            // Remember, we now use this.props.kittens everywhere where we previously used this.state.kittens
            <div className="container">
                <Router>
                    <Kitten path="/kitten/:id" getKitten={id => this.getKitten(id)}
                            addHobby={(kittenId, hobby) => this.props.postHobby(kittenId, hobby)} />
                    <Kittens path="/" kittens={this.props.kittens}
                             addKitten={name => this.props.postKitten(name)}/>
                </Router>
            </div>
        );
    }
}

// Mapping our state to props for <App>
const mapStateToProps = state => ({
    kittens: state.kittens
});

// Making callbacks available to <App>
const mapDispatchToProps = dispatch => ({
    postKitten: (name) => dispatch(postKitten(name)),
    postHobby: (kittenId, hobby) => dispatch(postHobby(kittenId, hobby)),
    fetchKittens: _ => dispatch(fetchKittens())
});

// Wrapping <App> and exporting the wrapped component instead of the original component
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);