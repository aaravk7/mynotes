import React, { useContext, useEffect, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import NoteContext from '../../context/NoteContext/NoteContext';
import NoteItem from '../noteItem/NoteItem';
import { useNavigate } from "react-router-dom";
import './Notes.css';

const Notes = () => {
    let navigate = useNavigate();
    const notesC = useContext(NoteContext);
    const [notes, setNotes] = useState(null);
    const [filter, setFilter] = useState("All");

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


    const tags = ["All"];
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

    return (
        <div className='mt-5'>
            <div className="notes-header">
                <div className="d-flex mb-5">
                    {tags.map(tag => {
                        return <button key={tag} className={`filter-btn ${filter == tag ? "filter-active" : ""}`} onClick={() => filterNotes(tag)}>{tag}</button>
                    })}
                </div>
                <div className="new-note-btn">
                    <i class="fa-solid fa-circle-plus"></i> Add New Note
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