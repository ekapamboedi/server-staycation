import React from "react";
import {render} from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Button from './index';
// testing disabled button 
test("Should not allowed click button if isDisabled is present", () => {
    const { container } = render (<Button isDisabled></Button>);
    // ngecek tag disabled pada container
    expect(container.querySelector('span.disabled')).toBeInTheDocument();
});

// testing loading/spinner button 
test("Should render loading/spinner", () => {
    const { container, getByText } = render (<Button isLoading></Button>);
    //  "getByText(/loading/i) ini ngecek apakah ada string "loading" dengan casesensitive"
    expect(getByText(/loading/i)).toBeInTheDocument();
    // ngecek tag span pada container
    expect(container.querySelector("span")).toBeInTheDocument();
});

// testing <a> tag for link button 
test("Should render <a> tag", () => {
    const { container } = render (<Button type="link" isExternal></Button>);
    // ngecek tag disabled pada container
    expect(container.querySelector("a")).toBeInTheDocument();
});

// testing <a> tag for link button 
test("Should render <Link> component", () => {
    const { container } = render (
        <Router>
            <Button href="" type="link"></Button>
        </Router>
        );
    // ngecek tag disabled pada container
    expect(container.querySelector("a")).toBeInTheDocument();
});