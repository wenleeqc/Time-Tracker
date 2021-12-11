import React, {useState} from 'react';
import axios from 'axios';
import Chart from './Chart';

function CsvReader() {
    const [file, setFile] = useState('')
    //const [filename, setFilename] = useState('');
    const [isHidden, setIsHidden] = useState(true);

    const onChange = e => {
        setFile(e.target.files[0]);
        //setFilename(e.target.files[0].name);
    }

    const onSubmit = async e => {
        e.preventDefault();
        setIsHidden(true);
        const formData = new FormData();
        formData.append('file', file);

        try {
            const res = await axios.post('/api', formData, {
                headers: {
                    'Constent-Type': 'multipart/form-data'
                }
            });
        } catch (error) {
            console.log(error)
        }
    }

    const clickTest = () => {
        setIsHidden(!isHidden);
    }

    return(
        <div>
            <form onSubmit={onSubmit}>
                <div className="custom-file">
                    <label className="custom-file-label mb-1 text-white" htmlFor="customFile">Choose file:</label>
                    <input type="file" className="custom-file-input text-white" id="customFile" onChange={onChange} />
                    
                </div>

                <input type="submit" value="Upload" className="btn btn-sm btn-block btn-success my-2" />
                <input type="button" value="Make Chart" className="btn btn-sm btn-block btn-success mx-2" onClick={clickTest} />
            </form>

            {isHidden ? (<div></div>) : <Chart />}      
        </div>
    )
}

export default CsvReader