import React, { Component } from 'react'
import Mailchimp from 'react-mailchimp-form'


export class QualifyingForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentStep: 1, // keeps track of position in qualifying form
        }
    }
    //method for 'Next' button
    handleSubmit = e => {
        e.preventDefault();
        let currentStep = this.state.currentStep;
        if (currentStep !== 7) { this.props.nextStep(); }
    }

    //method for 'Back' button
    back = e => {
        e.preventDefault();
        this.props.prevStep();
    }

    // click event for yes and no button
    _yes = () => {
        let currentStep = this.state.currentStep
        currentStep = currentStep >= 5 ? 6 : currentStep + 1
        this.setState({
            currentStep: currentStep
        })
    }
    _no = () => {
        let currentStep = this.state.currentStep
        currentStep = (currentStep <= 1) ? 1 : (currentStep = 7)
        this.setState({
            currentStep: currentStep
        })
    }

    /*
    * FUNCTION FOR BUTTONS
    */
    noButton() {
        let currentStep = this.state.currentStep;
        if ((currentStep !== 1) && (currentStep < 6)) {
            return (
                <button
                    style={{ float: "left", backgroundColor: "#e45115", border: "3px solid #e45115" }}
                    type="button" onClick={this._no}>
                    {/* Editable no button */}
                    No
                </button>
            )
        }
        return null;
    }
    yesButton() {
        let currentStep = this.state.currentStep;
        if (currentStep < 6) {
            return (
                <button
                    style={{ float: "right", backgroundColor: "#709500", border: "3px solid #709500" }}
                    type="button" onClick={this._yes}>
                    {/* Editable yes button */}
                    Yes 
                </button>
            )
        }
        return null;
    }

    render() {
        return (
            <div className="center" style={{
                height: '100vh', backgroundImage: `url("./images/form-background2.jpg")`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'bottom right'
            }}>
                <div id="header"> <img src="./images/rivvi-logo.png" width="100" alt="logo" /> </div>
                <form id="qualify" onSubmit={this.handleSubmit}>
                    {/* 
                        Renders the form steps and passes in required props to control the flow of the form. 
                        Text for each step of the form can be edited in the functions down below.
                    */}
                    <Step1 // introduction
                        currentStep={this.state.currentStep}
                        back={this.back}
                    />
                    <Step2 // question 1
                        currentStep={this.state.currentStep}
                    />
                    <Step3 // question 2
                        currentStep={this.state.currentStep}
                    />
                    <Step4 // question 3
                        currentStep={this.state.currentStep}
                    />
                    <Step5 // question 4
                        currentStep={this.state.currentStep}
                    />
                    <Step6 // qualified
                        currentStep={this.state.currentStep}
                        back={this.back}
                    />
                    <Step7 // qualification rejection
                        currentStep={this.state.currentStep}
                        back={this.back}
                    />
                    <div style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                    }}></div>
                    {this.noButton()}
                    {this.yesButton()}
                </form>
                {/* Editable footer text */}
                <div id="footer">Copyright © 2020 Rivvi. All rights reserved.</div>
            </div>


        );
    }
}

/*
* The following functions are the steps/questions of the qualifying form. 
* The text within the html tags can be edited to display different text.
* Generally, questions are in the <h3> tags and descriptions are in <p> tags, both of which are editable.
*/
function Step1(props) {
    if (props.currentStep !== 1) { return null }
    return (
        <div className="form-group">
            {/* editable question */}
            <h4>We’re currently recruiting <br />private beta test customers.</h4>
            <p id="intro-blurb">
                If you’re interested in reducing your operating costs, we would like to offer you free payroll processing for your business… interested?  Keep reading.
                <br /><br />The software works and we’ve thoroughly tested it, it’s just not final and we haven’t made it look too pretty yet (we’re working on that).
                <br /><br />Our goal right now is to ensure the functionality works for as many different businesses as possible and to get your honest and critical feedback so we can incorporate before we make it publicly available.
            </p>
            {/* Back button to go to landing page */}
            <button style={{ float: "left", backgroundColor: "#e45115", border: "3px solid #e45115" }} onClick={props.back}>
                Back
            </button>
        </div>
    );
}

function Step2(props) {
    if (props.currentStep !== 2) { return null }
    return (
        <div className="form-group">
            {/* editable question */}
            <h3>Is your business based in Canada?</h3>
        </div>
    );
}

function Step3(props) {
    if (props.currentStep !== 3) { return null }
    return (
        <div className="form-group">
            {/* editable question */}
            <h3>Are you Incorporated in Ontario?</h3>
        </div>
    );
}

function Step4(props) {
    if (props.currentStep !== 4) { return null }
    return (
        <div className="form-group">
            {/* editable question */}
            <h3>Do you have less than 20 employees?</h3>
        </div>
    );
}

function Step5(props) {
    if (props.currentStep !== 5) { return null }
    return (
        <div className="form-group">
            {/* editable question */}
            <h3>Do you bank with one of the big 5 banks?</h3>
            <p id="example" ><span>Either: Canadian Imperial Bank of Commerce (CIBC),
            Bank of Montreal (BMO),
            Bank of Nova Scotia (Scotiabank),
            Toronto-Dominion Bank (TD), or
            Royal Bank of Canada (RBC)</span>
            </p>
        </div>
    );
}

function Step6(props) {
    if (props.currentStep !== 6) { return null }
    return (
        <div className="form-group">
            {/* editable congrats */}
            <h2>Congrats! You qualify to be a <br /> Rivvi Beta Customer</h2>
            {/* Back button to go to landing page */}
            <button style={{ float: "left", backgroundColor: "#e45115", border: "3px solid #e45115" }} onClick={props.back}>
                No thanks
            </button>
            {/* Button to move onto application form */}
            <button style={{ float: "right", backgroundColor: "#709500", border: "3px solid #709500" }}>Let's do it</button>
        </div>
    );
}

function Step7(props) {
    if (props.currentStep !== 7) { return null }
    return (
        <div className="form-group">
            {/* editable sorry */}
            <h2>Sorry... you do not qualify</h2>
            <p>But we'd love to stay connected and reach out to you once we can get you on our platform. Please give us your email address and we'll keep in touch.</p>
            {/* email input field; email will be passed to mailchimp email subscription */}
            <Mailchimp
                action='https://rivvi.us5.list-manage.com/subscribe/post?u=0efb13dcc7eb6c01e34fe1cf6&amp;id=7153349ce3'
                fields={[
                    {
                        name: 'EMAIL',
                        placeholder: 'Email',
                        type: 'email',
                        required: true
                    }
                ]}
                messages={
                    {
                        sending: "Sending...",
                        success: "Thank you for subscribing!",
                        error: "An unexpected internal error has occurred.",
                        empty: "You must write an e-mail.",
                        duplicate: "You're already subscribed!",
                        button: "Subscribe!"
                    }
                }
            />
        </div>
    );
}

export default QualifyingForm
