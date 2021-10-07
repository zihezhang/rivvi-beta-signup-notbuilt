
//made with the help of https://www.youtube.com/watch?v=9yO2bhMKEjA
import React, { Component } from 'react'

export class Landing extends Component {
    //onClick event for 'Next' button to move onto the next step of the application process
    continue = e => {
        e.preventDefault();
        this.props.nextStep();
    }

    render() {
        return (
            <div style={{height: '100vh', backgroundImage: `url("./images/form-background-no-chair.jpg")`, 
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'bottom left'}}>
                <section>
                    <header id="landing">
                        <img src="./images/rivvi-logo.png" width="120" alt="logo" />
                    </header>
                </section>

                <section id="main">
                    <div className="main-text">
                        {/* editable text for landing page */}
                        <h1>
                            Did somebody say <br/>
                            <span>FREE</span> payroll?
                        </h1>
                        <p>
                        If you’re a small business suffering from the effects of COVID-19 and need 
                        some help, we’ve got your back. We have a brand spanking new payroll engine 
                        and we’re looking for some good people to kick the tires and give us some 
                        good old fashioned honest feedback.  In return, we’ll process your payroll, 
                        for free. Depending on the size of your business, that could mean an extra 
                        couple hundred dollars in your pocket each month.
                        </p>
                        <h6>
                        Help us make payroll for the new normal.
                        </h6>
                    </div>
                    {/* button that takes you to qualifying form */}
                    <button className="start" onClick={this.continue}>
                        {/* editable text for the button */}
                        Get Started
                    </button>
                </section>
                
            </div>
        );
    }
}

export default Landing
