import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import * as fileUploadService from '../services/fileUploadService'
// NOTE FOR USE: 
// When using this FileUploadModal component in a new parent component/module, you will need to create a callback function in the PARENT file. example below:
// 
//      onFileUpload(uploadedImage) {  
//          this.setState({
//          imageUrl: : uploadedImage
//          })
//      }
//
// line 57 in this file will lift up the image url to the parent component. 
class FileUploadModal extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            show: false
            , imgData: ''
        };
        this.onOpen = this.onOpen.bind(this);
        this.onClose = this.onClose.bind(this);
        this.fileSelectedHandler = this.fileSelectedHandler.bind(this);
        this.onImgUpload = this.onImgUpload.bind(this);
    }
    onOpen() {
        this.setState({
            show: true
        })
    }
    onClose() {
        this.setState({
            show: false
        })
    }
    fileSelectedHandler = event => {
        console.log(event.target.files[0])
        this.setState({
            imgData: event.target.files[0]
        })
    }
    onImgUpload = event => {
        const img = this.state.imgData;
        console.log(img);
        fileUploadService.getSignedUrl(img)
            .then(response => {
                const promise = fileUploadService.upload(response.url, this.state.imgData)
                this.props.fileUpload(response.url)
                return promise;
            })
            .then(this.onClose)
            .catch(console.error);
    }
    render() {
        const fileUploadClick = (
            <div>
                <button className='btn btn-light btn--icon-text' type='button' onClick={this.onOpen}>
                    <i className='zmdi zmdi-upload'></i> File Upload</button>
            </div>
        )
        const modal = (
            <Modal show={this.state.show} onHide={this.onClose}>
                <Modal.Header closeButton>
                    <Modal.Title>File Upload</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='form-group col-sm 12'>
                        <input type='file' className='form-control-file' id='imageFile' name='imageFile' accept='.jpg, .jpeg, .png' onChange={this.fileSelectedHandler} />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.onImgUpload}>Upload</Button>
                </Modal.Footer>
            </Modal>
        )
        return (
            <div>
                {fileUploadClick}
                {modal}
            </div>
        )
    }
}
export default FileUploadModal;
