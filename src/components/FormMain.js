import React, {useState} from 'react';
import axios from 'axios';
import {
    Card,
    Input,
    Button,
    Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter
  } from "@material-tailwind/react";
  import './Form.css';
  import EmailSVG from '../components/assets/Vector.svg';
  import FileSVG from '../components/assets/file.svg';
  import modalSVG from './assets/modal.svg'

function FormMain() {
    
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState(null);
    const [jsonContent, setJsonContent] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [isModalOpen, setIsModalOpen] = React.useState(false);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
        setErrorMessage('');
    
        if (selectedFile) {
          // Validate if it's a JSON file
          if (selectedFile.type === 'application/json') {
            setLoading(true);
            setTimeout(() => {
              const reader = new FileReader();
              reader.readAsText(selectedFile, 'UTF-8');
    
              reader.onload = (e) => {
                try {
                  const jsonData = JSON.parse(e.target.result);
                  setJsonContent(jsonData);
                } catch (error) {
                  console.error('Invalid JSON file format');
                } finally {
                  setLoading(false);
                }
              };
            }, 1000); // Simulating 3-second validation
          } else {
            setErrorMessage('Only JSON-format files can be uploaded.');
          }
        }
      };

    const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate an API call (replace with actual API call)
    try {
        await axios.post('/your-api-endpoint', jsonContent);
      } catch (error) {
        console.error('Error uploading JSON data:', error);
      }
      setLoading(false);
    };

    const handleOpen = () => setIsModalOpen(!isModalOpen);
  return (
    <>
    <div className='container'>
            <div className='top-section'>
                <div className='time'>
                    12:30
                </div>
                <div className='top-right'>
                    <div className='network-icon'>
                        <svg width="18" height="12" viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path id="Cellular" fill-rule="evenodd" clip-rule="evenodd" d="M16.9412 0H15.8824C15.2976 0 14.8235 0.50368 14.8235 1.125V10.875C14.8235 11.4963 15.2976 12 15.8824 12H16.9412C17.5259 12 18 11.4963 18 10.875V1.125C18 0.50368 17.5259 0 16.9412 0ZM10.9412 2.625H12C12.5848 2.625 13.0588 3.12868 13.0588 3.75V10.875C13.0588 11.4963 12.5848 12 12 12H10.9412C10.3564 12 9.88233 11.4963 9.88233 10.875V3.75C9.88233 3.12868 10.3564 2.625 10.9412 2.625ZM7.05884 5.25H6.00002C5.41525 5.25 4.9412 5.75368 4.9412 6.375V10.875C4.9412 11.4963 5.41525 12 6.00002 12H7.05884C7.64362 12 8.11767 11.4963 8.11767 10.875V6.375C8.11767 5.75368 7.64362 5.25 7.05884 5.25ZM2.11765 7.5H1.05882C0.474051 7.5 0 8.00368 0 8.625V10.875C0 11.4963 0.474051 12 1.05882 12H2.11765C2.70242 12 3.17647 11.4963 3.17647 10.875V8.625C3.17647 8.00368 2.70242 7.5 2.11765 7.5Z" fill="#170E2B"/>
                        </svg>
                    </div>
                    <div className='wifi-icon'>
                        <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path id="Wifi" fill-rule="evenodd" clip-rule="evenodd" d="M8.00044 2.49216C10.3219 2.49226 12.5546 3.42402 14.2371 5.09485C14.3638 5.22384 14.5663 5.22222 14.691 5.0912L15.9021 3.81448C15.9653 3.74803 16.0005 3.65802 16 3.56436C15.9995 3.47071 15.9632 3.38114 15.8993 3.31546C11.4834 -1.10515 4.51678 -1.10515 0.100859 3.31546C0.0368916 3.38109 0.000597157 3.47063 7.30289e-06 3.56429C-0.000582551 3.65794 0.0345808 3.74798 0.0977163 3.81448L1.30914 5.0912C1.43384 5.22241 1.6365 5.22404 1.76312 5.09485C3.44579 3.42391 5.67875 2.49215 8.00044 2.49216ZM8.00043 6.64588C9.27592 6.6458 10.5059 7.14102 11.4514 8.03532C11.5792 8.16224 11.7807 8.15949 11.9053 8.02912L13.115 6.7524C13.1787 6.68543 13.2141 6.59458 13.2132 6.50018C13.2122 6.40578 13.1751 6.3157 13.1101 6.2501C10.231 3.45256 5.7723 3.45256 2.89317 6.2501C2.82813 6.3157 2.79102 6.40582 2.79017 6.50026C2.78932 6.59469 2.82479 6.68553 2.88863 6.7524L4.09795 8.02912C4.22261 8.15949 4.42405 8.16224 4.55193 8.03532C5.49677 7.14161 6.72577 6.64644 8.00043 6.64588ZM10.4236 9.44061C10.4255 9.53528 10.3898 9.62655 10.3251 9.69287L8.23266 11.8987C8.17132 11.9635 8.08769 12 8.00043 12C7.91317 12 7.82954 11.9635 7.7682 11.8987L5.67536 9.69287C5.61071 9.6265 5.57514 9.5352 5.57706 9.44053C5.57898 9.34586 5.61821 9.25622 5.68549 9.19276C7.02183 8.0121 8.97903 8.0121 10.3154 9.19276C10.3826 9.25627 10.4218 9.34594 10.4236 9.44061Z" fill="#170E2B"/>
                        </svg>
                    </div>
                    <div className='charge-icon'>
                        <svg width="24" height="12" viewBox="0 0 24 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="Battery">
                        <path id="Union" opacity="0.4" fill-rule="evenodd" clip-rule="evenodd" d="M2.66667 1H19.0367C19.9572 1 20.7034 1.74619 20.7034 2.66667V9.33333C20.7034 10.2538 19.9572 11 19.0367 11H2.66666C1.74619 11 1 10.2538 1 9.33333V2.66667C1 1.74619 1.74619 1 2.66667 1ZM0 2.66667C0 1.19391 1.19391 0 2.66667 0H19.0367C20.5094 0 21.7034 1.19391 21.7034 2.66667V9.33333C21.7034 10.8061 20.5094 12 19.0367 12H2.66666C1.19391 12 0 10.8061 0 9.33333V2.66667ZM24 6C24 6.9245 23.4838 7.75894 22.6899 8.11765V3.88235C23.4838 4.24106 24 5.07551 24 6Z" fill="#170E2B"/>
                        <rect id="Capacity" x="1.97302" y="2.11768" width="17.7573" height="7.76471" rx="1.33333" fill="#170E2B"/>
                        </g>
                        </svg>
                    </div>
                </div>
            </div>
            <div className='back-icon'>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path id="Vector" d="M16 8C16 8.21216 15.9298 8.41563 15.8047 8.56565C15.6797 8.71567 15.5102 8.79995 15.3334 8.79995H2.27628L7.13862 14.6336C7.20056 14.708 7.24969 14.7962 7.28322 14.8933C7.31674 14.9904 7.33399 15.0945 7.33399 15.1996C7.33399 15.3047 7.31674 15.4088 7.28322 15.5059C7.24969 15.603 7.20056 15.6912 7.13862 15.7656C7.07669 15.8399 7.00315 15.8988 6.92223 15.9391C6.8413 15.9793 6.75457 16 6.66697 16C6.57938 16 6.49264 15.9793 6.41172 15.9391C6.33079 15.8988 6.25726 15.8399 6.19532 15.7656L0.195518 8.56597C0.133536 8.49167 0.0843647 8.40345 0.0508163 8.30633C0.0172679 8.20922 0 8.10513 0 8C0 7.89487 0.0172679 7.79078 0.0508163 7.69366C0.0843647 7.59655 0.133536 7.50832 0.195518 7.43403L6.19532 0.234432C6.32041 0.0843276 6.49007 -1.5816e-09 6.66697 0C6.84388 1.5816e-09 7.01353 0.0843276 7.13862 0.234432C7.26371 0.384536 7.33399 0.588121 7.33399 0.8004C7.33399 1.01268 7.26371 1.21626 7.13862 1.36637L2.27628 7.20004H15.3334C15.5102 7.20004 15.6797 7.28432 15.8047 7.43435C15.9298 7.58437 16 7.78784 16 8Z" fill="black"/>
                    </svg>
                    <div className='submit-form-txt'>
                    Submit form
                </div>
                </div>
                
             <div className='form-container'>   
                    <Card color="transparent" shadow={false}>
                    
                    <form className="mt-5 ml-20 w-80 max-w-screen-lg sm:w-96">
                    <div className="flex flex-col gap-3 width">
                        <Input type="text" variant="outlined" label="Full Name"  />
                        <Input type="email" variant="outlined" label="Email"  /> <span className='emailSvg'><img src={EmailSVG} alt='mail'/></span>
                        
                        Upload JSON File<label className="custom-file-upload mt-1">
                            <input type="file" accept='.json' onChange={handleFileChange}/>
                            <span><img src={FileSVG} alt='file' className='file'/></span>
                            <span className='file'>Browse File</span>
                        </label>
                        
                    </div>
                    <div className='file-contents-section'>
                        <div className='file-contents-txt mt-2'>File Contents</div>
                        <div className='file-contents-details'>
                            {jsonContent && (
                                <pre style={{ textAlign: 'justify' }}>
                                {JSON.stringify(jsonContent, null, 2)}
                                </pre>
                            )}
                        </div>
                        <div className='modal'>
                        <Button variant="filled" fullWidth className='btn mt-5' onClick={handleOpen}>Submit</Button>
                        <Dialog open={isModalOpen} handler={handleOpen} className='dialog'>
                            <DialogBody divider className='dialog'>
                            <img src={modalSVG}/>
                            <span className='one'>Success!</span>
                            <div className='two'>524 entries successfully uploaded</div>
                            <Button variant="filled" fullWidth className='btn' >Submit</Button>
                            <Button variant="filled" fullWidth className='btn btn-light' onClick={() =>setIsModalOpen(false)}>Cancel</Button>
                            </DialogBody>
                            {/* <DialogFooter>
                            <Button
                                variant="text"
                                color="red"
                                onClick={handleOpen}
                                className="mr-1"
                            >
                                <span>Cancel</span>
                            </Button>
                            <Button variant="gradient" color="green" onClick={handleOpen}>
                                <span>Confirm</span>
                            </Button>
                            </DialogFooter> */}
                        </Dialog>
                        </div>
                    </div>
                    </form>
                    </Card>
                </div> 
    </div>
    </>
  )
}

export default FormMain