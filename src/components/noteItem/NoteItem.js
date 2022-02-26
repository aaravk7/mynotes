import React, { useContext, useState } from 'react';
import NoteContext from '../../context/NoteContext/NoteContext';
import Modal from 'react-bootstrap/Modal';
import AlertContext from '../../context/AlertContext/AlertContext';
import './NoteItem.css';

const NoteItem = (props) => {
    const alertC = useContext(AlertContext);
    const notesC = useContext(NoteContext);
    const [show, setShow] = useState(false);
    const [note, setNote] = useState({ title: props.title, desc: props.desc, tag: props.tag });
    const handleClose = () => {
        setShow(false);
    };
    const handleShow = () => setShow(true);
    const saveChanges = () => {
        if (note.title.length > 4 && note.desc.length > 4) {
            notesC.editNote(props.id, note.title, note.desc, note.tag);
        } else {
            alertC.showAlert("Length of title and description should be minimum 5 characters.", "danger");
            setNote({ title: props.title, desc: props.desc, tag: props.tag });
        }
        setShow(false);
    }
    const inputHandler = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    }

    const dateObj = new Date(props.date);
    const date = dateObj.toDateString();
    const time = dateObj.toLocaleTimeString();

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <div className="note-modal">
                    <div className="note-modal-header">
                        <div className="modal-info">
                            Edit {props.title}
                        </div>
                        <button type="button" className="btn-close" aria-label="Close" onClick={handleClose}></button>
                    </div>
                    <div className="note-modal-body">
                        <label>Title *</label>
                        <input type="text" name="title" value={note.title} onChange={inputHandler} className="note-modal-input" />
                        <label>Description *</label>
                        <input type="textarea" rows={3} name="desc" value={note.desc} onChange={inputHandler} className="note-modal-input" />
                        <label>Tag</label>
                        <input type="text" name="tag" value={note.tag} onChange={inputHandler} className="note-modal-input" />
                    </div>
                    <div className="note-modal-footer">
                        <button className="modal-btn cancel-btn" onClick={handleClose}>
                            Close
                        </button>
                        <button className="modal-btn submits-btn" onClick={saveChanges}>
                            <i className="fa-solid fa-check"></i> Save
                        </button>
                    </div>
                </div>
            </Modal>
            <div className="notes-card">
                <div className="note-info">
                    <div className="note-date">{date} | {time}</div>
                    <div className="note-buttons">
                        <i className="fa-solid fa-pen-to-square" onClick={handleShow}></i>
                        <i className="fa-solid fa-trash" onClick={() => notesC.deleteNote(props.id)}></i>
                    </div>
                </div>
                <div className="note-title">{props.title}</div>
                <div className="note-desc"> {props.desc}</div>
                <div className="note-tag">{props.tag}</div>
            </div>
        </>
    )
}

export default NoteItem