import React from "react";
import { Modal } from "react-bootstrap";
import YouTube from "react-youtube";

const TrailerModal = ({ show, handleClose, videoId }) => {
    return (
        <Modal show={show} onHide={handleClose} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title>예고편</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="video-wrapper">
                    {videoId ? (
                        <YouTube
                            videoId={videoId}
                            opts={{ width: "100%", height: "400px" }}
                        />
                    ) : (
                        <p>예고편을 불러올 수 없습니다.</p>
                    )}
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default TrailerModal;