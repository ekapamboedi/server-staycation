import React from "react";
import Button from "elements/Button";
import BrandIcon from "parts/IconText";

export default function Header(props){
    return (
        <header className="spasing-sm">
            <div className="container">
                <nav className="navbar navbar-expand-lg navbar-light">
                    <BrandIcon/>
                </nav>
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav ml-auto">
                         
                    </ul>
                </div>
            </div>
        </header>
    )
}