import React from 'react';

function FuncComp(props) {

    
    

    function myOnClick(e) {
        
        props.func('This is from my FuncComp.myOnClick');
    }

    // return ("This is from FuncComp");
    return (
        <div>
            <h1>Hello, FuncComp {JSON.stringify(props)}</h1>
            <button onClick={myOnClick} >Push Me</button>
        </div>
    )

    // return <h1>Hello, FuncComp {props.parm}</h1>;
}

export default FuncComp;
