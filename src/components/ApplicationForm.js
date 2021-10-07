import React, { Component } from 'react'

export class ApplicationForm extends Component {
    constructor(props) {
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            currentStep: 1,
            companyName: '',
            firstName: '',
            lastName: '',
            emailAddress: '',
            phoneNumber: '',
            payInterval: '',
            paidHourly: '',
            salaryPay: '',
            annPayroll: '',
            ip: '',
            disabled: true,
        }
    }

    //updates input values when changed
    handleChange = event => {
        const { name, value } = event.target
        this.setState({
            [name]: value
        })
    }

    //method for 'I CONFIRM' button, this is used to submit the form
    handleSubmit = e => {
        const scriptURL = 'https://script.google.com/macros/s/AKfycbxNfb7KysJHQLGKJQ57AjPhtCUZWGT2Z8rKVESBcxyeTWBcQAwj/exec'
        const form = document.forms['submit-to-google-sheet']
        e.preventDefault()
        // var obj;
        //ipData.city + ", " + ipData.region + ", " + ipData.country_name + ", " + ipData.org
        // fetch('https://ipapi.co/json/')
        // fetch('https://api.ipify.org?format=json')
        //     .then(results => results.json())
        //     .then(data => obj= data.ip)
        //     .catch(error => console.error('Error!', error.message));

        var today = new Date();
        var formData = new FormData(form);
        formData.set('companyName', this.state.companyName);
        formData.set('firstName', this.state.firstName);
        formData.set('lastName', this.state.lastName);
        formData.set('emailAddress', this.state.emailAddress);
        formData.set('phoneNumber', this.state.phoneNumber);
        formData.set('payInterval', this.state.payInterval);
        formData.set('paidHourly', this.state.paidHourly);
        formData.set('salaryPay', this.state.salaryPay);
        formData.set('annPayroll', this.state.annPayroll);
        formData.set('date', today.getDate() + "-" + (today.getMonth() + 1) + "-" + today.getFullYear());
        formData.set('time', today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds());
        formData.set('ip', this.state.ip);

        //posts information to google sheets
        fetch(scriptURL, { method: 'POST', body: formData })
            .then(response => console.log('Success!', response))
            .catch(error => console.error('Error!', error.message))

        this.props.nextStep();
    }

    //method for 'Back' button -this back button goes to the previous page
    back = e => {
        e.preventDefault();
        this.props.prevStep();
    }

    //updates the currentstep after button is pressed
    _next = () => {
        let currentStep = this.state.currentStep;
        // this.transform(0, 0) // ie hack to redraw
        currentStep = currentStep >= 10 ? 11 : currentStep + 1;
        this.setState({
            currentStep: currentStep
        });
    }
    _prev = () => {
        let currentStep = this.state.currentStep;
        currentStep = (currentStep <= 1) && (currentStep >= 10) ? 1 : currentStep - 1;
        this.setState({
            currentStep: currentStep
        });
    }

    /*
    * functions for buttons
    */
    previousButton() {
        let currentStep = this.state.currentStep;
        if (currentStep !== 1 && currentStep < 10) {
            return (
                <button
                    id="previous-button"
                    type="button" onClick={this._prev}>
                    Previous
                </button>
            )
        }
        if (currentStep === 10) {
            return (
                <button
                    id="previous-button"
                    type="button" onClick={this._prev}>
                    Edit
                </button>
            )
        }
        return null;
    }
    nextButton() {
        let currentStep = this.state.currentStep;
        if (currentStep < 10) {
            return (
                <button
                    id="next-button"
                    type="button" onClick={this._next}>
                    <span style={{color:"#9e9e9e",fontSize:"12px"}}> Press Enter ↵ &ensp; </span> Next
                </button>
            )
        }
        if (currentStep === 10) {
            return (
                <button
                    id="next-button"
                    type="button" onClick={this._next}>
                    Confirm
                </button>
            )
        }
        return null;
    }

    //goes to next question when enter is pressed
    handleEnter = e => {
        if (e.keyCode === 13) {
            e.preventDefault();
            this._next();
        }
    }

    //funtion that check if applicant scrolled to the bottom
    handleScroll = (e) => {
        const bottom = ((e.target.scrollHeight - e.target.scrollTop-50) <= e.target.clientHeight);
        if (bottom) {
            this.setState({
                disabled: false
            });
        }
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
                <form id="register" name="submit-to-google-sheet" onSubmit={this.handleSubmit}>
                    {/* render the form steps and pass required props in */}
                    <Step1
                        currentStep={this.state.currentStep}
                        handleChange={this.handleChange}
                        companyName={this.state.companyName}
                        handleEnter={this.handleEnter}
                        back={this.back}
                    />
                    <Step2
                        currentStep={this.state.currentStep}
                        handleChange={this.handleChange}
                        firstName={this.state.firstName}
                        handleEnter={this.handleEnter}
                    />
                    <Step3
                        currentStep={this.state.currentStep}
                        handleChange={this.handleChange}
                        lastName={this.state.lastName}
                        handleEnter={this.handleEnter}
                    />
                    <Step4
                        currentStep={this.state.currentStep}
                        handleChange={this.handleChange}
                        emailAddress={this.state.emailAddress}
                        handleEnter={this.handleEnter}
                    />
                    <Step5
                        currentStep={this.state.currentStep}
                        handleChange={this.handleChange}
                        phoneNumber={this.state.phoneNumber}
                        handleEnter={this.handleEnter}
                    />
                    <Step6
                        currentStep={this.state.currentStep}
                        handleChange={this.handleChange}
                        payInterval={this.state.payInterval}
                        handleEnter={this.handleEnter}
                    />
                    <Step7
                        currentStep={this.state.currentStep}
                        handleChange={this.handleChange}
                        paidHourly={this.state.paidHourly}
                        handleEnter={this.handleEnter}
                    />
                    <Step8
                        currentStep={this.state.currentStep}
                        handleChange={this.handleChange}
                        salaryPay={this.state.salaryPay}
                        handleEnter={this.handleEnter}
                    />
                    <Step9
                        currentStep={this.state.currentStep}
                        handleChange={this.handleChange}
                        annPayroll={this.state.annPayroll}
                        handleEnter={this.handleEnter}
                    />
                    <Step10
                        currentStep={this.state.currentStep}
                        handleChange={this.handleChange}
                        companyName={this.state.companyName}
                        firstName={this.state.firstName}
                        lastName={this.state.lastName}
                        emailAddress={this.state.emailAddress}
                        phoneNumber={this.state.phoneNumber}
                        payInterval={this.state.payInterval}
                        paidHourly={this.state.paidHourly}
                        salaryPay={this.state.salaryPay}
                        annPayroll={this.state.annPayroll}
                        handleEnter={this.handleEnter}
                    />
                    <Step11
                        back={this._prev}
                        handleScroll={this.handleScroll}
                        disabled={this.state.disabled}
                        currentStep={this.state.currentStep}
                    />
                    {this.previousButton()}
                    {this.nextButton()}

                </form>
                {/* <p id="footer">Step {this.state.currentStep} out of 9 </p> */}
                {/* Editable footer text */}
                <div id="footer">Copyright © 2020 Rivvi. All rights reserved.</div>

            </div>
        );
    }
}

