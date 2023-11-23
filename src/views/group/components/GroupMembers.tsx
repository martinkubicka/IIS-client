import { memberService } from "@src/services/memberService";
import { Member } from "@src/shared/components/Member/Member";
import PaginationComponent from "@src/shared/components/Pagination/PaginationComponent";
import { GroupModel } from "@src/shared/models/GroupModel";
import { MemberModel } from "@src/shared/models/MemberModel";
import { useEffect, useState } from "react";
import "./Group.css";
import { loginService } from "@src/services/loginService";
import GroupRole from "@src/enums/GroupRole";
import Role from "@src/enums/Role";
import { Divider } from "@mui/joy";
import { GroupMemberRequest } from "./GroupMemberRequest";

interface GroupMembersProps {
    groupData?: GroupModel;
    isVisibleMembers?: boolean;
    triggerUseEffect?: boolean;
}

export const GroupMembers: React.FC<GroupMembersProps> = ({ groupData, isVisibleMembers, triggerUseEffect }) => {
    const [members, setMembers] = useState<MemberModel[] | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [isAdmin, setIsAdmin] = useState<boolean>(false);
    const [joinRequests, setJoinRequests] = useState<MemberModel[] | null>(null);
    const [moderatorRequests, setModeratorRequests] = useState<MemberModel[] | null>(null);
    const itemsPerPage = 6;

    useEffect(() => {
        const fetchData = async () => {
            const groupRole = await memberService.getMemberRole(loginService.getCookie("userEmail"), groupData?.handle)
            if (groupRole == GroupRole.admin || loginService.getCookie("userRole") == Role.admin) {
                setIsAdmin(true);
                
                const joinReqs = await memberService.getJoinRequests(groupData?.handle) ?? [];
                setJoinRequests(joinReqs);

                const moderatorReqs = await memberService.getModeratorRequests(groupData?.handle) ?? [];
                setModeratorRequests(moderatorReqs);

            } else {
                setIsAdmin(false);
            }

            if (isVisibleMembers) {
                try {
                    const memberDataResponse = await memberService.getGroupMembers(groupData?.handle, currentPage, itemsPerPage);
                    setMembers(memberDataResponse);

                    const membersCount = await memberService.getGroupMembersCount(groupData?.handle);
                    setTotalPages(Math.floor(membersCount / itemsPerPage) + (membersCount % itemsPerPage == 0 ? 0 : + 1));
                } catch (error) {}
            }
        };
    
        fetchData();
    }, [triggerUseEffect]);

    const onDelete = async () => {
        const membersCount = await memberService.getGroupMembersCount(groupData?.handle);
        setTotalPages(Math.floor(membersCount / itemsPerPage) + (membersCount % itemsPerPage == 0 ? 0 : + 1));

        const membersResponse = await memberService.getGroupMembers(groupData?.handle, currentPage, itemsPerPage);
        setMembers(membersResponse);

        const joinReqs = await memberService.getJoinRequests(groupData?.handle) ?? [];
        setJoinRequests(joinReqs);

        const moderatorReqs = await memberService.getModeratorRequests(groupData?.handle) ?? [];
        setModeratorRequests(moderatorReqs);
    };

    const handlePageChange = async (page: number) => {
        setCurrentPage(page);
        const membersResponse = await memberService.getGroupMembers(groupData?.handle, page, itemsPerPage);
        setMembers(membersResponse);
    };

    return (
      <div>
            {isAdmin ? ( <>
            <h3>Join requests</h3>
            <Divider style={{marginBottom: "30px"}}/>
            <div className="membersBox">
                {joinRequests === null ? (
                "Loading join requests..."
                ) : joinRequests.length === 0 ? (
                "No join requests found"
                ) : (
                joinRequests.map((member) => (
                    <GroupMemberRequest
                    member={member}
                    onDelete={onDelete}
                    handle={groupData?.handle}
                    type="join"
                    />
                ))
                )}
            </div>
            
            <h3>Moderator requests</h3>
            <Divider style={{marginBottom: "30px"}}/>
            <div className="membersBox">
                {moderatorRequests === null ? (
                "Loading moderator requests..."
                ) : moderatorRequests.length === 0 ? (
                "No moderator requests found"
                ) : (
                    moderatorRequests.map((member) => (
                    <GroupMemberRequest
                    member={member}
                    onDelete={onDelete}
                    handle={groupData?.handle}
                    type="moderator"
                    />
                ))
                )}
            </div>
            <h3>Members</h3>
            <Divider style={{marginBottom: "30px"}}/>
            </>
            ) : null }

            <div className="membersBox">
                {members === null ? (
                "Loading members..."
                ) : members.length === 0 ? (
                "No members found"
                ) : (
                members.map((member) => (
                    <Member
                    member={member}
                    onDelete={onDelete}
                    handle={groupData?.handle}
                    />
                ))
                )}
            </div>

            <PaginationComponent
                currentPage={currentPage}
                onPageChange={handlePageChange}
                totalPages={totalPages}
            />
      </div>
    );
};
