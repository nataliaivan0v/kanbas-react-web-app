import { useState, useEffect, ChangeEvent } from 'react';
import { Form, Button, Card, Row, Col, InputGroup, ListGroup, Badge } from 'react-bootstrap';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { FaLongArrowAltRight } from "react-icons/fa";
import {
    fetchQuestionsForQuiz,
    updateQuizQuestions,
    createQuestionForQuiz,
    updateQuizQuestion,
    deleteQuizQuestion,
} from './quizQuestionsClient';

export type QuestionType = 'multiple_choice' | 'true_false' | 'fill_blank';

export interface Question {
    id: string;
    type: QuestionType;
    title: string;
    points: number;
    questionText: string;
    choices: string[];
    correct_answer_index: number;
    isEditing: boolean;
}

const QUESTION_TYPES: { value: QuestionType; label: string }[] = [
    { value: 'multiple_choice', label: 'Multiple Choice' },
    { value: 'true_false', label: 'True/False' },
    { value: 'fill_blank', label: 'Fill in the Blank' },
];

const createNewQuestion = (): Question => ({
    id: 'new-' + uuidv4(),
    type: 'multiple_choice',
    title: '',
    points: 0,
    questionText: '',
    correct_answer_index: 0,
    choices: [],
    isEditing: true,
});

