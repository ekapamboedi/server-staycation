import React, { Component } from 'react';
import Header from "parts/Header";

export default class LandingPage extends Component{
    // console.log(this.props);
    //<> REactp stands
    //then passing all props to commponent Header
    render() {
        return (
        <>
            <Header {...this.props}></Header>
        </>
        );
        // console.log(this.props);
    }
}