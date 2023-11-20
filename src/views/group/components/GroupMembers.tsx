import { memberService } from "@src/services/memberService";
import { Member } from "@src/shared/components/Member/Member";
import PaginationComponent from "@src/shared/components/Pagination/PaginationComponent";
import { GroupModel } from "@src/shared/models/GroupModel";
import { MemberModel } from "@src/shared/models/MemberModel";
import { useEffect, useState } from "react";
import "./Group.css";

interface GroupMembersProps {
    groupData?: GroupModel;
    isVisibleMembers?: boolean;
    triggerUseEffect?: boolean;
}

export const GroupMembers: React.FC<GroupMembersProps> = ({ groupData, isVisibleMembers, triggerUseEffect }) => {
    const [members, setMembers] = useState<MemberModel[] | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const itemsPerPage = 6;

    useEffect(() => {
        const fetchData = async () => {
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
    };

    const handlePageChange = async (page: number) => {
        setCurrentPage(page);
        const membersResponse = await memberService.getGroupMembers(groupData?.handle, page, itemsPerPage);
        setMembers(membersResponse);
    };

    return (
      <div>
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
