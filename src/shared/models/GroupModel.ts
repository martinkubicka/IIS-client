export interface GroupModel {
    handle: string;
    name: string;
    description?: string | null;
    icon?: string | null;
    visibilityMember: boolean;
    visibilityGuest: boolean;
}
