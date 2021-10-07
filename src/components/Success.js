import React, { Component } from 'react'

export class Success extends Component {

    home = e => {
        e.preventDefault();
        window.location.href="http://rivvi.com/"; // this is the website that home button will lead to
    }
    render() {
        return (
            <div style={{
                height: '100vh', backgroundImage: `url("./images/form-background-no-chair.jpg")`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'bottom left'
            }}>
                <section>
                    <header>
                        <img src="./images/rivvi-logo.png" width="100" alt="logo" />
                    </header>
                </section>

                <section id="main">
                    <div className="main-text">
                        {/* editable text for successful application */}
                        <h1>
                            Thanks For Signing up! 
                        </h1>
                        <h6>
                            Thank You! We're excited that you have signed up for our free payroll beta program and will be in touch shortly to discuss the details with you. Stay safe.
                        </h6>
                    </div>
                    {/* button that takes you to a website set in the home function defined up above */}
                    <button type="button" onClick={this.home} className="start">
                        {/* editable text for the button */}
                        Home
                    </button>

                </section>

            </div>
        )
    }
}
export default Success