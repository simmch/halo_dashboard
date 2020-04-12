import React, { useState } from 'react'
import Spinner from '../isLoading/spinner';
import axios from 'axios';
import Alert from '../alerts/alerts'
import { setAlert } from '../../actions/alerts';
import { Form } from 'react-bootstrap';
import Uploader from '../xlsx/upload'

const Upload = () => {

    const [uploadData, setUploadData] = useState({
        selectedFile: null,
        loading: false
    });
    const onChangeHandler = e => {
        setUploadData({
            selectedFile: e.target.files[0]
        });
    };
    const onClickHandler = e => {
        e.preventDefault();
        setUploadData({ ...uploadData, loading: true })
        console.log(uploadData.selectedFile);
        const data = new FormData();
        data.append("file", uploadData.selectedFile);
        axios
            .post("/payroll/upload", data, {})
            .then(res => {
                console.log(res);
                setUploadData({
                    ...uploadData,
                    selectedFile: null
                });
            })
            .catch(err => {
                console.log(err);
            });
    };

    return (
        <div className="col-12 grid-margin stretch-card">
            <div className="card">
                <div className="card-body">
                    <h4 className="card-title">Upload Payroll File</h4>
                    <p className="card-description"> Validate the format before uploading </p>
                    <form>
                        <Form.Group>
                            <label>File upload</label>
                            <Form.Control type="file" name="selectedFile" className="file-upload-default" />
                            <div className="input-group col-xs-12">
                                <Form.Control type="text" className="form-control file-upload-info" disabled placeholder="Upload File" onChange={onChangeHandler} />
                                <span className="input-group-append">
                                    <button className="file-upload-browse btn btn-primary" type="button">Upload</button>
                                </span>
                            </div>
                        </Form.Group>
                        <button type="submit" className="btn btn-primary mr-2" >Submit</button>
                        <button className="btn btn-dark">Cancel</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Upload;
