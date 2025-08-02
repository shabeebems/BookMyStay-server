import mongoose, { Schema, Document, Types } from 'mongoose';

export interface INotification extends Document {
    userId: Types.ObjectId;
    title: string;
    message: string;
    documents: string[];
    date: Date;
    type: 'info' | 'alert' | 'warning';
    ownerId: Types.ObjectId;
    requestStatus: 'pending' | 'rejected' | 'accepted';
    rejectReason: string;
    createdAt: Date;
    updatedAt: Date;
}

const NotificationSchema: Schema<INotification> = new Schema(
    {
        userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        title: { type: String, required: true, trim: true },
        message: { type: String, required: true, trim: true },
        documents: { type: [String] },
        date: { type: Date, default: Date.now },
        type: { type: String, enum: ['info', 'alert', 'warning'], default: 'info' },
        ownerId: { type: Schema.Types.ObjectId, ref: 'User', default: null },
        requestStatus: { type: String, enum: ['pending', 'rejected', 'accepted'], default: 'pending' },
        rejectReason: { type: String }
    },
    { timestamps: true }
);

const NotificationModel = mongoose.model<INotification>('Notification', NotificationSchema);

export default NotificationModel;
