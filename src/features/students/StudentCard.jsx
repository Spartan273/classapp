import React, { useEffect, useState } from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import { FormControl, FormLabel, Grid, Input, Stack } from "@mui/material";
import Divider from '@mui/joy/Divider';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import DialogActions from '@mui/joy/DialogActions';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import DeleteForever from '@mui/icons-material/DeleteForever';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import { useStudents } from "./useStudents";
import { useDeleteStudent } from "./useDeleteStudent";

export default function StudentCard({ student }) {

    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [openModifyModal, setOpenModifyModal] = useState(false);
    const { deleteStudent, isDeleting } = useDeleteStudent();

    function handleDeleteConfirm(){
        
        deleteStudent(student.id);
        setOpenDeleteModal(false);
    }

    function submitForm(){
      alert("form submited");
    }

    

  return (
    
      <Grid item xs={3}>
        <Card
          orientation="horizontal"
        >
          <AspectRatio flex ratio="1" maxHeight={182} sx={{ minWidth: 182 }}>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/768px-User-avatar.svg.png"
              srcSet="https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/768px-User-avatar.svg.png"
              loading="lazy"
              alt=""
            />
          </AspectRatio>
          <CardContent>
            <Typography fontSize="xl" fontWeight="lg">
              {student.firstName}
            </Typography>
            <Typography
              level="body-sm"
              fontWeight="lg"
              textColor="text.tertiary"
            >
              {student.code}
            </Typography>
            <Sheet
              sx={{
                bgcolor: "background.level1",
                borderRadius: "sm",
                p: 1.5,
                my: 1.5,
                display: "flex",
                gap: 2,
                "& > div": { flex: 1 },
              }}
            >
              <div>
                <Typography level="body-xs" fontWeight="lg">
                  Present
                </Typography> 
                <Typography fontWeight="lg">34</Typography>
              </div>
              <div>
                <Typography level="body-xs" fontWeight="lg">
                  Late
                </Typography>
                <Typography fontWeight="lg">980</Typography>
              </div>
              <div>
                <Typography level="body-xs" fontWeight="lg">
                  Absent
                </Typography>
                <Typography fontWeight="lg">8.9</Typography>
              </div>
            </Sheet>
            <Box sx={{ display: "flex", gap: 1.5, "& > button": { flex: 1 } }}>
              <Button onClick={()=> setOpenModifyModal(true)} variant="outlined" color="neutral">
                Modify
              </Button>
              <Button onClick={()=> setOpenDeleteModal(true)} variant="solid" color="danger">
                Delete
              </Button>
            </Box>
          </CardContent>
        </Card>


    
      <Modal open={openDeleteModal} onClose={()=> setOpenDeleteModal(false)}>
      <ModalDialog variant="outlined" role="alertdialog">
          <DialogTitle>
            <WarningRoundedIcon />
            Confirmation
          </DialogTitle>
          <Divider />
          <DialogContent>
            Are you sure you want to discard the student {student.firstName} ?
          </DialogContent>
          <DialogActions>
            <Button variant="solid" color="danger" onClick={() => handleDeleteConfirm()}>
              Discard student
            </Button>
            <Button variant="plain" color="neutral" onClick={() => setOpenDeleteModal(false)}>
              Cancel
            </Button>
          </DialogActions>
        </ModalDialog>
      </Modal>



      <Modal open={openModifyModal} onClose={() => setOpenModifyModal(false)}>
        <ModalDialog>
          <DialogTitle>Modify student</DialogTitle>
          <form
            onSubmit={()=> submitForm()}
          >
            <Stack spacing={2}>
              <FormControl>
                <FormLabel>Code</FormLabel>
                <Input autoFocus required defaultValue={student.code}/>

                <FormLabel>First name</FormLabel>
                <Input autoFocus required defaultValue={student.firstName}/>

                <FormLabel>Last name</FormLabel>
                <Input autoFocus required defaultValue={student.lastName}/>
                                
              </FormControl>
              <Button type="submit">Submit</Button>
              <Button onClick={()=> setOpenModifyModal(false)}>Cancel</Button>
            </Stack>
          </form>
        </ModalDialog>
      </Modal>


      </Grid>
    
  );
}
