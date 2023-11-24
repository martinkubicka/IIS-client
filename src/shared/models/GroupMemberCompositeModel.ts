import { GroupModel } from './GroupModel'; // Import your GroupModel interface or type
import { MemberModel } from './MemberModel'; // Import your MemberModel interface or type

interface GroupMemberCompositeModel {
  group: GroupModel;
  member: MemberModel;
}

export default GroupMemberCompositeModel;