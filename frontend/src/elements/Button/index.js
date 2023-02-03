import React, { Component } from 'react'
import { BrowserRouter as Router } from 'react-router-dom';

// library buat pindah halaman, router dll, tpi cuma make link nya aja
import { Link } from 'react-router-dom'
import propTypes from 'prop-types'

export default function Button(props) {
    const className = [props.className];
    if(props.isPrimary) className.push("btn-primary");
    if(props.isSmall) className.push("btn-sm");
    if(props.isLarge) className.push("btn-lg");
    if(props.isBlock) className.push("btn-block");
    if(props.isShadow) className.push("btn-shadow");

    const onClick = () => {
        if(props.onClick) props.onClick();
    };

    if(props.isDisabled || props.isLoading){
        if(props.isDisabled) className.push("disabled");
        return (
            <span
                className = {className.join(" ")} 
                style={props.style}>
                    {
                     /* // <> is <React.Fragment>, on the latest version of react we only use "<>" */
                    props.isLoading ? (
                      <>
                        <span className="spinner-border spinner-border-sm mx-5"></span>
                        <span className="sr-only">Loading...</span>
                      </> 
                    ) : (
                        props.children 
                        )}
            </span>
            );
        }
        
    if(props.type === "link"){
        // eksternal Button
        if(props.isExternal){
            return( 
                <a 
                href= {props.href} 
                className = {className.join(" ")} 
                style={props.style} 
                target={props.target === "_blank" ? "_blank" : undefined }
                rel={props.target === "_blank" ? "noopener noreferrer" : undefined} 
                > {props.children} </a>
            );
        }else{
            // internal Button
             return(
                <Link 
                to = {props.href} 
                className = {className.join(" ")} 
                style = {props.style}
                onClick={onClick} 
                >
                {props.children}
                </Link>
             );
        }
    }
      return <button  
                className = {className.join(" ")} 
                style = {props.style}
                onClick={onClick}>
                    {[props.children]}
            </button>; 
}


// making props
Button.propTypes = {
    type: propTypes.oneOf(["button", "link"]),
    onClick: propTypes.func,
    target: propTypes.string,
    className: propTypes.string,
    href: propTypes.string,
    isExternal: propTypes.bool,
    isDisabled: propTypes.bool,
    isLoading: propTypes.bool,
    isSmall: propTypes.bool,
    isLarge: propTypes.bool,
    isBlock: propTypes.bool,
    isExternal: propTypes.bool,
    hasShadow: propTypes.bool,
};