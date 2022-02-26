import React, { useContext, useEffect, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import NoteContext from '../../context/NoteContext/NoteContext';
import NoteItem from '../noteItem/NoteItem';
import { useNavigate } from "react-router-dom";
import './Notes.css';

const Notes = () => {
    let navigate = useNavigate();
    const notesC = useContext(NoteContext);
    const [show, setShow] = useState(false);
    const [notes, setNotes] = useState(null);
    const [filter, setFilter] = useState();
    const [noteContent, setNoteContent] = useState({ title: "", desc: "", tag: "" });

    useEffect(() => {
        if (!localStorage.getItem("token")) {
            navigate("/login");
            return;
        }
        notesC.fetchNotes();
        setFilter("All");
    }, []);

    useEffect(() => {
        setNotes(notesC.notes);
    }, [notesC.notes])

    useEffect(() => {
        let newNotes = [];
        notesC.notes.forEach((note) => {
            if (note.title.toLowerCase().search(notesC.searchInput.toLowerCase()) !== -1) {
                newNotes.push(note);
            }
        })
        setNotes(newNotes);
    }, [notesC.searchInput]);

    let tags = [];
    if (notesC.notes.length > 0) {
        tags.push("All");
    }
    notesC.notes.forEach(element => {
        if (tags.includes(element.tag)) {
        } else {
            tags.push(element.tag);
        }
    });

    const filterNotes = (tag) => {
        setFilter(tag);
        if (tag == "All") {
            setNotes(notesC.notes);
        } else {
            setNotes(notesC.notes.filter((note) => note.tag === tag));
        }
    }

    const inputHandler = (e) => {
        setNoteContent({ ...noteContent, [e.target.name]: e.target.value });
    }

    const handleClose = () => {
        setShow(false);
    };
    const handleShow = () => setShow(true);
    const saveChanges = () => {
        if (noteContent.title.length > 4 && noteContent.desc.length > 4) {
            notesC.addNote(noteContent.title, noteContent.desc, noteContent.tag == "" ? "General" : noteContent.tag);
            setNoteContent({ title: "", desc: "", tag: "" });
        } else {
            alertC.showAlert("Length of title and description should be minimum 5 characters.", "danger");
        }
        setShow(false);
    }

    return (
        <div className='mt-5'>
            <Modal show={show} onHide={handleClose}>
                <div className="note-modal">
                    <div className="note-modal-header">
                        <div className="modal-info">
                            Add New Note
                        </div>
                        <button type="button" className="btn-close" aria-label="Close" onClick={handleClose}></button>
                    </div>
                    <div className="note-modal-body">
                        <label>Title *</label>
                        <input type="text" name="title" value={noteContent.title} onChange={inputHandler} className="note-modal-input" />
                        <label>Description *</label>
                        <input type="textarea" rows={3} name="desc" value={noteContent.desc} onChange={inputHandler} className="note-modal-input" />
                        <label>Tag</label>
                        <input type="text" name="tag" value={noteContent.tag} onChange={inputHandler} className="note-modal-input" />
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
            <div className="notes-header mb-5 flex-wrap">
                <div className="d-flex flex-wrap">
                    {tags.map(tag => {
                        return <button key={tag} className={`filter-btn ${filter == tag ? "filter-active" : ""}`} onClick={() => filterNotes(tag)}>{tag}</button>
                    })}
                </div>
                <div className="new-note-btn" onClick={handleShow}>
                    <i className="fa-solid fa-circle-plus"></i> Add New Note
                </div>
            </div>
            <Row>
                {notes && notes.map(note => {
                    return (
                        <Col key={note._id} xs={12} sm={6} md={4} className="mb-3">
                            <NoteItem title={note.title} desc={note.desc} tag={note.tag} date={note.date} id={note._id} />
                        </Col>
                    )
                })}
            </Row>
        </div>
    )
}

export default Notes