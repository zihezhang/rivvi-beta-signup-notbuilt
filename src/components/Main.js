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

    // Handle change for all states
    handleChange = input => e => { // e represents event parameter 
        this.setState({ [input]: e.target.value });
    }

    showStep = () => {
        const {step} = this.state;
        switch (step) {
            case 1: // part 1: landing page
                return (
                    <Landing
                        nextStep={this.nextStep}
                    />);
            case 2: // part 2: qualifying form
                return (
                    <QualifyingForm
                        nextStep={this.nextStep}
                        prevStep={this.prevStep}
                    />);
            case 3: // part 3: application form
                return (
                    <ApplicationForm
                        handleChange={this.handleChange}
                        nextStep={this.nextStep}
                        prevStep={this.prevStep}
                    />);
            case 4: // part 4: successful application confirmation page
                return (
                    <Success />); 
            default: return(<></>);
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