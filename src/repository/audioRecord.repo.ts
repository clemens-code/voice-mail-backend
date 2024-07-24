import {DataTypes, Model, Sequelize} from "sequelize";
import {AudioRecordModel} from "../model/audioRecord.model";
import {v4 as uuid} from 'uuid';


export const sequelize = new Sequelize('postgres://user:password@localhost:5432/voice-mail') // Example for postgres

export class AudioRecord extends Model {
}

AudioRecord.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
        },
        avatarSource: {
            type: DataTypes.STRING,
            allowNull: true
        },
        avatarAlt: {
            type: DataTypes.STRING,
            allowNull: true
        },
        bgColor: {
            type: DataTypes.STRING,
            allowNull: false
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        userName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        audioUrl: {
            type: DataTypes.STRING,
            allowNull: true
        },
    },
    {
        sequelize,
        modelName: 'audioRecord'
    });

export const tryConnection = async () => {
    try {
        await sequelize.authenticate();
        await AudioRecord.sync({force: true});
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

export const createNewRecord = async (audioRecordModel: AudioRecordModel) => {
    console.log(uuid())
    const id = uuid();
    const record = await AudioRecord.create({
        id: id,
        avatarSource: audioRecordModel.avatarProps ? audioRecordModel.avatarProps.src : null,
        avatarAlt: audioRecordModel.avatarProps ? audioRecordModel.avatarProps.alt : null,
        bgColor: audioRecordModel.bgColor,
        title: audioRecordModel.title,
        description: audioRecordModel.description,
        userName: audioRecordModel.userName,
        audioUrl: audioRecordModel.audioUrl
    });
    console.log("Record created successfully");
    return record.dataValues.id;
}