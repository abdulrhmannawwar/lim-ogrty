import { useState } from "react";
import "./App.css";
function EditableText({ name, onChangeName }) {
    const [text, setText] = useState(name);

    const handleBlur = (e) => {
        const newText = e.target.innerText;
        setText(newText);
        onChangeName(newText);
    };

    return (
        <div
            contentEditable
            suppressContentEditableWarning={true}
            className="text"
            onBlur={handleBlur}
        >
            {text}
        </div>
    );
}

export default EditableText;
