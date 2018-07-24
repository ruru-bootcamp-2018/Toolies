import React from 'react'
import { connect } from 'react-redux'

export class Home extends React.Component {
    constructor(props) {
        super(props)

        this.state = {

        }

    }
    render() {
        return (
            <div>
                <img className='image' src='images/tools/four.jpg' />

                <h1 className='subtitle is-1 has-text-centered'>Tool Pool is a community for peer-to-peer lending of odd household items.</h1>

                <div className='columns'>
                    <div className='column is-half'>
                        <img className='imgset' src='images/tim/black.jpeg' />
                    </div>
                    <div className='column is half'>
                        <h1 className='subtitle is-2'>About:</h1>
                        <p>The Tool Pool is a firendly gear sharing app where you can borrow bits a bobs from your communities. You can browse items that you need to borrow for those awkard one off odds and ends. </p>
                    </div>
                </div>
                <div className='columns'>
                    <div className='column is half'>
                        <h1 className='subtitle is-2'>Ethics:</h1>
                        <p>Our team here at The Tool Pool are committed to conducting business in an honest, responsible and ethical manner and in compliance with all applicable laws and regulations. We work with our suppliers and our customers to ensure an ethical and sustainable supply chain. </p>
                    </div>
                    <div className='column is-half'>
                        <img className='imgset' src='images/tim/al.jpg' />
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({ gear: state.gear.gear, err: state.gear.errorMessage })

export default connect(mapStateToProps)(Home)