/*
* The following functions are the steps/questions of the application form. 
* The text within the html tags can be edited to display different text.
* Everything in <label> tags are questions, which are all editable.
*/
function Step1(props) {
    if (props.currentStep !== 1) {return null}
    return (
        <div id="input-container">
            {/* editable question */}
            <label>What is your company name?</label>
            <input
                className="form-control"
                id="companyName"
                name="companyName"
                type="text"
                placeholder="Company Name"
                onKeyDown={props.handleEnter}
                value={props.companyName}
                onChange={props.handleChange}
                autoFocus
              required 
            />
            <div className="inputProgress" style={{ width: "100%" }}></div>
            {/* Back button to go to qualifying form */}
            <button id="back-button" onClick={props.back}>
                {/* editable button text */}
                Back
            </button>
        </div>
    );
}

function Step2(props) {
    if (props.currentStep !== 2) {return null}
    return (
        <div id="input-container">
            {/* editable question */}
            <label>What is your first name?</label>
            <input
                className="form-control"
                id="firstName"
                name="firstName"
                type="text"
                placeholder="First Name"
                onKeyDown={props.handleEnter}
                value={props.firstName}
                onChange={props.handleChange}
                autoFocus
                required
            />
            <div className="inputProgress" style={{ width: "100%" }}></div>
        </div>
    );
}

