import React, { useState } from 'react';
import axios from 'axios';
import Loader from './Loader';

function ImageUpload() {
    const [selectedFile, setSelectedFile] = useState();
    const [base64, setbase64] = useState();
    const [isSelected, setIsSelected] = useState(false);
    const [response, setresponse] = useState();
    const [isloading, setisloading] = useState(false);


    const changeHandler = (event) => {
        setSelectedFile(event.target.files[0]);
        setIsSelected(true);
        //do the convertion to base64
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setbase64(reader.result);
        };
        reader.readAsDataURL(file);
    };


    //send img in base64 to backend
    const handleSubmission = async () => {
        try {
            setisloading(true);
            const res = await axios.post('/', {
                ImageUri: base64,
            });
            // eslint-disable-next-line no-eval
            const RecommendedObjs = eval(res.data);
            setresponse(RecommendedObjs);
            setisloading(false);
        } catch (error) {
            console.error(error);
        }
    };


    return (
        <div className="flex flex-row items-center justify-between">
            <div className="flex-col items-center jusify-center">
                <input className="m-5 ml-0" type="file" name="file" onChange={changeHandler} />
                {isSelected ? (
                    <div className="my-5">
                        <p>Filename: {selectedFile.name}</p>
                        <p>Filetype: {selectedFile.type}</p>
                        <p>Size in bytes: {selectedFile.size}</p>
                        <p>
                            lastModifiedDate:{' '}
                            {selectedFile.lastModifiedDate.toLocaleDateString()}
                        </p>
                    </div>
                ) : (
                    <p className="my-4">Select a file to show details</p>
                )}
                <div className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-20">
                    <button onClick={handleSubmission}>Submit</button>
                </div>
            </div>

            {
                !isloading
                    ?
                    (
                        <div className="flex flex-wrap align-center justify-center p-5 overflow-auto container bg-gray-200 border rounded-xl">
                            {response ?
                                response.map((item) => {
                                    return (
                                        <div className="flex-col m-2">
                                            <div className="container border rounded">
                                                <img src={`${process.env.PUBLIC_URL}/${item[7]}`} alt="" className="w-60 h-60" />
                                            </div>
                                            <div className="flex align-center justify-center text-md text-gray-800">
                                                {item[0]}  {item[1]}  {item[2]} <br />
                                                {item[3]} {item[4]} <br />
                                                {item[5]} {item[6]}
                                            </div>

                                        </div>
                                    )
                                })
                                :
                                <></>
                            }
                        </div>
                    )
                    :
                    (
                        <div className="flex align-center justify-center container mt-72 w-72 mr-96">
                            <Loader />
                        </div>
                    )
            }

        </div>
    )
}

export default ImageUpload;
