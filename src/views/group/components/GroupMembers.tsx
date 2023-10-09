import { memberService } from "@src/services/memberService";
import { Member } from "@src/shared/components/Member/Member";
import PaginationComponent from "@src/shared/components/Pagination/PaginationComponent";
import { GroupModel } from "@src/shared/models/GroupModel";
import { MemberModel } from "@src/shared/models/MemberModel";
import { useEffect, useState } from "react";

interface GroupMembersProps {
    groupData?: GroupModel;
}

export const GroupMembers: React.FC<GroupMembersProps> = ({ groupData }) => {
    const [members, setMembers] = useState<MemberModel[] | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const itemsPerPage = 5;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const memberDataResponse = await memberService.getGroupMembers(groupData?.handle, currentPage, itemsPerPage);
                setMembers(memberDataResponse);

                const membersCount = await memberService.getGroupMembersCount(groupData?.handle);
                setTotalPages(Math.floor(membersCount / itemsPerPage) + (membersCount % itemsPerPage == 0 ? 0 : + 1));
            } catch (error) {}
        };
    
        fetchData();
    }, []);

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
          {members === null ? (
            "Loading members..."
            ) : members.length === 0 ? (
            "No members found"
            ) : (
            members.map((member) => (
                <Member member={member} onDelete={onDelete}/>
            ))
            )}

            <PaginationComponent
                currentPage={currentPage}
                onPageChange={handlePageChange}
                totalPages={totalPages}
            />
      </div>
    );
};
