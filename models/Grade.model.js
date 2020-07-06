import mongoose from 'mongoose';
const Schema = mongoose.Schema

const gradeSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    subject: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    value: {
        type:Number,
        required: true,
        min: [0, 'Nota não pode ser menor que zero']
    },
    lastModified: {
        type: String,
        default: Date.now
    }
  }, {collection: 'grades', versionKey: false});

  const Grade = mongoose.model('grade', gradeSchema)

export {Grade}