function Step3(props) {
    if (props.currentStep !== 3) {return null}
    return (
        <div id="input-container">
            {/* editable question */}
            <label>What is your last name?</label>
            <input
                className="form-control"
                id="lastName"
                name="lastName"
                type="text"
                placeholder="Last Name"
                onKeyDown={props.handleEnter}
                value={props.lastName}
                onChange={props.handleChange}
                autoFocus
                required
            />
            <div className="inputProgress" style={{ width: "100%" }}></div>
        </div>
    );
}

function Step4(props) {
    if (props.currentStep !== 4) {return null}
    return (
        <div id="input-container">
            {/* editable question */}
            <label>What is your email?</label>
            <input
                className="form-control"
                id="emailAddress"
                name="emailAddress"
                type="email"
                placeholder="Email Address"
                onKeyDown={props.handleEnter}
                value={props.emailAddress}
                onChange={props.handleChange}
                autoFocus
                required
            />
            <div className="inputProgress" style={{ width: "100%" }}></div>
        </div>
    );
}

function Step5(props) {
    if (props.currentStep !== 5) {return null}
    return (
        <div id="input-container">
            {/* editable question */}
            <label>What is your phone number?</label>
            <input
                className="form-control"
                id="phoneNumber"
                name="phoneNumber"
                type="text"
                placeholder="Phone Number"
                onKeyDown={props.handleEnter}
                value={props.phoneNumber}
                onChange={props.handleChange}
                autoFocus
                required
            />
            <div className="inputProgress" style={{ width: "100%" }}></div>
        </div>
    );
}

function Step6(props) {
    if (props.currentStep !== 6) {return null}
    return (
        <div id="input-container">
            {/* editable question */}
            <label>How often do you pay your employees?</label>
            <select 
            className="form-control" 
            name="payInterval" 
            id="payInterval" 
            onKeyDown={props.handleEnter} 
            onChange={props.handleChange} 
            autoFocus 
            required>
                {/* editable options */}
                <option id="placholder" value="" hidden>Frequency</option>
                <option value="Daily">Daily</option>
                <option value="Weekly">Weekly</option>
                <option value="Biweekly">Biweekly</option>
                <option value="Semimonthly">Semimonthly</option>
                <option value="Monthly">Monthly</option>
            </select>
            <div className="inputProgress" style={{ width: "100%" }}></div>
        </div>
    );
}

function Step7(props) {
    if (props.currentStep !== 7) {return null}
    return (
        <div id="input-container">
            {/* editable question */}
            <label>How many employees are paid hourly?</label>
            <input
                className="form-control"
                id="paidHourly"
                name="paidHourly"
                type="number"
                placeholder="i.e: 10"
                onKeyDown={props.handleEnter}
                value={props.paidHourly}
                onChange={props.handleChange}
                autoFocus
                min="0"
                required
            />
            <div className="inputProgress" style={{ width: "100%" }}></div>
        </div>
    );
}

function Step8(props) {
    if (props.currentStep !== 8) {return null}
    return (
        <div id="input-container">
            {/* editable question */}
            <label>How many employees are salaried?</label>
            <input
                className="form-control"
                id="salaryPay"
                name="salaryPay"
                type="number"
                placeholder="i.e: 12"
                onKeyDown={props.handleEnter}
                value={props.salaryPay}
                onChange={props.handleChange}
                autoFocus
                min="0"
                required
            />
            <div className="inputProgress" style={{ width: "100%" }}></div>
        </div>

    );
}

