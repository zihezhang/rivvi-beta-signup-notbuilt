import React, { Component } from 'react'
import Mailchimp from 'react-mailchimp-form'


export class QualifyingForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentStep: 1,
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
    * the functions for our button
    */
    noButton() {
        let currentStep = this.state.currentStep;
        if ((currentStep !== 1) && (currentStep < 6)) {
            return (
                <button
                    style={{ float: "left", backgroundColor: "#e45115", border: "3px solid #e45115" }}
                    type="button" onClick={this._no}>
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
                    {/* render the form steps and pass required props in*/}
                    <Step1
                        currentStep={this.state.currentStep}
                        back={this.back}
                    />
                    <Step2
                        currentStep={this.state.currentStep}
                    />
                    <Step3
                        currentStep={this.state.currentStep}
                    />
                    <Step4
                        currentStep={this.state.currentStep}
                    />
                    <Step5
                        currentStep={this.state.currentStep}
                    />
                    <Step6
                        currentStep={this.state.currentStep}
                        back={this.back}
                    />
                    <Step7
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
                <div id="footer">Copyright © 2020 Rivvi. All rights reserved.</div>
            </div>


        );
    }
}

function Step1(props) {
    if (props.currentStep !== 1) {
        return null
    }
    return (
        <div className="form-group">
            <h4>We’re currently recruiting <br />private beta test customers.</h4>

            <p id="intro-blurb">
                If you’re interested in reducing your operating costs, we would like to offer you free payroll processing for your business… interested?  Keep reading.
                <br /><br />The software works and we’ve thoroughly tested it, it’s just not final and we haven’t made it look too pretty yet (we’re working on that).
                <br /><br />Our goal right now is to ensure the functionality works for as many different businesses as possible and to get your honest and critical feedback so we can incorporate before we make it publicly available.

            </p>
            <button style={{ float: "left", backgroundColor: "#e45115", border: "3px solid #e45115" }} onClick={props.back}>
                Back
                </button>
        </div>
    );
}

function Step2(props) {
    if (props.currentStep !== 2) {
        return null
    }
    return (
        <div className="form-group">
            <h3>Is your business based in Canada?</h3>
        </div>
    );
}

function Step3(props) {
    if (props.currentStep !== 3) {
        return null
    }
    return (
        <div className="form-group">
            <h3>Are you Incorporated in Ontario?</h3>
        </div>
    );
}

function Step4(props) {
    if (props.currentStep !== 4) {
        return null
    }
    return (
        <div className="form-group">
            <h3>Do you have less than 20 employees?</h3>
        </div>
    );
}

function Step5(props) {
    if (props.currentStep !== 5) {
        return null
    }
    return (
        <div className="form-group">
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
    if (props.currentStep !== 6) {
        return null
    }
    return (
        <div className="form-group">
            <h2>Congrats! You qualify to be a <br /> Rivvi Beta Customer</h2>
            <button style={{ float: "left", backgroundColor: "#e45115", border: "3px solid #e45115" }} onClick={props.back}>
                No thanks
            </button>
            <button style={{ float: "right", backgroundColor: "#709500", border: "3px solid #709500" }}>Let's do it</button>
        </div>
    );
}

function Step7(props) {
    if (props.currentStep !== 7) {
        return null
    }
    return (
        <div className="form-group">
            <h2>Sorry... you do not qualify</h2>
            <p>But we'd love to stay connected and reach out to you once we can get you on our platform. Please give us your email address and we'll keep in touch.</p>
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

            {/* <div className="center">
                <button style={{ backgroundColor: "#e45115", border: "3px solid #e45115" }} onClick={props.back}>
                    Back
                </button>
            </div> */}

        </div>
    );
}

export default QualifyingForm
