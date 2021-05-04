import { useState } from 'react'
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

const AddCashCount = ({onAdd, handleClose}) => {

    const [arNumber, setArNumber] = useState('')
    const [amount, setAmount] = useState(0)
    const [inCash, setInCash] = useState(false)
    const [massIntention, setMassIntention] = useState(false)
    const [particulars, setParticulars] = useState('')
    const [remarks, setRemarks] = useState('')


    const onSubmit = (e) => {
        e.preventDefault()

        // if(!text) {
        //     alert('Please add a task')
        //     return
        // }

        onAdd({arNumber, amount, inCash, massIntention, particulars, remarks})

        setArNumber('')
        setAmount(0)
        setInCash(false)
        setMassIntention(false)
        setParticulars('')
        setRemarks('')
    }

    return (
        // <form className='add-form' onSubmit={onSubmit}>
        //     <div className='form-control'>
        //         <label>AR #</label>
        //         <input type='number' placeholder='AR Number' value={text} onChange={(e) => setArNumber(e.target.value)} />
        //     </div>

        //     <div className='form-control'>
        //         <label>Amount</label>
        //         <input type='text' placeholder='Amount' value={day} onChange={(e) => setAmount(e.target.value)} />
        //     </div>

        //     <div className='form-control form-control-check'>
        //         <label>Cash</label>
        //         <input type='checkbox' checked= {reminder} value={reminder} onChange={(e) => setInCash(e.currentTarget.checked )} />
        //     </div>
        //     <div className='form-control form-control-check'>
        //         <label>Mass Intention</label>
        //         <input type='checkbox' checked= {reminder} value={reminder} onChange={(e) => setMassIntention(e.currentTarget.checked )} />
        //     </div>

        //     <div className='form-control'>
        //         <label>Particulars</label>
        //         <input type='number' placeholder='Paritculars' value={text} onChange={(e) => setParticulars(e.target.value)} />
        //     </div>

        //     <div className='form-control'>
        //         <label>Remarks</label>
        //         <input type='number' placeholder='Remarks' value={text} onChange={(e) => setRemarks(e.target.value)} />
        //     </div>

        //     <input type='submit' value='Save' className='btn btn-block'/>
            
        // </form>

        <Dialog open={true} onClose={handleClose} aria-labelledby="form-dialog-title">
                            <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
                            <DialogContent>
                            <DialogContentText>
                                Add Cash Count
                            </DialogContentText>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                label="Email Address"
                                type="email"
                                fullWidth
                            />
                            </DialogContent>
                            <DialogActions>
                            <Button onClick={handleClose} color="primary">
                                Cancel
                            </Button>
                            <Button onClick={handleClose} color="primary">
                                Subscribe
                            </Button>
                            </DialogActions>
                        </Dialog>
    )
}

export default AddCashCount
