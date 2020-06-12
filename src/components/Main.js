import React, { Component } from 'react';
import Landing from './Landing';
import ApplicationForm from './ApplicationForm';
import Success from './Success';
import QualifyingForm from './QualifyingForm';

class Main extends Component {
    state = {
        step: 1,
    }
    // Proceed to next step
    nextStep = () => {
        const { step } = this.state;

        this.setState({
            step: step + 1
        });
    }

    // Go back to previous step
    prevStep = () => {
        const { step } = this.state;

        this.setState({
            step: step - 1
        });
    }

    // Handle fields change for all the fields
    handleChange = input => e => { //the e is a event parameter 
        this.setState({ [input]: e.target.value });
    }

    showStep = () => {
        const {step} = this.state;
        switch (step) {
            case 1:
                return (
                    <Landing
                        nextStep={this.nextStep}
                    />);
            case 2:
                return (
                    <QualifyingForm
                        nextStep={this.nextStep}
                        prevStep={this.prevStep}
                    />);
            case 3:
                return (
                    <ApplicationForm
                        handleChange={this.handleChange}
                        nextStep={this.nextStep}
                        prevStep={this.prevStep}
                    />);
            case 4:
                return (
                    <Success />); 
            default: return(<div></div>);
        }
    }

    render() {
        return (
            <>
                {this.showStep()}
            </>
        );
    }
}
export default Main;