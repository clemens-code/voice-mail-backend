export interface AudioRecordModel {
    title: string;
    description: string;
    recordedAt: Date;
    length: number;
    isPublic: boolean;
    audioUrl: string;
    bgColor: string;
    avatarProps: AvatarProps;
}

export interface AvatarProps {
    src: string | null;
    alt: string | null;
}