function Step9(props) {
    if (props.currentStep !== 9) {return null}
    return (
        <div id="input-container">
            {/* editable question */}
            <label>What is your total annual payroll?</label>
            <input
                className="form-control"
                id="annPayroll"
                name="annPayroll"
                type="number"
                placeholder="i.e: 120500"
                onKeyDown={props.handleEnter}
                value={props.annPayroll}
                onChange={props.handleChange}
                autoFocus
                min="0"
                required
            />
            <div className="inputProgress" style={{ width: "100%" }}></div>
        </div>
    );
}
function Step10(props) {
    if (props.currentStep !== 10) {return null}
    return (
        <div className="row" id="confirm-container">
            {/* editable, summary of provided information */}
            <label className="center">Here is your information</label>
            <div className="column">
                <p id="confirm-text-left">
                <b>Company Name: </b><br />
                <b>First Name: </b><br />
                <b>Last Name: </b><br />
                <b>Email Address: </b><br />
                <b>Phone Number: </b><br />
                <b>Pay frequency: </b><br />
                <b>Hourly employees: </b><br />
                <b>Salary employees: </b><br />
                <b>Total annual payroll: </b><br />
                </p>
            </div>
            <div className="column">
                <p id="confirm-text-right">
                {props.companyName}<br />
                {props.firstName}<br />
                {props.lastName}<br />
                {props.emailAddress}<br />
                {props.phoneNumber}<br />
                {props.payInterval}<br />
                {props.paidHourly}<br />
                {props.salaryPay}<br />
                {props.annPayroll}<br />
                </p>
            </div>
            
        </div>
    );
}
function Step11(props) {
    if (props.currentStep !== 11) {return null}
    return (
        <div id="confirm-container">
        {/* editable, terms of service */}
            <label className="center" style={{textAlign:"center"}}>RIVVI TERMS OF SERVICE<br/>
            Early Testing Addendum</label>
            <div id="terms" onScroll={props.handleScroll}>
                This Rivvi Terms of Service Early Testing Addendum (the “Addendum”) governs your access to and use of a non-public, not generally available, early prototype version of the Rivvi Payroll Service (collectively, the “Prototype Service”), and hereby amends and is incorporated into the Rivvi Terms of Service between Rivvi and you as of the date you agree to this Addendum (“Addendum Effective Date”).<br />
                <br />You are invited to evaluate the Prototype Service beginning on the Addendum Effective Date, and ending on the sooner of either (a) the date Rivvi launches a public beta of the Prototype Service, or (b) Rivvi terminates this Addendum in accordance with Section 8 below (such period, the “Evaluation Period”).<br />
                <br />Any capitalized terms in this Addendum shall have the meanings supplied herein or in the Rivvi Terms of Service, or other applicable agreement relating to your use of the Rivvi Service (collectively, the “Standard Terms”). The Standard Terms shall apply to the Prototype Service except as otherwise agreed. If there is any conflict between the Addendum and the Standard Terms, the Addendum shall govern with respect to the Prototype Service only, and the Standard Terms shall govern in all other matters. This Addendum shall have no applicability to any Service other than the Prototype Service.<br />
                <br />Clicking “I ACCEPT”, checking a box stating that you have read and agree to the Addendum, or otherwise indicating your acceptance to the Addendum is a necessary condition to receiving access to the Prototype Service. By indicating your acceptance to the Addendum you are agreeing to the terms set forth herein.<br />
                <br />1. License.<br />
                Rivvi hereby grants you a limited-term, non-exclusive, non-sublicensable, non-transferable, revocable license to access and use the Prototype Service internally during the Evaluation Period. Except as expressly provided in this Addendum, you have no rights to access or use the Prototype Service.  For clarity, Rivvi and its licensors shall own all right, title, and interest in and to the Prototype Service. Rivvi reserves all rights not expressly granted to you in this Addendum.<br />
                <br />2. Use and Responsibility.<br />
                You acknowledge that you are responsible for any use and access to the Prototype Service originating from your account.  The Prototype Service (including any Prototype Service feature names) is the Confidential Information of Rivvi, and is experimental, pre-release, and may not function as expected.<br />
                <br />3. Trade Secrets and Confidentiality.<br />
                You acknowledge that the Prototype Service is confidential and proprietary to Rivvi and contains trade secrets. You hereby agree that you shall not disclose any information relating to the Prototype Service (including, but not limited to, its existence, name, design and performance capabilities, the results of any performance/benchmark tests, and any authorization codes or license keys) to third parties without the prior written permission from Rivvi. You shall treat all information regarding the Prototype Service provided by Rivvi as Rivvi Confidential Information, subject to non-disclosure obligations under the Standard Terms.<br />
                <br />4. Feedback.<br />
                Feedback and other information which is provided by your or derived by Rivvi in connection with this Addendum may be used by Rivvi to improve or enhance its Service and Rivvi shall have a non-exclusive, perpetual, irrevocable, royalty-free, worldwide right and license to use, modify and otherwise exploit such feedback and information without restriction, provided that the public disclosure of any such feedback or information identifiable to you shall only be by the mutual agreement of you and Rivvi.<br />
                <br />5. Support and Updates.<br />
                Notwithstanding anything to the contrary in the Standard Terms:<br />
                a.    Rivvi shall have no obligation to support or provide support services to you relating to the Prototype Service. Rivvi may, however, make such services available to you at its sole discretion.<br />
                b.    Rivvi may from time to time make available updates, enhancements and/or modifications to the Prototype Service and may, at its sole discretion, provide such updates to you, but is under no obligation to do so. The provision by Rivvi to you of such updates, enhancements and/or modifications to the Prototype Service shall be subject to all covenants and conditions of this Addendum, including, but not limited to, the restrictions on your use of the Prototype Service and Rivvi’s disclaimer of warranties.<br />
                <br />6. Limitation of Liability.<br />
                NOTWITHSTANDING ANYTHING TO THE CONTRARY, IN NO EVENT WILL RIVVI OR ITS LICENSORS BE LIABLE TO YOU OR ANY OTHER PARTY FOR DAMAGES OF ANY KIND ARISING FROM THIS ADDENDUM OR THE USE OF THE PROTOTYPE SERVICE, WHETHER RESULTING FROM TORT (INCLUDING NEGLIGENCE), BREACH OF CONTRACT OR OTHER FORM OF ACTION, INCLUDING BUT NOT LIMITED TO LOSS OR INACCURACY OF DATA, INTERRUPTION OF USE, LOSS OF PROFITS OR REVENUE, OR DIRECT, INDIRECT, SPECIAL, INCIDENTAL OR CONSEQUENTIAL DAMAGES OF ANY KIND, EVEN IF RIVVI HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.<br />
                <br />7. Warranty.<br />
                YOU ACKNOWLEDGE AND AGREE THAT THE PROTOTYPE SERVICE IS IN AN EARLY STAGE OF DEVELOPMENT, IS EXPERIMENTAL AND THAT RIVVI DOES NOT WARRANT THE PROTOTYPE SERVICE IN ANY WAY, INCLUDING BUT NOT LIMITED TO PERFORMANCE OR FEATURES OF THE PROTOTYPE SERVICE. ALL WARRANTIES REGARDING THE PROTOTYPE SERVICE, INCLUDING, WITHOUT LIMITATION, ALL WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, NON-INFRINGEMENT, OR ANY OTHER WARRANTY, WHETHER EXPRESS OR IMPLIED, ARE HEREBY DISCLAIMED BY RIVVI.<br />
                THE PROTOTYPE SERVICE IS PROVIDED “AS IS” FOR EVALUATION AND TESTING PURPOSES ONLY, AND OWING TO ITS EXPERIMENTAL NATURE, YOU ARE ADVISED NOT TO RELY ON THE FEATURES OR PERFORMANCE OF THE PROTOTYPE SERVICE FOR ANY REASON. YOU AGREE TO USE THE PROTOTYPE SERVICE WITH ALL DUE CAUTION, AND TO TAKE EVERY PRECAUTION TO ENSURE THE INTEGRITY OF DATA, HARDWARE, AND SOFTWARE IN THE SOFTWARE'S OPERATING ENVIRONMENT. NOTWITHSTANDING ANYTHING TO THE CONTRARY IN THE STANDARD TERMS, YOU FURTHER AGREE THAT RIVVI SHALL NOT BE HELD LIABLE FOR ANY DAMAGES, INCLUDING BUT NOT LIMITED TO DIRECT, INDIRECT, INCIDENTAL, SPECIAL OR CONSEQUENTIAL DAMAGES OR DAMAGES FOR LOSS OF PROFITS, REVENUE, DATA OR USE, INCURRED BY YOU OR ANY THIRD PARTY, WHETHER IN AN ACTION IN CONTRACT OR TORT, EVEN IF RIVVI HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.<br />
                <br />8. Term and Termination.<br />
                Rivvi shall have the right, at its sole discretion, to terminate this Addendum immediately with or without cause upon written notice to you.  In addition, this Addendum shall terminate automatically upon any termination of the Rivvi Terms of Service between you and Rivvi. Sections 3 and 5 - 9 shall survive any termination or expiration of this Addendum.<br />
                <br />9. Commercial Availability. Nothing in this Addendum shall be deemed to require Rivvi to make the Prototype Service commercially available on any particular date nor does Rivvi make any such representation or warranty, express or implied, regarding any such commercially available version. Nothing in this Addendum shall be deemed to convey to you the rights to use a commercially released version of the Prototype Service or any components thereof, if and when such are available. Use of such commercial product shall be subject to the Rivvi Terms of Service or such other terms and conditions as Rivvi requires in connection with such service.<br />
            </div>
            <button id="previous-button" onClick={props.back} style={{left:"26px", bottom:"20px"}}>CANCEL</button>
            <button type="submit" disabled={props.disabled}id="next-button">I AGREE</button>
        </div>
    );
}
export default ApplicationForm