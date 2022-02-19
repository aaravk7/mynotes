import React, { useContext, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import NoteContext from '../../context/NoteContext/NoteContext';
import AlertContext from '../../context/AlertContext/AlertContext';


const Addnote = () => {
    const notesC = useContext(NoteContext);
    const alertC = useContext(AlertContext);
    const [noteContent, setNoteContent] = useState({ title: "", desc: "", tag: "" });

    const handleClick = (e) => {
        e.preventDefault();
        if (noteContent.title.length > 4 && noteContent.desc.length > 4) {
            notesC.addNote(noteContent.title, noteContent.desc, noteContent.tag == "" ? "General" : noteContent.tag);
            setNoteContent({ title: "", desc: "", tag: "" });
        } else {
            alertC.showAlert("Length of title and description should be minimum 5 characters.", "danger");
        }
    }

    const inputHandler = (e) => {
        setNoteContent({ ...noteContent, [e.target.name]: e.target.value });
    }

    return (
        <Form>
            <Form.Group className="mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" name="title" value={noteContent.title} onChange={inputHandler} />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" rows={3} name="desc" value={noteContent.desc} onChange={inputHandler} />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Tag</Form.Label>
                <Form.Control type="text" name="tag" value={noteContent.tag} onChange={inputHandler} />
            </Form.Group>
            <Button variant="success" type="submit" onClick={handleClick} >
                Add Note
            </Button>
        </Form>
    )
}

export default Addnote