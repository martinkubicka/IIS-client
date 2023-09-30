import React, { useState, useEffect } from 'react';
import { groupService } from '@src/services/groupService';
import { GroupModel } from "@src/shared/models/GroupModel";
import { FormControl, FormHelperText, Box, Checkbox, Button, Input, Textarea } from '@mui/joy';
import Dialog from "../../../shared/components/Dialog/Dialog";
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

interface GroupSettingsProps {
  groupData?: GroupModel;
}

export const GroupSettings: React.FC<GroupSettingsProps> = ({ groupData }) => {
  const [name, setName] = useState(groupData?.name);
  const [description, setDescription] = useState(groupData?.description);
  const [icon, setIcon] = useState(groupData?.icon);
  const [privacyMember, setPrivacyMember] = useState(groupData?.visibilityMember);
  const [privacyGuest, setPrivacyGuest] = useState(groupData?.visibilityGuest);
  const [valuesChanged, setValuesChanged] = useState<boolean>(true);
  const [validName, setValidName] = useState<boolean>(true);
  const [validDescription, setValidDescription] = useState<boolean>(true);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    handleFieldChange();
  }, [name, description, icon, privacyGuest, privacyMember]);

  const saveSettings = async () => {
    if (groupData) {
      groupData.name = name;
      groupData.description = description;
      groupData.icon = icon;
      groupData.visibilityGuest = privacyGuest;
      groupData.visibilityMember = privacyMember;
    }

    try {
      await groupService.updateGroup(groupData);
      await groupService.updateGroupPolicy(groupData);

      localStorage.setItem('snackbarData', JSON.stringify({
        message: "Group updated successfully.",
        variant: 'success',
        duration: 2000,
        fontFamily: 'Arial',
      }));

      window.location.reload();
    } catch (error) {
        enqueueSnackbar("Error occured while updating the group.", {
            variant: 'success',
            anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'center',
            },
            autoHideDuration: 2000,
            style: {
                fontFamily: 'Arial',
            },
        });
    }
  };
      
    const deleteGroup = async () => {
        try {
            await groupService.deleteGroup(groupData?.handle)
            
            localStorage.setItem('snackbarData', JSON.stringify({
                message: "Group deleted successfully.",
                variant: 'success',
                duration: 2000,
                fontFamily: 'Arial',
              }));
            
              navigate('/');
        } catch (error) {
            enqueueSnackbar("Error occured while deleting the group.", {
                variant: 'success',
                anchorOrigin: {
                vertical: 'bottom',
                horizontal: 'center',
                },
                autoHideDuration: 2000,
                style: {
                    fontFamily: 'Arial',
                },
            });
        }
    };

    const handleFieldChange = () => {
        if (name?.trim() === '') {
            setValidName(false);
        } else {
            setValidName(true);
        }

        if (description !== '' && description?.trim() === '') {
            setValidDescription(false);
        } else {
            setValidDescription(true);
        }

        if (groupData && validName && validDescription &&
            (groupData.name !== name ||
            groupData.description !== description ||
            groupData.icon !== icon ||
            groupData.visibilityGuest !== privacyGuest ||
            groupData.visibilityMember !== privacyMember)) {
            setValuesChanged(false);
        } else {
            setValuesChanged(true);
        }
      };

    const handleOpenModal = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const handleConfirm = () => {
        deleteGroup();
        handleCloseModal();
    };

    return (
        <React.Fragment>
            <h3>Icon</h3>
            <p>Icon component</p>

            <h3>Name</h3>
            <FormControl error={!validName}>
            <Input error={!validName} value={name} onChange={(e) => {setName(e.target.value);}}/>
                {!validName && <FormHelperText>Name field cannot be empty!</FormHelperText>}
            </FormControl>

            <h3>Description</h3>
            <FormControl error={!validDescription}>
            <Textarea  error={!validDescription} minRows={1} value={description} onChange={(e) => {setDescription(e.target.value);}}/>
                {!validDescription && <FormHelperText>Description cannot contains only whitespaces!</FormHelperText>}
            </FormControl>
            <h3>Group members visibility</h3>
            <Box sx={{ display: 'flex', gap: 3 }}>
                <Checkbox label="Members" checked={privacyMember} 
                    onChange={(e) => {
                        setPrivacyMember(e.target.checked);
                        e.target.checked ? null : setPrivacyGuest(e.target.checked); 
                    }}/>
                <Checkbox label="Guests" checked={privacyGuest} onChange={(e) => {
                    setPrivacyGuest(e.target.checked);
                    e.target.checked ? setPrivacyMember(e.target.checked) : null;
                }}/>
            </Box>

            <Box sx={{ display: 'flex', gap: 3, paddingTop: "40px" }}>
                <Button size="lg" onClick={saveSettings} disabled={valuesChanged}>Save</Button>
                <Button color="danger" size="lg" onClick={handleOpenModal} >Delete</Button>
            </Box>

            <Dialog
                open={modalOpen}
                onClose={handleCloseModal}
                title="Confirmation"
                content="Are you sure you want to delete this group?"
                onConfirm={handleConfirm}
            />
        </React.Fragment>
    );
};

// todo thread
    // todo add description to db (change aj inserts)
    // thread component implementation (name, description, username+handle, date)
    // add button + add page
    // todo edit - name a description
    // delete thread
    // pagination
    // filtre

// todo mobile
// todo add icon module (settings + group main)
// todo add user component to tabs (asi ja members??)
    // delete member from group
    // change role in group
// todo login page
