import React, { useState } from 'react';
import { connect } from 'react-redux';
import Spinner from '../isLoading/spinner';
import axios from 'axios';
import Alert from '../alerts/alerts'
import { setAlert } from '../../actions/alerts';
import { uploadFile } from '../../actions/upload/upload';
import { Form } from 'react-bootstrap';

const Upload = ({ setAlert, isLoading, uploadFile }) => {

    const [uploadData, setUploadData] = useState({
        selectedFile: null,
        fileName: null,
        loading: false
    });

    const onChangeHandler = e => {
        setUploadData({
            selectedFile: e.target.files[0],
            fileName: e.target.files[0].name
        });
    };
    const onClickHandler = e => {
        e.preventDefault();
        setUploadData({ ...uploadData, loading: true })
        const data = new FormData();
        data.append("file", uploadData.selectedFile);
        uploadFile(data)
    };

    return isLoading ? (

        <div>
            <div className="d-flex align-items-center login-card auth px-0">
                <div className="row w-100 mx-0">
                    <div className="col-lg-8 mx-auto">
                        <Alert />
                        <Spinner />
                    </div>
                </div>
            </div>
        </div>



    ) : (
            <div className="col-12 grid-margin stretch-card">
                <div className="card">
                    <div className="card-body">
                        <h4 className="card-title">Upload Payroll File</h4>
                        <p className="card-description"> Validate the format before uploading </p>
                        <form>
                            <Form.Group>
                                <div className="mb-3">
                                    <Form.File id="formcheck-api-custom" custom>
                                        <Form.File.Input name="selectedFile" onChange={onChangeHandler} />
                                        <Form.File.Label data-browse="Upload File">
                                            {uploadData.fileName}
                                        </Form.File.Label>
                                    </Form.File>
                                </div>
                            </Form.Group>
                            <button type="submit" className="btn btn-primary mr-2" onClick={onClickHandler}>Submit</button>
                            <button className="btn btn-dark">Cancel</button>
                        </form>

                    </div>
                </div>
            </div>
        )
}

const mapStateToProps = (state) => ({
    isLoading: state.auth.loading,
    uploadFile: state.upload,
});

export default connect(mapStateToProps, { setAlert, uploadFile })(Upload);