export default function QuizQuestionsEditor() {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [deletedIds, setDeletedIds] = useState<string[]>([]);
    const { cid, qid } = useParams<{ cid: string; qid: string }>();
    const navigate = useNavigate();

    useEffect(() => {
        if (!qid) return;
        (async () => {
            try {
                const data: any[] = await fetchQuestionsForQuiz(qid);
                const loaded: Question[] = data.map(q => ({
                    id: q._id,
                    type: q.type as QuestionType,
                    title: q.title,
                    points: q.points,
                    questionText: q.text,
                    correct_answer_index: q.correct_answer_index,
                    choices: q.choices,
                    isEditing: false,
                }));
                setQuestions(loaded);
            } catch (err) {
                console.error('Failed to load questions', err);
            }
        })();
    }, [qid]);

    const addQuestion = () => {
        setQuestions(prev => [...prev, createNewQuestion()]);
    };

    const cancelEdit = (id: string) => {
        setQuestions(prev =>
            prev.map(q => (q.id === id ? { ...q, isEditing: false } : q))
        );
    };

    const startEdit = (id: string) => {
        setQuestions(prev =>
            prev.map(q => (q.id === id ? { ...q, isEditing: true } : q))
        );
    };

    const markDelete = (id: string) => {
        setDeletedIds(prev => [...prev, id]);
        setQuestions(prev => prev.filter(q => q.id !== id));
    };

    const updateQuestion = (id: string, updates: Partial<Question>) => {
        setQuestions(prev =>
            prev.map(q => (q.id === id ? { ...q, ...updates } : q))
        );
    };

    const handleChoiceChange = (qId: string, index: number, value: string) => {
        const q = questions.find(x => x.id === qId);
        if (!q) return;
        const updatedChoices = [...q.choices];
        updatedChoices[index] = value;
        updateQuestion(qId, { choices: updatedChoices });
    };

    // ** NEW: only called when bottom Save button is clicked **
    const handleSaveAll = async () => {
        if (!qid) return;

        const questionsPayload = questions.map(q => ({
            ...(q.id.startsWith('new-') ? {} : { _id: q.id }),
            title: q.title,
            type: q.type,
            points: q.points,
            text: q.questionText,
            choices: q.choices,
            correct_answer_index: q.correct_answer_index,
        }));

        const realDeletedIds = deletedIds.filter(id => !id.startsWith('new-'));

        try {
            await updateQuizQuestions(qid, {
                questions: questionsPayload,
                deletedIds: realDeletedIds,
            });

            // on success, navigate back
            navigate(`/Kambaz/Courses/${cid}/Quizzes/${qid}`);
        } catch (err) {
            console.error('Bulk save error', err);
            // show toast or validation error here if you want
        }
    };

    const renderEditor = (q: Question) => (
        <Card className="mb-3" key={q.id}>
            <Card.Body>
                <Form>
                    <Row className="mb-2 align-items-center">
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
                                    let choices: string[] = [];
                                    if (newType === 'true_false') {
                                        choices = ['True', 'False'];
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
                                    onChange={e =>
                                        updateQuestion(q.id, { points: Number(e.target.value) })
                                    }
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

                    {q.type !== 'true_false' && (
                        q.choices.map((c, index) => (
                            <Row key={index} className="align-items-center mb-2">
                                <Col xs="auto">
                                    <Form.Check
                                        type="radio"
                                        name={`correct-${q.id}`}
                                        checked={index === q.correct_answer_index}
                                        onChange={() =>
                                            updateQuestion(q.id, { correct_answer_index: index })
                                        }
                                    />
                                </Col>
                                <Col>
                                    <Form.Control
                                        type="text"
                                        value={c}
                                        onChange={e =>
                                            handleChoiceChange(q.id, index, e.target.value)
                                        }
                                    />
                                </Col>
                                <Col xs="auto">
                                    <Button
                                        variant="outline-secondary"
                                        size="sm"
                                        onClick={() =>
                                            updateQuestion(q.id, {
                                                choices: q.choices.filter((_, i) => i !== index),
                                            })
                                        }
                                    >
                                        ✕
                                    </Button>
                                </Col>
                            </Row>
                        ))
                        )}
                        

                    {q.type !== 'true_false' && (
                        <div className="text-end">
                            <Button
                                variant="link"
                                className="text-decoration-none p-0"
                                onClick={() =>
                                    updateQuestion(q.id, { choices: [...q.choices, ''] })
                                }
                            >
                                + Add Another Answer
                            </Button>
                        </div>
                    )}

                    {q.type === 'true_false' && (
                        <Form.Group as={Row} className="mb-3">
                            <Col>
                                <Form.Check
                                    type="radio"
                                    label="True"
                                    name={`tf-${q.id}`}
                                    checked={q.correct_answer_index === 0}
                                    onChange={() =>
                                        updateQuestion(q.id, { correct_answer_index: 0 })
                                    }
                                />
                                <Form.Check
                                    type="radio"
                                    label="False"
                                    name={`tf-${q.id}`}
                                    checked={q.correct_answer_index === 1}
                                    onChange={() =>
                                        updateQuestion(q.id, { correct_answer_index: 1 })
                                    }
                                />
                            </Col>
                        </Form.Group>
                    )}

                    <div className="text-end mt-3">
                        <Button
                            variant="secondary"
                            className="me-2"
                            onClick={() => cancelEdit(q.id)}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="danger"
                            className="me-2"
                            onClick={() => updateQuestion(q.id, { isEditing: false })}
                        >
                            Save
                        </Button>
                        {!q.isEditing && (
                            <Button
                                variant="primary"
                                onClick={() => startEdit(q.id)}
                            >
                                Edit
                            </Button>
                        )}
                    </div>
                </Form>
            </Card.Body>
        </Card>
    );

    const renderPreview = (q: Question) => (
        <Card className="mb-3" key={q.id} style={{ width: '600px' }}>
            <Card.Body>
                <Card.Title>{q.title || '(No title)'}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                    {QUESTION_TYPES.find(t => t.value === q.type)?.label}
                </Card.Subtitle>
                <Card.Text>{q.questionText}</Card.Text>
                <Card.Subtitle className="mb-2 text-muted">
                    {q.points} Points
                </Card.Subtitle>
                <ListGroup className="mb-3">
                    {q.choices.map((c, i) => {
                        const isCorrect = (i === q.correct_answer_index) || (q.type == "fill_blank")
                        return (
                            <ListGroup.Item
                                key={i}
                                className="d-flex align-items-center"
                                variant={isCorrect ? 'success' : undefined}
                            >

                                {isCorrect && (
                                    <FaLongArrowAltRight className="me-2 text-success" />
                                )}

                                <Badge bg={isCorrect ? 'success' : 'secondary'} pill className="me-3">
                                    {isCorrect ? 'Correct Answer' : 'Possible Option'}
                                </Badge>

                                <span>{c}</span>
                            </ListGroup.Item>
                        );
                    })}
                </ListGroup>


                <div className="mt-3 text-end">
                    <Button
                        variant="link"
                        size="sm"
                        onClick={() => startEdit(q.id)}
                    >
                        Edit
                    </Button>
                    <Button
                        variant="link"
                        size="sm"
                        className="text-danger"
                        onClick={() => markDelete(q.id)}
                    >
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

            {questions.map(q =>
                q.isEditing ? renderEditor(q) : renderPreview(q)
            )}

            <hr />

            <div className="px-3 mt-3">
                <Link to={`/Kambaz/Courses/${cid}/Quizzes/${qid}`}>
                    <Button variant="secondary" className="me-2">
                        Cancel
                    </Button>
                </Link>

                <Button variant="danger" onClick={handleSaveAll}>
                    Save
                </Button>
            </div>
        </div>
    );
}
