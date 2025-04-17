import { useState, useEffect, ChangeEvent } from 'react';
import { Form, Button, Card, Row, Col, InputGroup } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import {
    fetchQuestionsForQuiz,
    createQuestionForQuiz,
    updateQuizQuestion,
    deleteQuizQuestion,
} from './quizQuestionsClient';

export type QuestionType = 'multiple_choice' | 'true_false' | 'fill_blank';

export interface Choice {
    id: string;
    text: string;
    isCorrect: boolean;
}

export interface Question {
    id: string;        
    type: QuestionType;
    title: string;
    points: number;
    questionText: string;
    choices: Choice[];
    isEditing: boolean;
}

const QUESTION_TYPES: { value: QuestionType; label: string }[] = [
    { value: 'multiple_choice', label: 'Multiple Choice' },
    { value: 'true_false', label: 'True/False' },
    { value: 'fill_blank', label: 'Fill in the Blank' },
];

// Local draft factory
const createNewQuestion = (): Question => ({
    id: "new",
    type: 'multiple_choice',
    title: '',
    points: 0,
    questionText: '',
    choices: [
        { id: uuidv4(), text: '', isCorrect: true },
        { id: uuidv4(), text: '', isCorrect: false },
    ],
    isEditing: true,
});

export default function QuizQuestionsEditor() {
    const [questions, setQuestions] = useState<Question[]>([]);
    const { cid, qid } = useParams<{ cid: string; qid: string }>();

    useEffect(() => {
        if (!qid) return;
        (async () => {
            try {
                const data: any[] = await fetchQuestionsForQuiz(qid);
                console.log(data)
                const loaded: Question[] = data.map(q => ({
                    id: q._id,
                    type: q.type as QuestionType,
                    title: q.title,
                    points: q.points,
                    questionText: q.text,
                    choices: (q.choices || []).map((text: string, i: number) => ({
                        id: uuidv4(),
                        text,
                        isCorrect: i === q.correct_answer_index,
                    })),
                    isEditing: false,
                }));
                setQuestions(loaded);
            } catch (err) {
                console.error('Failed to load questions', err);
            }
        })();
    }, [qid]);


    const addQuestion = () => setQuestions(prev => [...prev, createNewQuestion()]);

    const saveQuestion = async (id: string) => {
        console.log(id)
        const q = questions.find(x => x.id === id);
        if (!q || !qid) return;
        const correctIndex = q.choices.findIndex(c => c.isCorrect);
        const payload = {
            quiz: qid,
            title: q.title,
            type: q.type,
            points: q.points,
            text: q.questionText,
            choices: q.choices.map(c => c.text),
            correct_answer_index: correctIndex,
        };
        try {
            console.log(id)

            if (id=="new") {
                // create new
                const created: any = await createQuestionForQuiz(qid, payload);
                setQuestions(prev => prev.map(x =>
                    x.id === id ? { ...q, id: created._id, isEditing: false } : x
                ));
            } else {
                // update existing
                await updateQuizQuestion(qid, { ...payload, _id: id });
                setQuestions(prev => prev.map(x =>
                    x.id === id ? { ...x, isEditing: false } : x
                ));
            }
        } catch (err) {
            console.error('Save error', err);
        }
    };

    const cancelEdit = (id: string) => {
        const q = questions.find(x => x.id === id);
        if (!q) return;
        if (!q.title && !q.questionText && q.choices.every(c => !c.text)) {
            setQuestions(prev => prev.filter(x => x.id !== id));
        } else {
            setQuestions(prev => prev.map(x =>
                x.id === id ? { ...x, isEditing: false } : x
            ));
        }
    };

    const removeQuestion = async (id: string) => {
        if (qid) {
            try {
                await deleteQuizQuestion(qid, id);

            } catch (err) {
                console.error('Delete error', err);
            }
        }
        setQuestions(prev => prev.filter(x => x.id !== id));
    };

    const updateQuestion = (id: string, updates: Partial<Question>) => {
        setQuestions(prev => prev.map(q =>
            q.id === id ? { ...q, ...updates } : q
        ));
    };

    const handleChoiceChange = (qId: string, cId: string, value: string) => {
        const q = questions.find(x => x.id === qId);
        if (!q) return;
        const updated = q.choices.map(c =>
            c.id === cId ? { ...c, text: value } : c
        );
        updateQuestion(qId, { choices: updated });
    };

    const renderEditor = (q: Question) => (
        <Card className="mb-3" key={q.id} >
            <Card.Body>
                <Form>
                    <Row className="mb-2 align-items-center" >
                        <Col>
                            <Form.Control
                                type="text"
                                placeholder="Question Title"
                                value={q.title}
                                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                    updateQuestion(q.id, { title: e.target.value })
                                }
                            />
                        </Col>
                        <Col xs="auto">
                            <Form.Select
                                value={q.type}
                                onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                                    const newType = e.target.value as QuestionType;
                                    let choices: Choice[] = [];
                                    if (newType === 'multiple_choice') choices = q.choices;
                                    else if (newType === 'true_false') {
                                        choices = [
                                            { id: uuidv4(), text: 'True', isCorrect: true },
                                            { id: uuidv4(), text: 'False', isCorrect: false },
                                        ];
                                    }
                                    updateQuestion(q.id, { type: newType, choices });
                                }}
                            >
                                {QUESTION_TYPES.map(opt => (
                                    <option key={opt.value} value={opt.value}>
                                        {opt.label}
                                    </option>
                                ))}
                            </Form.Select>
                        </Col>
                        <Col xs="auto">
                            <InputGroup>
                                <Form.Control
                                    type="number"
                                    value={q.points}
                                    onChange={e => updateQuestion(q.id, { points: Number(e.target.value) })}
                                    style={{ width: '80px' }}
                                />
                                <InputGroup.Text>pts</InputGroup.Text>
                            </InputGroup>
                        </Col>
                    </Row>

                    <Form.Group className="mb-3">
                        <Form.Label className="fw-bold">Question Text</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            value={q.questionText}
                            onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                                updateQuestion(q.id, { questionText: e.target.value })
                            }
                        />
                    </Form.Group>

                    <div className="fw-bold mb-2">Answers</div>
                    
                    {q.type === 'multiple_choice' && (
                        <>
                            {q.choices.map(c => (
                                <Row key={c.id} className="align-items-center mb-2">
                                    <Col xs="auto">
                                        <Form.Check
                                            type="radio"
                                            name={`correct-${q.id}`}
                                            checked={c.isCorrect}
                                            onChange={() =>
                                                updateQuestion(q.id, {
                                                    choices: q.choices.map(x => ({ ...x, isCorrect: x.id === c.id })),
                                                })
                                            }
                                        />
                                    </Col>
                                    <Col>
                                        <Form.Control
                                            type="text"
                                            value={c.text}
                                            onChange={e => handleChoiceChange(q.id, c.id, e.target.value)}
                                        />
                                    </Col>
                                    <Col xs="auto">
                                        <Button
                                            variant="outline-secondary"
                                            size="sm"
                                            onClick={() =>
                                                updateQuestion(q.id, {
                                                    choices: q.choices.filter(x => x.id !== c.id),
                                                })
                                            }
                                        >
                                            ✕
                                        </Button>
                                    </Col>
                                </Row>
                            ))}
                            <div className="text-end">
                                <Button
                                    variant="link"
                                    className="text-danger text-decoration-none p-0"
                                    style={{ cursor: 'pointer' }}
                                    onClick={() =>
                                        updateQuestion(q.id, { choices: [...q.choices, { id: uuidv4(), text: '', isCorrect: false }] })
                                    }
                                >
                                    + Add Another Answer
                                </Button>
                            </div>
                        </>
                    )}

                    {q.type === 'true_false' && (
                        <Form.Group as={Row} className="mb-3">
                            <Col>
                                <Form.Check
                                    type="radio"
                                    label="True"
                                    name={`tf-${q.id}`}
                                    checked={q.choices.find(x => x.text === 'True')?.isCorrect}
                                    onChange={() =>
                                        updateQuestion(q.id, {
                                            choices: q.choices.map(x => ({ ...x, isCorrect: x.text === 'True' })),
                                        })
                                    }
                                />
                                <Form.Check
                                    type="radio"
                                    label="False"
                                    name={`tf-${q.id}`}
                                    checked={q.choices.find(x => x.text === 'False')?.isCorrect}
                                    onChange={() =>
                                        updateQuestion(q.id, {
                                            choices: q.choices.map(x => ({ ...x, isCorrect: x.text === 'False' })),
                                        })
                                    }
                                />
                            </Col>
                        </Form.Group>
                    )}

                    {q.type === 'fill_blank' && (
                        <>
                            {q.choices.map(c => (
                                <Row key={c.id} className="align-items-center mb-2">
                                    <Col>
                                        <Form.Control
                                            type="text"
                                            placeholder="Answer (case‑insensitive)"
                                            value={c.text}
                                          
                                            onChange={e => handleChoiceChange(q.id, c.id, e.target.value)}
                                        />
                                    </Col>
                                    <Col xs="auto">
                                        <Button
                                            variant="outline-secondary"
                                            size="sm"
                                            onClick={() =>
                                                updateQuestion(q.id, {
                                                    choices: q.choices.filter(x => x.id !== c.id),
                                                })
                                            }
                                        >
                                            ✕
                                        </Button>
                                    </Col>
                                </Row>
                            ))}
                            <div className="text-end">
                                <Button
                                    variant="link"
                                    className="p-0"
                                    onClick={() =>
                                        updateQuestion(q.id, {
                                            choices: [
                                                ...q.choices,
                                                { id: uuidv4(), text: '', isCorrect: true },
                                            ],
                                        })
                                    }
                                >
                                    + Add Another Answer
                                </Button>
                            </div>
                        </>
                    )}



                    <div className="text-end mt-3">
                        <Button variant="secondary" className="me-2" onClick={() => cancelEdit(q.id)}>
                            Cancel
                        </Button>
                        <Button variant="primary" onClick={() => saveQuestion(q.id)}>
                            Save Question
                        </Button>
                    </div>
                </Form>
            </Card.Body>
        </Card>
    );
    

    const renderPreview = (q: Question) => (
        <Card className="mb-3" key={q.id} style={{width:'600px'}}>
            <Card.Body>
                <Card.Title>{q.title || '(No title)'}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                    {QUESTION_TYPES.find(t => t.value === q.type)?.label}
                </Card.Subtitle>
                <Card.Text>{q.questionText}</Card.Text>

                {q.type === 'multiple_choice' && (
                    <ul>
                        {q.choices.map(c => (
                            <li key={c.id} style={{ fontWeight: c.isCorrect ? 'bold' : 'normal' }}>
                                {c.text || '(empty)'}
                            </li>
                        ))}
                    </ul>
                )}

                {q.type === 'true_false' && (
                    <div>
                        <Form.Check
                            type="radio"
                            label="True"
                            checked={q.choices.find(x => x.text === 'True')?.isCorrect}
                            readOnly
                        />
                        <Form.Check
                            type="radio"
                            label="False"
                            checked={q.choices.find(x => x.text === 'False')?.isCorrect}
                            readOnly
                        />
                    </div>
                )}

                <div className="mt-3">
                    <Button variant="link" size="sm" onClick={() => updateQuestion(q.id, { isEditing: true })}>
                        Edit
                    </Button>
                    <Button variant="link" size="sm" className="text-danger" onClick={() => removeQuestion(q.id)}>
                        Delete
                    </Button>
                </div>
            </Card.Body>
        </Card>
    );
    

    return (
        <div>
            <Button variant="secondary" className="mb-3" onClick={addQuestion}>
                + New Question
            </Button>
            {questions.map(q => (q.isEditing ? renderEditor(q) : renderPreview(q)))}
            <hr />
            <div className="px-3 mt-3">
                <Link to={`/Kambaz/Courses/${cid}/Quizzes/${qid}`}>
                    <Button variant="secondary" className="me-2">Cancel</Button>
                </Link>
                <Link to={`/Kambaz/Courses/${cid}/Quizzes/${qid}`}>
                    <Button variant="danger">Save</Button>
                </Link>
            </div>
        </div>
    );
}
