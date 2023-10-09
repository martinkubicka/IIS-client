import { MemberModel } from "@src/shared/models/MemberModel";

interface MemberProps {
  member?: MemberModel;
  onDelete: () => void;
}

export const Member: React.FC<MemberProps> = ({ member, onDelete }) => {
  return (
    <div>
        MEMBER
    </div>
  );
};

// todo member component + css (vzdy max co moze do riadku)

