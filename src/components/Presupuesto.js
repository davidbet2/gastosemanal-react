import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Presupuesto extends Component {
    render() {
        return (
            <div className="alert alert-primary">
                Presupuesto: $ {this.props.presupuesto}
            </div>
        );
    }
}

export default Presupuesto;

Presupuesto.propTypes = {
    presupuesto: PropTypes.string.isRequired
}