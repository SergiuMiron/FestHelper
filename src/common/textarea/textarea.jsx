import React from 'react';
import './textarea.scss'

const Textarea = (props) => (
    <textarea id={props.id} name={props.name} className="editor-container border-field txtarea" onChange={props.onChange}
    onKeyUp={props.onKeyUp} value={props.value}></textarea>
);

export default Textarea;