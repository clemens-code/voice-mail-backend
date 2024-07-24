export interface AudioRecordModel {
    avatarProps: AvatarProps;
    bgColor: string;
    title: string;
    description: string;
    userName: string;
    audioUrl: string | null;
}

export interface AvatarProps {
    src: string | undefined;
    alt: string | undefined;
}