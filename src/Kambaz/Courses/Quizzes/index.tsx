/* eslint-disable @typescript-eslint/no-explicit-any */
import { FaSearch, FaPlus } from "react-icons/fa";
import { Button, ListGroup } from "react-bootstrap";
import { MdOutlineRocketLaunch } from "react-icons/md";
import { IoMdArrowDropdown } from "react-icons/io";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "../Modules/GreenCheckmark";
import { RiProhibitedLine } from "react-icons/ri";
import { useState, useRef, useEffect } from "react";
import * as quizzesClient from "./client";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Modal } from "react-bootstrap";
import { FormControl } from "react-bootstrap";

export default function Quizzes() {
  const { cid } = useParams();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const [quizzes, setQuizzes] = useState<any[]>([]);
  const [menuOpenId, setMenuOpenId] = useState<string | null>(null);
  const [quizToDelete, setQuizToDelete] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (cid) {
      quizzesClient.findQuizzesForCourse(cid).then(setQuizzes);
    }
  }, [cid]);

  const fetchQuizzes = async () => {
    if (cid) {
      quizzesClient.findQuizzesForCourse(cid).then(setQuizzes);
    }
  };

  useEffect(() => {
    fetchQuizzes();
  }, [cid]);

  const handleDeleteClick = (quizId: string, e: React.MouseEvent) => {
    e.preventDefault();
    setQuizToDelete(quizId);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = () => {
    if (quizToDelete) {
      quizzesClient.deleteQuiz(quizToDelete);
      setQuizzes(quizzes.filter((q) => q._id !== quizToDelete));
    }
    setShowDeleteModal(false);
    setQuizToDelete(null);
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
    setQuizToDelete(null);
  };

  const handleEdit = (quiz: any) => {
    navigate(`/Kambaz/Courses/${quiz.course}/Quizzes/${quiz._id}`);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpenId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handlePublishClick = async (quizId: string, e: React.MouseEvent) => {
    e.preventDefault();
    await quizzesClient.publishQuiz(quizId);
    fetchQuizzes();
  };

  const handleUnpublishClick = async (quizId: string, e: React.MouseEvent) => {
    e.preventDefault();
    await quizzesClient.unpublishQuiz(quizId);
    fetchQuizzes();
  };

  const createQuiz = async () => {
    await quizzesClient.createQuizForCourse(cid as string, blankQuiz);
    fetchQuizzes();
  };

  function addDay(date: Date): Date {
    const newDate = new Date(date);
    newDate.setDate(date.getDate() + 1);
    return newDate;
  }

  const blankQuiz: {
    title: string;
    course: string | undefined;
    availableFrom: string;
    availableUntil: string;
    dueDate: string;
    points: string;
    numQuestions: string;
    score: string;
    published: string;
    description: string;
    type: string;
    group: string;
    shuffle: string;
    timeLimit: string;
    attempts: string;
    showAnswers: string;
    accessCode: string;
    oneQuestion: string;
    webcam: string;
    lock: string;
  } = {
    title: "Unnamed Quiz",
    course: cid,
    availableFrom: "",
    availableUntil: "",
    dueDate: "",
    points: "",
    numQuestions: "",
    score: "",
    published: "Unpublished",
    description: "",
    type: "Graded Quiz",
    group: "Quizzes",
    shuffle: "Yes",
    timeLimit: "20",
    attempts: "1",
    showAnswers: "",
    accessCode: "",
    oneQuestion: "Yes",
    webcam: "No",
    lock: "No",
  };

  const filterQuizzesByTitle = async (title: string) => {
    if (title) {
      const quizzes = await quizzesClient.findQuizzesByPartialName(title);
      setQuizzes(quizzes);
    } else {
      fetchQuizzes();
    }
  };

  return (
    <div id="wd-quizzes" className="align-items-center mb-3">
      <div className="d-flex align-items-center mb-3">
        <div className="input-group flex-grow-1 w-50">
          <span className="input-group-text bg-white border-end-0">
            <FaSearch className="text-secondary" />
          </span>
          <FormControl
            onChange={(e) => filterQuizzesByTitle(e.target.value)}
            placeholder="Search for Quiz"
            className="float-start w-25 me-2 wd-filter-by-name"
          />
        </div>

        {currentUser.role === "FACULTY" && (
          <Button
            variant="danger"
            id="wd-add-quiz"
            style={{ bottom: "1px", marginLeft: "200px" }}
            onClick={createQuiz}
          >
            <FaPlus
              className="position-relative me-2"
              style={{ bottom: "1px" }}
            />
            Quiz
          </Button>
        )}
      </div>

      <ListGroup className="rounded-0" id="wd-modules">
        <ListGroup.Item className="wd-module p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary">
            <IoMdArrowDropdown style={{ marginRight: "5px" }} />
            <b>QUIZZES</b>
          </div>
          <ListGroup className="wd-lessons rounded-0">
            {quizzes
              .filter((quiz) => {
                if (currentUser.role === "STUDENT") {
                  return quiz.published === "Published";
                }
                return true;
              })
              .map((quiz) => (
                <Link
                  to={`/Kambaz/Courses/${quiz.course}/Quizzes/${quiz._id}`}
                  key={quiz._id}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <ListGroup.Item className="wd-lesson p-3 d-flex align-items-center">
                    <MdOutlineRocketLaunch
                      style={{ color: "green" }}
                      className="me-2 fs-4"
                    />
                    <div id="wd-assignment-text" className="flex-grow-1">
                      <b>{quiz.title}</b> <br />
                      <span id="wd-quiz-text">
                        {(() => {
                          const now = new Date();
                          const availableFrom = addDay(new Date(quiz.availableFrom));
                          const availableUntil = addDay(new Date(quiz.availableUntil));
                          const dueDate = addDay(new Date(quiz.dueDate));

                          if (now < availableFrom) {
                            return (
                              <>
                                <b>Not available until</b>{" "}
                                {availableFrom.toLocaleDateString()} |{" "}
                                <b>Due</b> {dueDate.toLocaleDateString()}
                              </>
                            );
                          } else if (now > availableUntil) {
                            return (
                              <>
                                <b>Closed</b> | <b>Due</b>{" "}
                                {dueDate.toLocaleDateString()}
                              </>
                            );
                          } else {
                            return (
                              <>
                                <b>Available</b>{" "}
                                {availableFrom.toLocaleDateString()} |{" "}
                                <b>Due</b> {dueDate.toLocaleDateString()}
                              </>
                            );
                          }
                        })()}
                        {" | "} {quiz.points} points | {quiz.numQuestions}{" "}
                        questions
                      </span>
                    </div>
                    {quiz.published === "Published" && <GreenCheckmark />}
                    {quiz.published === "Unpublished" && (
                      <div
                        style={{ cursor: "pointer" }}
                        onClick={(e) => {
                          handlePublishClick(quiz._id, e);
                        }}
                      >
                        <RiProhibitedLine
                          style={{ color: "red", fontSize: "1.5rem" }}
                        />
                      </div>
                    )}
                    {currentUser.role === "FACULTY" && (
                      <IoEllipsisVertical
                        className="fs-4"
                        style={{ cursor: "pointer" }}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setMenuOpenId(
                            menuOpenId === quiz._id ? null : quiz._id
                          );
                        }}
                      />
                    )}
                    {menuOpenId === quiz._id && (
                      <div
                        ref={menuRef}
                        style={{
                          position: "absolute",
                          top: "100%",
                          right: 0,
                          background: "#fff",
                          border: "1px solid #ccc",
                          boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                          zIndex: 999,
                          borderRadius: "8px",
                          minWidth: "160px",
                        }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div
                          style={{ padding: "8px 12px", cursor: "pointer" }}
                          onClick={() => handleEdit(quiz._id)}
                        >
                          Edit
                        </div>
                        <div
                          style={{
                            padding: "8px 12px",
                            cursor: "pointer",
                          }}
                          onClick={(e) => handleDeleteClick(quiz._id, e)}
                        >
                          Delete
                        </div>
                        <div
                          style={{ padding: "8px 12px", cursor: "pointer" }}
                          onClick={(e) => {
                            if (quiz.published === "Published") {
                              handleUnpublishClick(quiz._id, e);
                            } else {
                              handlePublishClick(quiz._id, e);
                            }
                          }}
                        >
                          {quiz.published === "Published"
                            ? "Unpublish"
                            : "Publish"}
                        </div>
                      </div>
                    )}
                  </ListGroup.Item>
                </Link>
              ))}
          </ListGroup>
        </ListGroup.Item>
      </ListGroup>

      <Modal show={showDeleteModal} onHide={handleDeleteCancel}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this quiz?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleDeleteCancel}>
            No
          </Button>
          <Button variant="danger" onClick={handleDeleteConfirm}>
            Yes, Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
