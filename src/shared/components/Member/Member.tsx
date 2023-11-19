import { MemberModel } from "@src/shared/models/MemberModel";
import { Avatar, Button, Select, Box, FormControl, FormLabel, Option, Card, CardContent, CardOverflow, CardActions, Typography } from '@mui/joy';
import { Icon } from "@src/shared/components/Icon/Icon";
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import Dialog from "../Dialog/Dialog";
import { memberService } from "@src/services/memberService";
import { enqueueSnackbar } from "notistack";
import { loginService } from "@src/services/loginService";
import Role from "@src/enums/Role";
import GroupRole from "@src/enums/GroupRole";

interface MemberProps {
  member?: MemberModel;
  onDelete: () => void;
  handle?: string;
}

export const Member: React.FC<MemberProps> = ({ member, onDelete, handle }) => {
    const [valueChanged, setValueChanged] = useState(false);
    const [selectedRole, setSelectedRole] = useState(member?.role);
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const getPermissions = async () => {
        
            const role = await memberService.getMemberRole(loginService.getCookie("userEmail"), handle);
          if (loginService.getCookie("userRole") !== "" && (loginService.getCookie("userRole") == Role.admin ||
              (role !== "" && role == GroupRole.admin))
          ) {
            setIsVisible(true);
          } else {
            setIsVisible(false);
          }
        }
    
        getPermissions();
      }, []);

    const handleRoleChange = (value: number) => {
        if (member?.role != value) {
            setSelectedRole(value);
            setValueChanged(true);
        } else {
            setValueChanged(false);
        }
      };
    
    const deleteMember = async () => {
        try {
            await memberService.deleteMember(member?.email, handle)
            
            enqueueSnackbar("Member deleted successfully.", {
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
        } catch (error) {
            if (error?.response?.status === 403) {
                enqueueSnackbar("Admin cannot be removed.", {
                  variant: 'error',
                  anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'center',
                  },
                  autoHideDuration: 2000,
                  style: {
                    fontFamily: 'Arial',
                  },
                });
              } else {
                enqueueSnackbar("Error occurred while deleting member..", {
                  variant: 'error',
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
        }
    };
    

    const handleOpenModal = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const handleConfirm = () => {
        deleteMember();
        handleCloseModal();
        onDelete();
    };

    const saveSettings = async () => {
        if (member) {
            member.role = selectedRole;
        }
    
        try {
            enqueueSnackbar("Loading..", {
                variant: 'info',
                anchorOrigin: {
                vertical: 'bottom',
                horizontal: 'center',
                },
                autoHideDuration: 2000,
                style: {
                    fontFamily: 'Arial',
                },
            });

          await memberService.updateMemberRole(member?.email, member?.role, handle);
          setValueChanged(false);
    
          enqueueSnackbar("Member role updated successfully.", {
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
        } catch (error) {
            enqueueSnackbar("Error occured while updating member role.", {
                variant: 'error',
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
    
    return (
        <div>
        <Card
        sx={{
            width: 190,
            maxWidth: '100%',
            marginRight: "20px",
            marginBottom: "20px",
        }}
        >
        <CardContent sx={{ alignItems: 'center', textAlign: 'center' }}>
            <Link to={`/profile/${member?.handle}`} style={{textDecoration: 'none'}}>
                <Avatar src="/static/images/avatar/1.jpg" sx={{ '--Avatar-size': '4rem' }}>
                    <Icon iconName={member?.icon} />
                </Avatar>
            </Link>
            <Link to={`/profile/${member?.handle}`} style={{textDecoration: 'none'}}>
                <Typography level="title-lg">{member?.name}</Typography>  
            </Link>   
            </CardContent>
        { isVisible ?
        (
            <div>
            <FormControl sx={{ width: 190 }}>
            <FormLabel id="select-field-demo-label" htmlFor="select-field-demo-button">
                Role
            </FormLabel>
            <Select
                    defaultValue={selectedRole?.toString()}
                >
                <Option value="0" onClick={() => handleRoleChange(0)}>Admin</Option>
                <Option value="1" onClick={() => handleRoleChange(1)}>Member</Option>
                <Option value="2" onClick={() => handleRoleChange(2)}>Moderator</Option>
            </Select>
            </FormControl>

                <CardActions buttonFlex="1">
                    <Box sx={{ display: 'flex', gap: 1 }}>
                        <Button disabled={!valueChanged} onClick={saveSettings}>Save</Button>
                        <Button color="danger" onClick={handleOpenModal}>Delete</Button>
                    </Box>
                </CardActions>
            </div>) : null}
        </Card>

        <Dialog
                open={modalOpen}
                onClose={handleCloseModal}
                title="Confirmation"
                content="Are you sure you want to delete member?"
                onConfirm={handleConfirm}
            />
        </div>
    );
};
