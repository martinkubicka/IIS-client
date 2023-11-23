import { MemberModel } from "@src/shared/models/MemberModel";
import { Avatar, Button, Select, Box, FormControl, FormLabel, Option, Card, CardContent, CardOverflow, CardActions, Typography } from '@mui/joy';
import { Icon } from "@src/shared/components/Icon/Icon";
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import Dialog from "@src/shared/components/Dialog/Dialog";
import { memberService } from "@src/services/memberService";
import { enqueueSnackbar } from "notistack";
import { loginService } from "@src/services/loginService";
import Role from "@src/enums/Role";
import GroupRole from "@src/enums/GroupRole";

interface MemberProps {
  member?: MemberModel;
  onDelete: () => void;
  handle?: string;
  type?: string;
}

export const GroupMemberRequest: React.FC<MemberProps> = ({ member, onDelete, handle, type }) => {
    const rejectRequest = async () => {
        try {
            if (type == "join") {
                await memberService.deleteJoinRequest(member?.email, handle)
            } else {
                await memberService.deleteModeratorRequest(member?.email, handle)
            }
            
            enqueueSnackbar("Request rejected successfully.", {
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
            enqueueSnackbar("Error occured while rejecting the request.", {
                variant: 'error',
                anchorOrigin: {
                vertical: 'bottom',
                horizontal: 'center',
                },
                autoHideDuration: 2000,
                style: {
                fontFamily: 'Arial',
                },
            })
        }
    };
    
    const handleAccept = () => {
        acceptRequest();
        onDelete();
    };

    const handleReject = () => {
        rejectRequest();
        onDelete();
    };

    const acceptRequest = async () => {    
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
        
            if (type == "join") {
                await memberService.addMember(handle, member?.email, GroupRole.member, member?.name, member?.icon, member?.handle);
            } else {
                await memberService.updateMemberRole(member?.email, GroupRole.moderator, handle);
            }
    
          enqueueSnackbar("Request accepted successfully.", {
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
            enqueueSnackbar("Error occured while accepting request.", {
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
                <Avatar sx={{ '--Avatar-size': '4rem' }}>
                    <Icon iconName={member?.icon} />
                </Avatar>
            </Link>
            <Link to={`/profile/${member?.handle}`} style={{textDecoration: 'none'}}>
                <Typography level="title-lg">{member?.name}</Typography>  
            </Link>   
            </CardContent>
 
            <CardActions buttonFlex="1">
                <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button color="success" onClick={handleAccept}>Accept</Button>
                    <Button color="danger" onClick={handleReject}>Reject</Button>
                </Box>
            </CardActions>
        </Card>
        </div>
    );
};